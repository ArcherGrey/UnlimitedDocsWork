# wsl2 安装

wsl (`windows subsystem for linux`) 是适用于 linux 的 windows 子系统，可以让开发人员原生运行 linux 环境。

一般 win 系统开发人员要开发 linux 环境下的程序，需要使用虚拟机安装 linux ，很不方便， wsl 就是为了解决这个问题准备的开发环境

1. 更新 win 版本

需要 18917 更高的版本

2. 用管理员身份打开 powerShell，运行命令：

```shell
// 安装组件
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

// 启动功能
Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

重启生效

3. 打开 `控制面板 -> windows 功能` 查看 `适用于 linux 的 windwos 子系统` 和 `虚拟机平台` 是否勾选
4. 在微软应用商店选择一个 linux 安装
5. 下载并安装 wsl2 内核组件 [地址](https://aka.ms/wsl2kernel)
6. 在微软应用商店安装 Windows Terminal 在这里可以直接启动已安装的各版本 linux
