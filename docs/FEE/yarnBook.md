# yarn 常用命令

- [包的管理](#包的管理)
- [配置管理](#配置管理)
- [缓存管理](#缓存管理)
- [标签管理](#标签管理)
- [团队管理](#团队管理)
- [命令管理](#命令管理)
- [软链管理](#软链管理)
- [版本管理](#版本管理)
- [应用环境](#应用环境)
- [工作区管理](#工作区管理)
- [属主管理](#属主管理)
- [剩余问题](#剩余问题)

## 包的管理

```shell
# 创建
yarn init

# 安装
## 安装所有
yarn install
## 安装指定
yarn add <package...>
## 全局安装
yarn global add <package...>
## 局部安装
yarn  add <package...>
## 开发依赖
yarn add <package...> [--dev/-D]
## 可选依赖
yarn add <package...> [--optional/-O]
# or
yarn add <package...> [--peer/-P]
## 专一依赖
yarn add <package...> [--exact/-E]
## 最新小改
yarn add <package...> [--tilde/-T]
## 别名依赖
yarn add <alias-package>@npm:<package>

# 删除
yarn remove <package> --<flag>


# 发布
## 登陆
yarn login

//添加账户
//第一次发布npm adduser

## 发布
yarn publish
## 某压缩件
yarn publish [tarball]
## 某一目录
yarn publish [folder]
## 带新版本
yarn publish --new-version <version>
## 带有标签
yarn publish --tag <tag>
## 访问控制
yarn publish --access <public|restricted>

//撤销
npm unpublish 包名
## 注销
yarn logout

# 更新

//1.修改包的版本（package.json里的version字段）
//2.yarn publish


> 一套版本控制标准

|类目|描述|
|----|----|
|补丁|修复bug,小改动，增加z|
|小改|增加了新特性，但能向后兼容，增加y|
|大改|有很大的改动，无法向后兼容，增加x|


> 一批改变版本指令

|类目|描述|
|----|----|
|大改|`yarn version --major`|
|小改|`yarn version --minor`|
|补丁|`yarn version --patch`|


# 列出
## 查看远程某包信息
yarn info <package> [<field>]
## 例 yarn info react

## 列出当前项目的依赖
yarn list [--depth] [--pattern]
## 列出某包安装的原因
yarn why <query>
## 列出某包所属的人员
yarn owner list <package>
## 查看哪些依赖过时了
yarn outdated [package...]
## 列出依赖的颁发执照
yarn licenses list

yarn list --depth=0 # 限制依赖的深度
yarn global list # 列出全局安装的模块

```

## 配置管理

```shell
# 设置
yarn config set key value

# 读取
yarn config get key

# 删除
yarn config delete key

# 列出
yarn config list

# 全局
yarn config set <key> <value> --global
# or
yarn config set <key> <value> -g
```

## 缓存管理

```shell
# 列出
yarn cache list [--pattern]
## 查看缓存目录
yarn cache dir
## 列出缓存配置
yarn cache list

# 清除
yarn cache clean

# 设置
# 设置缓存目录
yarn config set cache-folder <path>

```

## 标签管理

```shell
# 创建
yarn tag add <package>@<version> <tag>
## 最新

## 稳定

# 列出
yarn tag list [<package>]

# 删除
yarn tag remove <package> <tag>

```

## 团队管理

```shell
# 创建
yarn team create <scope:team>

# 列出
yarn team list <scope>|<scope:team>

# 删除
yarn team destroy <scope:team>

# 添加成员
yarn team add <scope:team> <user>

# 删除成员
yarn team remove <scope:team> <user>
```

## 命令管理

```shell
# 创建
## 开发

## 测试
## package.json
## "scripts": {
## "test": "scripts/test"
## }

## 构建

# 运行
yarn run [script] [<args>]
## 测试
yarn run test
## 开发

## 构建

# 移除

# 打包
## 打包依赖
yarn pack
## 指定名字
yarn pack --filename <filename>

```

## 软链管理

```shell
# 创建
## steps-01: create a symLink from package react
cd react
yarn link
## steps-02: conect a symLink
cd ../react-relay
yarn link react


# 删除
## steps-01:disconect a symLink
cd ../react-relay
yarn unlink
## steps-02: remove a symLink
yarn unlink react
```

## 版本管理

此处的版本管理指的是通过命令的方式更新 `package.json` 中的 `version` 字段。

```shell
# 创建
yarn version
## 指定版本
yarn version --new-version <version>
## 没有关联
yarn version --no-git-tag-version

# 更新
## 大改
yarn version --major
## 小改
yarn version --minor
## 补丁
yarn version --patch


#开启管理git 标签
yarn config set version-git-tag true
# 设置git 标签前缀
yarn config set version-tag-prefix "v"
# 改变注释
yarn config set version-git-message "v%s"
#关闭管理git 标签
yarn config set version-git-tag false
```

## 应用环境

```shell
# 查看
yarn versions

{ http_parser: '2.7.0',
  node: '8.9.4',
  v8: '6.1.534.50',
  uv: '1.15.0',
  zlib: '1.2.11',
  ares: '1.10.1-DEV',
  modules: '57',
  nghttp2: '1.25.0',
  openssl: '1.0.2n',
  icu: '59.1',
  unicode: '9.0',
  cldr: '31.0.1',
  tz: '2017b' }
```

## 工作区管理

```shell
# 列工作区
yarn workspaces info

# 添加依赖
# yarn workspace <workspace_name> <command>
yarn workspace awesome-package add react react-dom --dev

# 移除依赖
# yarn workspace <workspace_name> <command>
yarn workspace awesome-package remove react-dom --save
```

## 属主管理

```shell
## 查看
## yarn owner list <package>
yarn owner list yarn
yarn owner list npm
yarn owner list node
yarn owner list express

## 修改
### 添加用户
yarn owner add <user> <package>
### 移除用户
yarn owner remove <user> <package>
```

## 剩余问题

淘宝镜像

```
yarn config set registry https://registry.npm.taobao.org

//还原镜像yarn config set registry http://registry.npmjs.org
```

配置文件

```
https://yarnpkg.com/en/docs/package-json
https://yarnpkg.com/en/docs/yarnrc
https://yarnpkg.com/en/docs/yarn-lock
```
