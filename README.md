# 配置文件.env 说明：

cp ~/.env_example ~/.env

然后修改这些内容：

**VITE_API_URI** ：接口域名；

**VITE_IPFS_GATEWAY**：ipfs gateway，用于显示ipfs 协议的资源；

**VITE_PNS_URL**：PNS 网页地址；

**VITE_DEFAULT_CHAIN**：默认网络

## 本地运行

$ yarn install

$ yarn dev

## 生成静态文件

$ yarn build

## 部署到测试服务器

$ mv fly.toml.test fly.toml
$ flyctl deploy

## 部署到正式服务器

$ mv fly.toml.production fly.toml
$ flyctl deploy
