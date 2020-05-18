# git 常见问题

- 上传
  - 无法检测文件名大小写变化
    - 原因： 默认配置忽略文件名大小写
    - 解决： 在当前项目下运行 `git config core.ignorecase false` 关闭忽略大小写配置
