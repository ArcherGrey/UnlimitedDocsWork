# semantic-release

:::info
全自动版本管理和包发布
:::

自动处理整个包发布流程：

- 确定下一个版本号
- 生成 `relase note` 发布说明
- 发布包

特点：

- 全自动发布
- 强制语义版本控制规范
- 版本更新通知维护人员和用户
- 使用格式化的 `commit message` 约定来记录代码库中的更改
- 避免手动发布可能造成的潜在错误
- 通过插件支持任何包管理器和语言
- 通过可共享配置实现简单且可重用的配置

[toc]

## 使用

### 安装

本地安装：

```bash
npm install --save-dev semantic-release
# or
yarn add -D semantic-release
```

全局安装：

```bash
npm install -g semantic-release
# or
yarn global add semantic-release
```

或者使用：

```bash
npx semantic-release
```

### GitHub 配置

node 项目配置

配置文件 `.github/workflows/release.yml` 下面是最小配置项
完整的配置项见 [github](https://docs.github.com/en/free-pro-team@latest/actions/learn-github-actions)

```yml
name: Release
on:
  push:
    branches:
      - master
jobs:
  release:
    name: Release
    runs-on: ubuntu-18.04
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          node-version: 12
      - name: Install dependencies
        run: npm ci
      - name: Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: npx semantic-release
```
