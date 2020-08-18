# nrm

> `npm` 源管理器，允许你快速地在 `npm` 源间切换

`npm` 默认情况下是使用 `npm` 官方源（使用 `npm config ls` 命令可以查看），在国内用这个源肯定是不靠谱的，一般我们都会用淘宝 `npm` 源：`https://registry.npm.taobao.org/`，修改源的方式也很简单，在终端输入：

```shell
npm set registry https://registry.npm.taobao.org/
```

## 安装

```shell
npm install -g nrm
```

## 使用

```shell
// 查看可选源
nrm ls

// 查看当前源
nrm current

// 切换源
nrm use <registry>

// 添加源 registry为源名，url为源地址
nrm add <registry> <url>

// 刪除源
nrm del <registry>

// 测试响应速度
nrm test <registry>
```
