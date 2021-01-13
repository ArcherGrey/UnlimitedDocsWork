# github 本地文件映射仓库

1. 初始化 `git init`
2. 关联远程仓库：

```auto
$ git remote add origin <远程仓库 http/ssh>
```

3. 修改本地仓库配置：

```bash
 git config --local -e
```

主要是用户名邮箱之类的

4. 设置本地分支和远程映射

这时候可能显示本地没有分支

需要 `git commit` 后才有

然后执行

```auto
git push --set-upstream <远程分支> <本地分支>
```
