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

### 配置

配置包括：

- git 仓库
- 插件
- 运行模式

配置文件，可以通过下面任意一种配置：

- `.releaserc` 文件 可以使用 `YAML or JSON` 格式，可选的扩展名 `.yaml .yml .json .js`
  - 例
  ```json
  {
    "branches": ["master", "next"]
  }
  ```
- `release.config.js` 导出一个对象
- 在 `package.json` 里面添加 `release` 属性
  - 例
  ```json
  {
    "release": {
      "branches": ["master", "next"]
    }
  }
  ```

选项：

|      名称       |         类型          |      命令行参数       |                                                       说明                                                       |
| :-------------: | :-------------------: | :-------------------: | :--------------------------------------------------------------------------------------------------------------: |
|    `extends`    |    `Array String`     |    `-e --extends`     |                                       包含可共享配置的模块或文件路径的列表                                       |
|   `branches`    | `Array String Object` |     `--branches`      |                                            执行 `release` 操作的分支                                             |
| `repositoryUrl` |       `String`        | `-r --repository-url` |                                                 `git` 仓库 `URL`                                                 |
|   `tagFormat`   |       `String`        |   `-t --tag-format`   |                                                  `Git tag` 格式                                                  |
|    `plugins`    |        `Array`        |     `-p --plugin`     |                                                  使用的插件列表                                                  |
|    `dryRun`     |       `Boolean`       |    `-d --dry-run`     | 是否启用 `dry` 模式，该模式会跳过 `prepare, publish, success fail`，同时还会将下一个版本号和发布说明输出到控制台 |
|      `ci`       |       `Boolean`       |    `--ci --no-ci`     |                                  设置 `false` 可跳过集成环境验证，允许本地发布                                   |
|     `debug`     |       `Boolean`       |       `--debug`       |                                                   输出调试信息                                                   |

`git` 环境变量

|         名称          |    说明    |                 默认值                 |
| :-------------------: | :--------: | :------------------------------------: |
|   `GIT_AUTHOR_NAME`   |  仓库作者  |        `@semantic-release-bot.`        |
|  `GIT_AUTHOR_EMAIL`   |  仓库邮箱  | `@semantic-release-bot email address.` |
| `GIT_COMMITTER_NAME`  |   贡献者   |        `@semantic-release-bot.`        |
| `GIT_COMMITTER_EMAIL` | 贡献者邮箱 | `@semantic-release-bot email address.` |

### GitHub 配置

node 项目配置

配置文件 `.github/workflows/release.yml` 下面是最小配置项
完整的配置项见 [github](https://docs.github.com/en/free-pro-team@latest/actions/learn-github-actions)

```yaml
name: Release # 工作流程名称
on: # 指定自动触发工作流程的事件
  push: # 这里是 push 事件，每次推送修改到 master，仓库就会触发工作流程
    branches:
      - master
jobs: # 所有作业
  release: # release
    name: Release # 作业名称
    runs-on: ubuntu-18.04 # 运行环境
    steps: # 运行步骤
      - name: Checkout # 步骤名
        uses: actions/checkout@v2 # 执行操作 这里执行 checkout 操作
        with: # 执行操作的参数
          fetch-depth: 0
      - name: Setup Node.js
        uses: actions/setup-node@v1 # 这里会安装 nodejs
        with:
          node-version: 12
      - name: Install dependencies # 安装依赖
        run: npm ci # 需要 package.lock.json
      - name: Release
        env: # 运行的环境变量
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: npx semantic-release
```
