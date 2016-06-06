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
    <script src="index.js"></script>
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
[ 'test.css', 'index.js', 'test2.js', 'test3.css', 'test2.css' ]
```