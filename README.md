
<p align="center">
  <img alt="demo" src="./demos/demo.gif?v=1">
</p>

[English](./README.md) | [中文](./docs/zh/README.md)

# ChatGPT UI

A ChatGPT web client that supports multiple users, multiple database connections for persistent data storage, supports i18n. Provides Docker images and quick deployment scripts.

## 📢Updates
<details open>
<summary><strong>2023-03-10</strong></summary>

Add 2 environment variables to control the typewriter effect:

- `NUXT_PUBLIC_TYPEWRITER=true` to enable/disable the typewriter effect
- `NUXT_PUBLIC_TYPEWRITER_DELAY=50` to set the delay time for each character in milliseconds.

</details>

<details open>
<summary><strong>2023-03-04</strong></summary>

**Update to the latest official chat model**  `gpt-3.5-turbo`

**🎉🎉🎉Provide a shell script that can be used to quickly deploy the service to server** [Quick start](#one-click-depolyment)

</details>

<details>

<summary><strong>2023-02-24</strong></summary>
Version 2 is a major update that separates the backend functionality as an independent project, hosted at [chatgpt-ui-server](https://github.com/WongSaang/chatgpt-ui-server). 

If you still wish to use the old version, please visit the [v1 branch](https://github.com/WongSaang/chatgpt-ui/tree/v1).

</details>

## Version 2 introduces the following new features:

- 😉 Separation of the frontend and backend, with the backend now using the Python-based Django framework.
- 😘 User authentication, supporting multiple users.
- 😀 Ability to store data in an external database (defaulting to Sqlite).
- 😎 Session persistence, allowing the API to answer questions based on your context.

## 🚀 One-click deployment <a name="one-click-depolyment"></a>

Note: This script has only been tested on Ubuntu Server 22.04 LTS.

```bash
bash <(curl -Ls https://raw.githubusercontent.com/WongSaang/chatgpt-ui/main/deployment.sh)
```

> If you have a domain name, you can point it to the server's IP address using DNS resolution. Of course, using the server's IP address directly is also possible. 
> During the script's execution, you will be prompted to enter a domain name. If you do not have a domain name, you can enter the server's IP address directly.

### After the deployment is complete

Access `http(s)://your.domain:9000/admin` / IP `http(s)://123.123.123.123:9000/admin` to log in to the administration panel.

Default superuser: `admin`

Default password: `password`

Before you can start chatting, you need to add an OpenAI API key. In the Settings model, add a record with the name `openai_api_key` and the value as your API key.

Now you can access the web client at `http(s)://your.domain` or `http://123.123.123.123` to start chatting.

🎉🎉🎉 Enjoy it!
