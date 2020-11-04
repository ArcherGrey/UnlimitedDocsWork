# ajax - 请求方式

## GET

最常见的请求类型，用于向服务器查询某些信息。

适用于 url 完全指定请求资源，当请求对服务器没有任何副作用以及当服务器的响应是可缓存的情况下。

### 数据发送

发送请求时，数据被添加到 url 的末尾，数据以问号开始，key value 之间用等号链接，每对之间用 `&` 分割，数据常常被称为查询字符串：

```auto
xxx.xx.com?name1=value&name2=value
```

### 编码

url 无法识别特殊字符，如果数据中含有特殊字符（如中文），则需要使用 encodeURIComponent() 进行编码。

### 缓存

为了避免缓存，可以在最后添加一个随机数或者时间戳

### 封装函数

```js
function get(url, data, callback) {
  //创建xhr对象
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  //异步接受响应
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        //实际操作
        callback && callback(xhr.responseText);
      }
    }
  };
  for (var key in data) {
    url += url.indexOf("?") == -1 ? "?" : "&";
    //编码特殊字符
    url += encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
  }
  //增加随机数，防止缓存
  xhr.open("get", url + "&" + Number(new Date()), true);
  //发送请求
  xhr.send();
}
```

## POST

常用于需要被保存的数据，常用于表单。

### 设置请求头

使用 `XHR` 来模仿表单提交：首先将 `Content-Type` 头部信息设置为 `application/x-www-form-urlencoded`，也就是表单提交时的内容类型:

```js
xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
```

如果不设置 `Content-Type`，发送给服务器的数据就不会出现在 `$_POSR` 超级全局变量中。这时要访问同样的数据，须借助 `$HTTP_RAW_POST_DATA`

### 发送主体

`POST` 数据的格式与查询字符串格式相同，名和值之间用等号链接，名值对之间用和号(`&`)分隔，如下所示：

```js
xhr.send('name="abc"&num=123');
```

### 编码和缓存

由于使用 `POST` 方式传递数据时，需要设置请求头"`content-type`"，这一步骤已经能够自动对特殊字符(如中文)进行编码，所以就不再需要使用 `encodeURIComponent()`方法了

`POST` 请求主要用于数据提交，相同 `URL` 的重复 `POST` 请求从服务器得到的响应可能不同，所以不应该缓存使用 `POST` 方法的请求

### 和 GET 对比

`GET` 对所发送信息的数量有限制，一般在 `2000` 个字符。与 `GET` 请求相比，`POST` 请求消耗的资源会更多一些。从性能角度来看，以发送相同的数据计，`GET` 请求的速度最多可 `POST` 请求的两倍

### 封装函数

```js
function post(url, data, callback) {
  //创建xhr对象
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  //异步接受响应
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        //实际操作
        callback && callback(xhr.responseText);
      }
    }
  };
  var strData = "";
  for (var key in data) {
    strData += "&" + key + "=" + data[key];
  }
  strData = strData.substring(1);
  xhr.open("post", url, true);
  //设置请求头
  xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  //发送请求
  xhr.send(strData);
}
```
