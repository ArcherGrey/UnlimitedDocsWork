# 解决无法登录的问题

一般是 `DNS` 无法解析造成，解决办法：

- 找到 `C:\Windows\System32\drivers\etc`
- 管理员权限修改 `hosts`
- 添加

```shell
#github
192.30.253.112 github.com
151.101.113.194 github.global.ssl.fastly.net
```
