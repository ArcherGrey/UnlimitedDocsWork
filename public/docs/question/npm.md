# npm

- 包 更新发布
  - version 使用 npm version 修改
  - 如果需要引入，但是不想打包的库 webpack 配置 externals

## 常用命令

版本更新：

- npm version
  - patch 0.0.1-0.0.2
  - minor 0.0.1-0.1.0
  - major 0.0.1-1.0.0

推送本地所有 tag 到远程

- git push origin --tags

发布包

- npm publish

强制刪除快速

- rimraf
