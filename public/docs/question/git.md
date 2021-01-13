# git 常见问题

[toc]

## 无法检测文件名大小写变化

原因： 默认配置忽略文件名大小写
解决： 在当前项目下运行 `git config core.ignorecase false` 关闭忽略大小写配置

## 报错 443

原因： dns 异常

解决：

- 清理 host 文件 `C:\Windows\System32\drivers\etc
  - hosts 文件看不到 gitbash 可以看到
- 第一步：查询如下两个域名，并分别记录下其对应的 ip：
  1、github.com
  2、github.global.ssl.fastly.net `
- 第二步：更新 host 文件：
  192.30.253.112 github.com
  151.101.185.194 github.global.ssl.fastly.net
- 第三步：清理下 DNS，再试一下。
  ipconfig /flushdns

## git push 提示输入密码

原因： 使用 `http` 方式 `clone` 代码

解决：

1. 查看当前方式：`git remote -v` 结果显示为 `http` 方式

```shell
> origin  https://github.com/ArcherGrey/UnlimitedDocsWork.git (fetch)
> origin  https://github.com/ArcherGrey/UnlimitedDocsWork.git (push)
```

2. 先移除旧的：

```bash
git remote rm origin
```

3. 添加新的 `SSH` 方式：

```bash
git remote add origin git@github.com:ArcherGrey/UnlimitedDocsWork.git
```

4. 设置本地分支和远程映射：

```bash
git branch --set-upstream-to=origin/<branch> master
```
