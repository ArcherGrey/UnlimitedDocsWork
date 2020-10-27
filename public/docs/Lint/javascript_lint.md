# JavaScript 代码风格

[toc]

## `eslint`

```json
{
  "eslint": "^5.16.0",
  "eslint-config-standard": "^6.2.1",
  "eslint-friendly-formatter": "^2.0.7",
  "eslint-loader": "^2.1.2",
  "eslint-plugin-html": "^2.0.1",
  "eslint-plugin-promise": "^3.5.0",
  "eslint-plugin-standard": "^2.3.1",
  "eslint-plugin-vue": "^5.0.0"
}
```

使用两个插件

- `plugin:vue/essential`
- `standard`

`vue/essential` 为了在 `vue` 里面也可以生效。
`standard` 是代码规范 [细则](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md#javascript-standard-style)

## `prettier`

配置文件：

```json
{
  "printWidth": 150,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "always",
  "proseWrap": "preserve",
  "overrides": [
    {
      "files": [
        "*.json",
        ".eslintrc",
        ".tslintrc",
        ".prettierrc",
        ".tern-project"
      ],
      "options": { "parser": "json", "tabWidth": 2 }
    },
    {
      "files": "*.{css,sass,scss,less}",
      "options": { "parser": "css", "tabWidth": 2 }
    },
    { "files": "*.ts", "options": { "parser": "typescript" } },
    { "files": "*.vue", "options": { "parser": "vue" } },
    { "files": "*.md", "options": { "parser": "markdown" } }
  ]
}
```

开启 `vscode` 自动格式化

```json
{
  // prettier
  "prettier.singleQuote": true,
  "prettier.semi": false,
  "prettier.tabWidth": 2,
  "[javascript]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```
