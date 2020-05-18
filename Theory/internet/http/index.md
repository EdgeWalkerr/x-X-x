# HTTP/2.0

| General         | Response       | Reqauest       |
| --------------- | -------------- | -------------- |
| Request URL     | Server         | Cookies        |
| Requset Method  | Set-Cookie     | Accept-xxx     |
| Status Code     | Content-type   | Content-type   |
| Remote Address  | Content-length | Content-length |
| Referrer Policy | Date           | Authorization  |
|                 |                | User-Agent     |
|                 |                | Referrer       |

## StatusCode

### 1XX 消息

是临时响应， 让客户采取一些行动

100 Continue

服务器已收请求头

101 switch protocols

服务器理解客户端请求， 通知客户端采取其他的协议来完成这个请求，比如切换到HTTP/2协议

102 Processing

请求涉及到很长的时间完成， 该代码表示正在处理请求， 但无响应可用。

### 2XX

请求成功

200 ok

### 3XX 重定向

301 Moved to new URL

304 Not Modified

表示请求头中的If-modified-since或者if-None-Match参数指定的这一个版本之后， 未曾被修改

### 4XX 客户端错误

客户端看起来可能发生了错误， 妨碍了服务器的处理。

400 bad request

401 Unauthorized

403 forbidden

404 not found

### 5XX 服务器端错误

500 internal server Error

502 bad getaway 



