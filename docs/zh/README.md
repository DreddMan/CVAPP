
<p align="center">
  <img alt="demo" src="../../demos/demo.gif?v=1">
</p>

[English](../../README.md) | [中文](./docs/zh/README.md)

# ChatGPT UI

ChatGPT Web 客户端，支持多用户，支持 Mysql、PostgreSQL 等多种数据库连接进行数据持久化存储，支持多语言。提供 Docker 镜像和快速部署脚本。

## 📢 更新
<details open>
<summary><strong>2023-03-10</strong></summary>

增加 2 个环境变量来控制打字机效果, 详见下方 docker-compose 配置的环境变量说明

- `NUXT_PUBLIC_TYPEWRITER` 是否开启打字机效果
- `NUXT_PUBLIC_TYPEWRITER_DELAY` 每个字的延迟时间，单位：毫秒

</details>

<details open>
<summary><strong>2023-03-04</strong></summary>

**使用最新的官方聊天模型**  `gpt-3.5-turbo`

**🎉🎉🎉 提供一个 shell 脚本，用于快速部署到服务器** [使用方法](#one-click-depolyment)

</details>

<details>

<summary><strong>2023-02-24</strong></summary>
V2 是一个重要的更新，将后端功能分离为一个独立的项目，托管在 [chatgpt-ui-server](https://github.com/WongSaang/chatgpt-ui-server), 该项目使用基于 Python 的 Django 框架。 

如果您仍然希望使用旧版本，请访问 [v1 branch](https://github.com/WongSaang/chatgpt-ui/tree/v1) （不推荐，不再更新）.

</details>

## V2 的功能特性:

- 😉 前后端分离，后端使用基于 Python 的 Django 框架。
- 😘 用户身份验证，支持多个用户。
- 😀 能够将数据存储在外部数据库中，支持 Mysql、PostgreSQL 等数据库（默认为 Sqlite）。
- 😎 持续对话，让AI根据上下文回答问题。


## 🚀 一行命令部署到服务器 <a name="one-click-depolyment"></a>

注意：此脚本仅在 Ubuntu Server 22.04 LTS 上验证过。

```bash
bash <(curl -Ls https://raw.githubusercontent.com/WongSaang/chatgpt-ui/main/deployment.sh)
```

> 如果您拥有一个域名，可以使用 DNS 解析将其指向服务器的 IP 地址。当然，直接使用服务器的 IP 地址也是可以的。
> 在脚本执行期间，会提示您输入域名。如果您没有域名，可以直接输入服务器的 IP 地址。

### 部署完成之后

访问 `http(s)://your.domain:9000/admin` / IP `http(s)://123.123.123.123:9000/admin` 登录管理面板。

默认超级用户: `admin`
