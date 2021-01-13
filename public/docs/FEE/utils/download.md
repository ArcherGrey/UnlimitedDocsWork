# 前端下载

[toc]

## form 表单提交

这是以前常使用的传统方式

原理：为一个下载按钮添加 click 事件，点击时动态生成一个表单，利用表单提交的功能来实现文件的下载（实际上表单的提交就是发送一个请求）

```js
/**
 * 下载文件
 * @param {String} path - 请求的地址
 * @param {String} fileName - 文件名
 */
function downloadFile(downloadUrl, fileName) {
  // 创建表单
  const formObj = document.createElement("form");
  formObj.action = downloadUrl;
  formObj.method = "get";
  formObj.style.display = "none";
  // 创建input，主要是起传参作用
  const formItem = document.createElement("input");
  formItem.value = fileName; // 传参的值
  formItem.name = "fileName"; // 传参的字段名
  // 插入到网页中
  formObj.appendChild(formItem);
  document.body.appendChild(formObj);
  formObj.submit(); // 发送请求
  document.body.removeChild(formObj); // 发送完清除掉
}
```

优点：

- 兼容性好
- 不会出现 `URL` 长度限制问题

缺点：

- 无法知道下载的进度
- 无法直接下载浏览器可预览的文件类型

## 基于 a 标签下载

`download` 属性是 `HTML5` 新增的属性

```html
<!-- href: 文件的绝对/相对地址 -->
<!-- download: 文件名（可省略，省略后浏览器自动识别源文件名） -->
<a href="xxx.jpg" download="file.jpg">下载jpg图片</a>
```

可以指定下载文件名，不设置默认是文件原名：

```html
<a href="example.jpg" download="test">点击下载</a>
```

检测是否支持 `download`：

```js
const isSupport = "download" in document.createElement("a");
```

优点：

- 解决 浏览器不能直接下载可预览文件的问题 （也就是如果文件可以预览如果不加 download 或者不支持 download 浏览器会直接预览而不会下载）

缺点：

- 兼容性问题
  - `Edge 13` 在尝试下载 `data url` 链接时会崩溃。
  - `Chrome 65` 及以上版本只支持同源下载链接。
  - `Firefox` 只支持同源下载链接。
- 无法跨域下载
  - 对于跨域文件可以通过后端转发来解决
- 不能添加 header 也就无法添加权限限制

## location.href 或者 open

最简单最直接的方式，实际上跟 a 标签访问下载链接一样

```js
window.open("downloadFile.zip");

location.href = "downloadFile.zip";
```

优点

- 简单方便直接

缺点：

- 有 `URL` 长度限制问题
- 需要注意 `URL` 编码问题
- 无法直接下载浏览器可预览的文件类型
- 不能添加 header 也就无法添加权限限制
- 无法知道下载的进度

## 利用 `Blob` 对象

利用 `Blob` 对象可以将文件流转化成 `Blob` 二进制对象

思路：发请求获取二进制数据，转化为 `Blob` 对象，利用 `URL.createObjectUrl` 生成 `url` 地址，赋值在 `a` 标签的 `href` 属性上，结合 `download` 进行下载:

```js
/**
 * 下载文件
 * @param {String} path - 下载地址/下载请求地址。
 * @param {String} name - 下载文件的名字/重命名（考虑到兼容性问题，最好加上后缀名）
 */
downloadFile (path, name) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', path);
    xhr.responseType = 'blob';
    xhr.send();

    /* 可以获取下载进度 */
    xhr.addEventListener(
      "progress",
      function (event) {
        // 响应头要有Content-Length
        if (event.lengthComputable) {
          // 下载进度 = 已下载 / 总大小
          let percentComplete = event.loaded / event.total;
          console.log(percentComplete); // 最后输出1
        }
      },
      false
    );

    xhr.onload = function () {
        if (this.status === 200 || this.status === 304) {
            // 如果是IE10及以上，不支持download属性，采用msSaveOrOpenBlob方法，但是IE10以下也不支持msSaveOrOpenBlob
            if ('msSaveOrOpenBlob' in navigator) {
                navigator.msSaveOrOpenBlob(this.response, name);
                return;
            }
            // const blob = new Blob([this.response], { type: xhr.getResponseHeader('Content-Type') });
            // const url = URL.createObjectURL(blob);
            const url = URL.createObjectURL(this.response);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };
}

```

优点：

- 解决 浏览器不能直接下载可预览文件的问题（因为还是基于 `a` 标签的 `download`）
- 可设置 `header` 添加权限校验

缺点：

- 兼容性
  - IE 10 以下不可用
  - `safari` 对 `blob` 支持不好

## 利用 `Base64`

用法跟上面用 `Blob` 大同小异，基本上思路是一样的，唯一不同的是，上面是利用 `Blob` 对象生成 `Blob URL`，而这里则是生成 `Data URL`，所谓 `Data URL`，就是 `base64` 编码后的 `url` 形式:

```js
/**
 * 下载文件
 * @param {String} path - 下载地址/下载请求地址。
 * @param {String} name - 下载文件的名字（考虑到兼容性问题，最好加上后缀名）
 */
downloadFile (path, name) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', path);
    xhr.responseType = 'blob';
    xhr.send();
    xhr.onload = function () {
        if (this.status === 200 || this.status === 304) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(this.response);
            fileReader.onload = function () {
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = this.result;
                a.download = name;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };
        }
    };
}

```

优点：同 `blob`
缺点：同 `blob`
