# Git 提交规范

[参考](http://jartto.wang/2018/07/08/git-commit/)

公式：

> `<type>(<scope>): <subject>`

说明：

- `type` 用于说明 `commit` 的类别，只允许使用下面 7 个标识
  - `feat`：新功能（`feature`）
  - `fix`：修补 `bug`
  - `docs`：文档（`documentation`）
  - `style`： 格式（不影响代码运行的变动）
  - `refactor`：重构（即不是新增功能，也不是修改 `bug` 的代码变动）
  - `test`：增加测试
  - `chore`：构建过程或辅助工具的变动
- `scope` 用于说明 `commit` 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。
- `subject` 是 `commit` 目的的简短描述，不超过 50 个字符。
  1. 以动词开头，使用第一人称现在时，比如 `change`，而不是 `changed` 或 `changes`
  2. 第一个字母小写
  3. 结尾不加句号（.）

插件 `validate-commit-msg` 来检查项目中 `Commit message` 是否规范。
