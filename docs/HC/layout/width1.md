# 固定宽度布局

[toc]

- 绝对定位
- 浮动

## 1-2-1

- 绝对定位放置 `content`
- `margin` 放置 `side`

![121](./images/121.jpg)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>1-2-1布局</title>
  </head>
  <body>
    <div class="header">
      <div>header</div>
    </div>
    <div class="container">
      <div class="content"><div>content</div></div>
      <div class="side"><div>side</div></div>
    </div>
    <div class="footer"><div>footer</div></div>
  </body>
  <style>
    html,
    body {
      height: calc(100% - 16px);
    }
    .header,
    .footer,
    .container {
      margin: 0 auto;
      width: 100%;
      border: 3px solid blanchedalmond;
    }
    .header,
    .footer {
      height: 15%;
    }
    /* 外层元素相对定位 */
    .container {
      position: relative;
      height: 70%;
    }
    .content,
    .side {
      height: 100%;
    }
    /* content 定宽 绝对定位 */
    .content {
      position: absolute;
      top: 0;
      left: 0;
      border: 3px solid blanchedalmond;
      width: 500px;
    }
    /* side  利用 margin 定位*/
    .side {
      margin: 0 0 0 500px;
      border: 3px solid blanchedalmond;
    }
  </style>
</html>
```

## 1-3-1

![131](./images/131.jpg)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>1-3-1布局</title>
  </head>
  <body>
    <div class="header">
      header
    </div>
    <div class="container">
      <div class="nav">nav</div>
      <div class="content">content</div>
      <div class="side">side</div>
    </div>
    <div class="footer">footer</div>
  </body>
  <style>
    html,
    body {
      height: calc(100% - 16px);
    }
    div {
      border: 3px solid blueviolet;
    }
    .header,
    .footer,
    .container {
      margin: 0 auto;
      width: 100%;
    }
    .header,
    .footer {
      height: 15%;
    }
    .container {
      height: 70%;
    }
    .content,
    .side,
    .nav {
      height: 100%;
    }
    /* 浮动 */
    .content {
      float: left;
      width: calc(100% - 218px);
    }
    .nav {
      float: left;
      width: 100px;
    }
    .side {
      float: left;
      width: 100px;
    }
    /* 清除浮动 */
    .footer {
      clear: both;
    }
  </style>
</html>
```
