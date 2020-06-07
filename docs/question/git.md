# git 常见问题

- 上传
  - 无法检测文件名大小写变化
    - 原因： 默认配置忽略文件名大小写
    - 解决： 在当前项目下运行 `git config core.ignorecase false` 关闭忽略大小写配置
- 报错 443
  - dns 异常
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
