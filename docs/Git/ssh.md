# 使用 ssh 连接 git

:::info
使用 `SSH` 协议可以连接远程服务器和服务并向它们验证。 利用 `SSH` 密钥可以连接 `GitHub GitLab`，而无需在每次访问时都提供用户名和个人访问令牌
:::

[toc]

## 检查现有 SSH 密钥

1. 打开

- windows `git bash`
- linux mac 终端

2. 输入 `ls -al ~/.ssh` 以查看是否存在现有 `SSH` 密钥

3. 检查目录列表以查看是否已经有 `SSH` 公钥。 默认情况下，公钥的文件名是以下之一：

- `id_rsa.pub`
- `id_ecdsa.pub`
- `id_ed25519.pub`

如果没有现有的公钥和私钥对，或者不想使用任何可用于连接到 `GitHub` 的密钥对，则[生成新 SSH 密钥](#生成新-ssh-密钥)。

如果看到列出的现有公钥和私钥对（例如 id_rsa.pub 和 id_rsa），并且希望使用它们连接到 GitHub，则可以[将 SSH 密钥添加到 ssh-agent](#将-SSH-密钥添加到-ssh-agent)。

## 生成新 SSH 密钥

1. 打开

- windows `git bash`
- linux mac 终端

2. 粘贴下面的文本（替换为您的 `GitHub` 电子邮件地址）

```shell
$ ssh-keygen -t ed25519 -C "your_email@example.com"
```

3. 提示您 `Enter a file in which to save the key（输入要保存密钥的文件）` 时，按 `Enter` 键。 这将接受默认文件位置。

添加到 `ssh-agent`:

1. 在后台启动 ssh 代理。

```bash
$ eval "$(ssh-agent -s)"
> Agent pid 59566
```

2. 添加 到 `ssh-agent`

```bash
$ ssh-add ~/.ssh/id_ed25519
```

3. [将 SSH 密钥添加到 GitHub 帐户](#将-SSH-密钥添加到-GitHub-帐户)

## 将 SSH 密钥添加到 GitHub 帐户

1. 将 SSH 公钥复制到剪贴板

```bash
$ clip < ~/.ssh/id_ed25519.pub
# Copies the contents of the id_ed25519.pub file to your clipboard
```

2. 单击 Settings（设置）
3. 单击 SSH and GPG keys
4. 单击 New SSH key（新 SSH 密钥）或 Add SSH key（添加 SSH 密钥）
5. 在 "Title"（标题）字段中，为新密钥添加描述性标签。 例如，如果您使用的是个人 Mac，此密钥名称可能是 "Personal MacBook Air"
6. 将密钥粘贴到 "Key"（密钥）字段
7. 单击 Add SSH key
