# nrm

`nrm` 是一个 `npm` 源管理器，允许你快速地在 `npm` 源间切换。

```shell
# 安装
npm install -g nrm

# 使用
# 查看可选源
nrm ls

# 查看当前源
nrm current

# 切换源
nrm use <registry>

# 添加源 registry为源名，url为源地址
nrm add <registry> <url>

# 刪除源
nrm del <registry>

# 测试响应速度
nrm test <registry>

```
