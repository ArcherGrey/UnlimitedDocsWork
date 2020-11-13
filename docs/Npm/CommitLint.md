# `CommitLint`

- [简介](#简介)
- [安装](#安装)

## 简介

`CommitLint` 检查 `commit messages` 是否符合 `git` 提交规范：

```shell
chore: run tests on travis ci
fix(server): send cors headers
feat(blog): add comment section
```

默认支持：

- `build`
- `ci`
- `chore`
- `docs`
- `feat`
- `fix`
- `perf`
- `refactor`
- `revert`
- `style`
- `test`

可以通过修改配置文件添加支持

## 安装

依赖 `Husky` 的 `commit-msg hook`，需要先安装：

```shell
// npm
npm install husky --save-dev

// yarn
yarn add husky -D
```

创建 `.huskyrc` ~~不知道为啥这样不行~~ 或者在 `package.json` 加入：

```js
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

安装:

```shell
// npm
npm install --save-dev @commitlint/cli
npm install --save-dev @commitlint/config-conventional

// yarn
yarn add @commitlint/cli -D
yarn add @commitlint/config-conventional -D
```

添加配置文件，下面任意一种：

- `commitlint.config.js`
- `.commitlintrc.js`
- `.commitlintrc.json`
- `.commitlintrc.yml`
- `package.json`

详细 [规则](https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md)

参数：

- `Level [0..2]`: 0 禁用 | 1 警告 | 2 错误
- `Applicable always|never`: `never` 不使用规则.
- `Value`: 这个规则使用的值.

例子：

```js
module.exports = {
  parserPreset: "conventional-changelog-conventionalcommits",
  rules: {
    "body-leading-blank": [1, "always"],
    "body-max-line-length": [2, "always", 100],
    "footer-leading-blank": [1, "always"],
    "footer-max-line-length": [2, "always", 100],
    "header-max-length": [2, "always", 100],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"]
    ],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test"
      ]
    ]
  }
};
```
