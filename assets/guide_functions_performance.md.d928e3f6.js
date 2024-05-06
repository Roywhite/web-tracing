import{_ as s,o as n,c as a,U as t}from"./chunks/framework.caeb0c25.js";const C=JSON.parse('{"title":"Performance","description":"","frontmatter":{},"headers":[],"relativePath":"guide/functions/performance.md","filePath":"guide/functions/performance.md","lastUpdated":1689745507000}'),l={name:"guide/functions/performance.md"},p=t(`<h1 id="performance" tabindex="-1">Performance <a class="header-anchor" href="#performance" aria-label="Permalink to &quot;Performance&quot;">​</a></h1><p>捕获应用所有的资源加载情况,加载分为以下两种情况</p><ul><li>DOM加载</li><li>资源加载</li></ul><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>加载错误的资源会产生两个事件【1.资源本身的加载情况 2.报错情况】</p></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>sdk监听资源加载情况采用的是【 PerformanceObserver &gt; MutationObserver 】的降级策略 通过PerformanceObserver拿不到资源是否加载成功，但其加载失败会在控制台报错，所以能被错误监听模块捕获 如果只想从资源监听模块获取是否加载成功，可通过以下四个属性是否等于0来判断，但因为各种情况它们是不准确的， 仅供参考【duration，responseEnd，transferSize，decodedBodySize】 MutationObserver的情况下，因为能拿到具体dom，可以通过监听dom的error事件来判断是否失败，当失败的情况下会给出responseStatus = &#39;error&#39; 字段来表示</p></div><h2 id="首次页面性能数据对象格式" tabindex="-1">首次页面性能数据对象格式 <a class="header-anchor" href="#首次页面性能数据对象格式" aria-label="Permalink to &quot;首次页面性能数据对象格式&quot;">​</a></h2><p>t = nt2Timing || performance.getEntriesByType(&#39;navigation&#39;)[0]</p><table><thead><tr><th>属性名称</th><th>值</th><th>说明</th></tr></thead><tbody><tr><td>eventId</td><td>page</td><td>事件ID</td></tr><tr><td>eventType</td><td>performance</td><td>事件类型</td></tr><tr><td>appcache</td><td>t.domainLookupStart - t.fetchStart</td><td>dns缓存时间</td></tr><tr><td>dom</td><td>t.domInteractive - t.responseEnd</td><td>dom解析耗时</td></tr><tr><td>dns</td><td>t.domainLookupEnd - t.domainLookupStart</td><td>dns查询耗时</td></tr><tr><td>firstbyte</td><td>t.responseStart - t.domainLookupStart</td><td>首包时间</td></tr><tr><td>fmp</td><td>t.fetchStart</td><td>首屏时间</td></tr><tr><td>loadon</td><td>t.loadEventStart - t.fetchStart</td><td>页面完全加载时间</td></tr><tr><td>ready</td><td>t.domContentLoadedEventEnd - t.fetchStart</td><td>HTML加载完成时间</td></tr><tr><td>res</td><td>t.loadEventStart - t.domContentLoadedEventEnd</td><td>同步资源加载耗时</td></tr><tr><td>ssllink</td><td>t.connectEnd - t.secureConnectionStart</td><td>SSL安全连接耗时</td></tr><tr><td>tcp</td><td>t.connectEnd - t.connectStart</td><td>tcp连接耗时</td></tr><tr><td>trans</td><td>t.responseEnd - t.responseStart</td><td>内容传输耗时</td></tr><tr><td>ttfb</td><td>t.responseStart - t.requestStart</td><td>请求响应耗时</td></tr><tr><td>tti</td><td>t.domInteractive - t.fetchStart</td><td>首次可交互时间</td></tr><tr><td>redirect</td><td>t.redirectEnd - t.redirectStart</td><td>重定向时间</td></tr><tr><td>unloadTime</td><td>t.unloadEventEnd - t.unloadEventStart</td><td>上一个页面的卸载耗时</td></tr><tr><td>sendTime</td><td></td><td>发送时间</td></tr><tr><td>triggerPageUrl</td><td>window.location.href</td><td>当前页面地址</td></tr></tbody></table><h2 id="同步-异步资源加载时传给后台的对象格式" tabindex="-1">同步 &amp; 异步资源加载时传给后台的对象格式 <a class="header-anchor" href="#同步-异步资源加载时传给后台的对象格式" aria-label="Permalink to &quot;同步 &amp; 异步资源加载时传给后台的对象格式&quot;">​</a></h2><blockquote><p>大部分数据依赖于<code>performance.getEntriesByType(&#39;resource&#39;)</code></p></blockquote><table><thead><tr><th>属性名称</th><th>值</th><th>说明</th></tr></thead><tbody><tr><td>eventId</td><td>resource</td><td>事件ID</td></tr><tr><td>eventType</td><td>performance</td><td>事件类型</td></tr><tr><td>requestUrl</td><td></td><td>资源具体url</td></tr><tr><td>initiatorType</td><td></td><td>通过某种方式请求的资源,比如script,link</td></tr><tr><td>transferSize</td><td></td><td>传输的数据包大小</td></tr><tr><td>encodedBodySize</td><td></td><td>数据包压缩后大小</td></tr><tr><td>decodedBodySize</td><td></td><td>数据包解压后大小</td></tr><tr><td>duration</td><td></td><td>加载具体时长</td></tr><tr><td>redirectStart</td><td></td><td>重定向开始时间</td></tr><tr><td>redirectEnd</td><td></td><td>重定向结束时间</td></tr><tr><td>startTime</td><td></td><td>开始时间</td></tr><tr><td>fetchStart</td><td></td><td>开始发起请求时间</td></tr><tr><td>domainLookupStart</td><td></td><td>DNS开始解析时间</td></tr><tr><td>domainLookupEnd</td><td></td><td>DNS结束解析时间</td></tr><tr><td>connectStart</td><td></td><td>开始建立连接时间</td></tr><tr><td>connectEnd</td><td></td><td>连接建立完成时间</td></tr><tr><td>requestStart</td><td></td><td>开始发送数据包时间</td></tr><tr><td>responseStart</td><td></td><td>开始接收数据包时间</td></tr><tr><td>responseEnd</td><td></td><td>数据包接收完成时间</td></tr><tr><td>triggerTime</td><td></td><td>事件触发时间</td></tr><tr><td>triggerPageUrl</td><td></td><td>当前页面地址</td></tr></tbody></table><h2 id="真实场景数据" tabindex="-1">真实场景数据 <a class="header-anchor" href="#真实场景数据" aria-label="Permalink to &quot;真实场景数据&quot;">​</a></h2><h3 id="首屏" tabindex="-1">首屏 <a class="header-anchor" href="#首屏" aria-label="Permalink to &quot;首屏&quot;">​</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">eventId</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">page</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">eventType</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">performance</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">fmp</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">261.7</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">tti</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">103.8</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">ready</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">230.6</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">loadon</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">304.7</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">firstbyte</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">appcache</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">3.3</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">tcp</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0.3</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">ttfb</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">9.7</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">trans</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1.5</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">dom</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">89</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">res</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">74.1</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">ssllink</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">5.1</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">triggerPageUrl</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">http://localhost:6656/#/performance</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">sendTime</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1689732460049</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">unloadTime</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">undefined,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">redirect</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">undefined,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">dns</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">undefined,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h3 id="资源加载-正确时" tabindex="-1">资源加载 - 正确时 <a class="header-anchor" href="#资源加载-正确时" aria-label="Permalink to &quot;资源加载 - 正确时&quot;">​</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">initiatorType</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">script</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">encodedBodySize</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">26747</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">decodedBodySize</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">73015</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">duration</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">4.1</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">startTime</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">237979.9</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">fetchStart</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">237979.9</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">domainLookupStart</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">237979.9</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">domainLookupEnd</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">237979.9</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">connectStart</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">237979.9</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">connectEnd</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">237979.9</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">requestStart</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">237982.5</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">responseStart</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">237983.4</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">responseEnd</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">237984</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">eventType</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">performance</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">eventId</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">resource</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">requestUrl</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">https://cdn.jsdelivr.net/npm/lodash</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">triggerTime</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1689732763613</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">triggerPageUrl</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">http://localhost:6656/#/performance</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">sendTime</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1689732764622</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h3 id="资源加载-错误时" tabindex="-1">资源加载 - 错误时 <a class="header-anchor" href="#资源加载-错误时" aria-label="Permalink to &quot;资源加载 - 错误时&quot;">​</a></h3><blockquote><p>加载错误的资源会产生两个事件【1.资源本身的加载情况 2.报错情况】</p></blockquote><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 资源本身的加载情况</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">eventId</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">resource</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">eventType</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">performance</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">initiatorType</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">script</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">duration</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1239</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">startTime</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">271471.5</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">fetchStart</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">271471.5</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">responseEnd</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">272710.5</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">requestUrl</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">https://cdn.jsdelivr.net/npm/lodash22</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">triggerTime</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1689732798337</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">triggerPageUrl</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">http://localhost:6656/#/performance</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">sendTime</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1689732799342</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 报错情况</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">eventId</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">resource</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">eventType</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">error</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">initiatorType</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">script</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">requestUrl</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">https://cdn.jsdelivr.net/npm/lodash22</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">triggerTime</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1689732798337</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">triggerPageUrl</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">http://localhost:6656/#/performance</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">sendTime</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1689732799342</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">recordscreen</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">H4sIAAAAAAAAA+R9V3vqyNLuD9oXh2C8h0sbm7RA3saYoDuChyQwswATfv2p6iB1qFYL7LW/c57vYp5ZtqVWh+rK9Va/uFtM69ExfGvctxfHRVir5obw749z8zAudKLGcvvvxqZTmtTeFy/Lh11jHXyO</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 错误录屏数据</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div>`,19),o=[p];function e(r,c,F,y,d,D){return n(),a("div",null,o)}const B=s(l,[["render",e]]);export{C as __pageData,B as default};