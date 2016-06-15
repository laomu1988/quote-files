# 取得引入的文件列表
 分析一个文件中引入的其他文件列表。

## 使用说明
* 安装： npm install quote-files
* 使用
```
var quote = require("quote-files");
var list = quote('index.html');
console.log(list);
```

假如文件 index.html
```
<!doctype html>
<html lang="cn">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link href="test.css" />
    <script src="http://www.baidu.com/index.js"></script>
</head>
<body>
<style>
    @import "test3.css";
    @import test2.css;
</style>
<script>
    var a = require('test2.js');
</script>
</body>
</html>
```
则list将为
```
[ { path: 'test.css',
    absolute: '/node_modules/quote-files/test/index.html/test.css',
    isLocal: true,
    isExist: false },
  { path: 'index.js',
    absolute: '/node_modules/quote-files/test/index.html/index.js',
    isLocal: true,
    isExist: false },
  { path: 'http://www.baidu.com/index.js',
    absolute: 'http://www.baidu.com/index.js',
    isLocal: false,
    isExist: undefined },
  { path: 'test2.js',
    absolute: '/node_modules/quote-files/test/index.html/test2.js',
    isLocal: true,
    isExist: false },
  { path: 'test3.css',
    absolute: '/node_modules/quote-files/test/index.html/test3.css',
    isLocal: true,
    isExist: false },
  { path: 'test2.css',
    absolute: '/node_modules/quote-files/test/index.html/test2.css',
    isLocal: true,
    isExist: false } ]

```

## 修改历史
1.0.1 引入文件增加是否是本地信息
1.0.0 引入文件列表