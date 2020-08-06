# mongo

`MongoDB` 是由 `C++` 语言编写的，是一个基于分布式文件存储的开源数据库系统。

在高负载的情况下，添加更多的节点，可以保证服务器性能。

`MongoDB` 旨在为 `WEB` 应用提供可扩展的高性能数据存储解决方案。

`MongoDB` 将数据存储为一个文档，数据结构由键值(`key=>value`)对组成。
文档类似于 `JSON` 对象。字段值可以包含其他文档，数组及文档数组。

## window 安装使用

### 下载安装

[下载地址](https://www.mongodb.com/download-center/community)

注意：在 `MongoDB 2.2` 版本后已经不再支持 `Windows XP` 系统。最新版本也已经没有了 32 位系统的安装文件。

`MongoDB Compass` 是一个图形界面管理工具，我们可以在后面自己到官网下载安装。[下载地址](https://www.mongodb.com/download-center/compass)

### 创建数据目录

MongoDB 将数据目录存储在 db 目录下。但是这个数据目录不会主动创建，我们在安装完成后需要创建它(创建一个名字为 `data` 的文件夹再在里面创建一个名字为 `db` 的文件夹)：

```shell
mkdir data
cd data
mkdir db
```

启动 `mongodb` 有两种方式：

- 命令行运行 `mongodb` 服务器

为了从命令提示符下运行 `MongoDB` 服务器，你必须从 `MongoDB` 目录的 `bin` 目录中执行 `mongod.exe` 文件:

```shell
mongod --dbpath 刚才创建db的位置
mongo.exe
```

- 配置 `mongodb` 服务：

创建数据库和日志文件目录

```shell
mkdir c:\data\db
mkdir c:\data\log
```

创建配置文件， `C:\mongodb\mongod.cfg`：

```shell
systemLog:
    destination: file
    path: c:\data\log\mongod.log
storage:
    dbPath: c:\data\db
```

安装服务：

```shell
C:\mongodb\bin\mongod.exe --config "C:\mongodb\mongod.cfg" --install
```

启动服务：

```shell
net start MongoDB
```
