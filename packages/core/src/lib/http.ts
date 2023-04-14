import { on, isValidKey } from '../utils'
import { handleSendError } from './err'
import { eventBus } from './eventBus'
import { EVENTTYPES } from '../common'
import { options } from './options'
import { handleSendPerformance } from './performance'

class RequestTemplate {
  src = '' // 请求地址
  requestMethod = '' // 请求类型 GET POST
  triggerTime = -1 // 请求发生时间
  constructor(config = {}) {
    Object.keys(config).forEach(key => {
      if (isValidKey(key, config)) {
        this[key] = config[key] || null
      }
    })
  }
}

/**
 * fetch请求拦截
 */
function interceptFetch() {
  eventBus.addEvent({
    type: EVENTTYPES.FETCH,
    callback: (
      reqUrl: string,
      _options: Partial<Request> = {},
      res: Response
    ) => {
      const fetchStart = Date.now()
      const { method = 'GET' } = _options

      // 正确回调
      const { url, status, statusText } = res
      if (status === 200 || status === 304) {
        if (options.performance.server) {
          handleSendPerformance('server', {
            src: url,
            duration: Date.now() - fetchStart,
            responseStatus: status,
            params: method.toUpperCase() === 'POST' ? _options.body : undefined
          })
        }
      } else if (options.error.server) {
        handleSendError('server', statusText, {
          src: url,
          responseStatus: status,
          params: method.toUpperCase() === 'POST' ? _options.body : undefined
        })
      }
    }
  })
}

/**
 * xhr 请求拦截
 */
function interceptXHR() {
  const _config = new RequestTemplate()

  eventBus.addEvent({
    type: EVENTTYPES.XHROPEN,
    callback: (method, url) => {
      _config.requestMethod = method
      _config.src = url
    }
  })

  eventBus.addEvent({
    type: EVENTTYPES.XHRSEND,
    // body 就是post方法携带的参数
    callback: (that: XMLHttpRequest & any, body) => {
      // readyState发生改变时触发,也就是请求状态改变时
      // readyState 会依次变为 2,3,4 也就是会触发三次这里
      on(that, 'readystatechange', function () {
        const {
          readyState,
          status,
          responseURL = _config.src,
          responseText
        } = that
        if (readyState === 4) {
          // 请求已完成,且响应已就绪
          if (status === 200 || status === 304) {
            if (options.performance.server) {
              handleSendPerformance('server', {
                src: responseURL,
                responseStatus: status,
                duration: Date.now() - _config.triggerTime,
                params: body ? body : undefined
              })
            }
          } else if (options.error.server) {
            handleSendError('server', responseText, {
              src: responseURL,
              responseStatus: status,
              params: body ? body : undefined
            })
          }
        }
      })

      _config.triggerTime = Date.now()
    }
  })
}

function initHttp() {
  interceptXHR()
  interceptFetch()
}

export { initHttp }