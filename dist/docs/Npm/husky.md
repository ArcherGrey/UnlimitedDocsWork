# `husky` :dog:

~~哈士奇~~

> `Husky` 可以防止错误的 `git commit`、`git push` 等等

## 安装

```shell
// npm
npm install husky --save-dev

// yarn
yarn add husky -D
```

## 配置

```JavaScript
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm test",
      "pre-push": "npm test",
      "...": "..."
    }
  }
}
```
