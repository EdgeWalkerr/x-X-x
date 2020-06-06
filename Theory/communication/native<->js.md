# Native与JS通信

## IOS

### JS调用Native

#### Request方法

使用webView的代理方法截获请求

1. UIWebView

    NSURL url = request.URL

2. WKWebView

    获取navigationAction.request.URL

#### JavascriptCore方法

在webView完成加载后获取JSContext

```objectivec
// 首先引入 JavaScriptCore 库
#import <JavaScriptCore/JavaScriptCore.h>

  // 然后再 UIWebView 的完成加载的代理方法中
  - (void)webViewDidFinishLoad:(UIWebView *)webView {
  // 获取 JS 上下文
  jsContext = [webView valueForKeyPath:@"documentView.webView.mainFrame.javaScriptContext"];
  // 做引用，将 JS 内的元素引用过来解释，比如方法可以解释成 Block，对象也可以指向 OC 的 Native 对象哦
  jsContext[@"iosDelegate"] = self;
  jsContext[@"yourFuncName"] = ^(id parameter){
  // 注意这里的线程默认是 web 处理的线程，如果涉及主线程操作需要手动转到主线程
  dispatch_async(dispatch_get_main_queue(), ^{
  // your code
  });
  }
}
```

```javascript
var parameter = xxx;
yourFuncName(parameter);
```



### Native调用JS

UIWebView注入JS的方法

WKWebView evaluateJavaScript 和 completionHandler

javascriptCore

```objectivec
// 首先引入 JavaScriptCore 库
#import <JavaScriptCore/JavaScriptCore.h>

// 先获取 JS 上下文
self.jsContext = [webView valueForKeyPath:@"documentView.webView.mainFrame.javaScriptContext"];
// 如果涉及 UI 操作，切回主线程调用 JS 代码中的 YourFuncName，通过数组@[parameter] 入参
dispatch_async(dispatch_get_main_queue(), ^{
    JSValue *jsValue = self.jsContext[@"YourFuncName"];
    [jsValue callWithArguments:@[parameter]];
});
```

```jsx
function YourFuncName(arguments){
    var result = arguments;
    // do what u want to do
}
```

## Android

```text
1.WebViewClient.shouldOverrideUrlLoading(Webview view,String url)
2.Webview.addJavascriptInterface(Object object,String name)
3.Webview.evaluateJavascript(String script,ValueCallback<String> callback) 注：>= KITKAT 19
4.Webview.loadUrl(“javascript:” + script);
```













