# npx

npm 从 5.2 版开始，增加了 npx 命令

Node 自带 npm 模块，所以可以直接使用 npx 命令。万一不能用，就要手动安装一下。

```bash
npm install -g npx
```

npx 的出现就是帮你解决全局安装依赖和版本问题的。

当在执行 npx <command>的时候，npx 会做:

- 在本地寻找 command
  - 找到了执行
  - 没找到，下载最新版本到临时目录执行
  - 执行完刪除临时目录内容，下次执行如果还没有安装会重新下载

例如：

```shell
npx create-react-app my-react-app
```

[toc]

## --no-install 参数和--ignore-existing 参数

如果想让 npx 强制使用本地模块，不下载远程模块，可以使用--no-install 参数。如果本地不存在该模块，就会报错。

```bash
$ npx --no-install http-server
```

反过来，如果忽略本地的同名模块，强制安装使用远程模块，可以使用--ignore-existing 参数。比如，本地已经全局安装了 create-react-app，但还是想使用远程模块，就用这个参数。

```bash
$ npx --ignore-existing create-react-app my-react-app
```

## 执行 GitHub 源码

npx 还可以执行 GitHub 上面的模块源码。

```bash
# 执行 Gist 代码
$ npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32

# 执行仓库代码
$ npx github:piuccio/cowsay hello
```

注意，远程代码必须是一个模块，即必须包含 package.json 和入口脚本。
