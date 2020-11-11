# 封装 axios

[toc]

:::info
axios 是基于 promise 的 http 库，可以用来拦截请求和响应，转换 json，客户端防御 CSRF 等
:::

封装主要有两个目的:

- 修改一些基础的配置：请求地址，超时
- 统一操作
  - 统一处理错误
  - 统一处理请求参数和格式，响应参数和格式
  - 统一处理 message
  - 统一拦截挂载等等

## 安装

```shell
npm install axios
yarn add axios
```

## 引入

新建一个 `request` 文件夹

- 新建 `http.js` 用来封装 `axios`
- 新建 `api.js` 用来封装接口

## 环境切换

可能有开发环境，测试环境和生成环境，根据环境变量来设置默认的接口 `url` 前缀：

```js
// 环境的切换
if (process.env.NODE_ENV == "development") {
  axios.defaults.baseURL = "https://www.baidu.com";
} else if (process.env.NODE_ENV == "debug") {
  axios.defaults.baseURL = "https://www.ceshi.com";
} else if (process.env.NODE_ENV == "production") {
  axios.defaults.baseURL = "https://www.production.com";
}
```

或者这样设置：

```js
// .env-default.js 文件
// 不同环境访问不同的路径
const api = {
  develop: "http://xxxx:8080",
  mock: "http://xxxx",
  feature: "http://xxxx",
  test: "http://xxxx",
  production: "http://xxxx"
};
export const baseURL = api[process.env.NODE_ENV || "dev"];
```

## 封装 axios

```js
import axios from "axios";
import { baseURL } from "../../.env-defalut.js";
// axios 配置
const defaultBaseUrl = "http://localhost:8080/";

// 取消 token 工厂
const CancelToken = axios.CancelToken;

// 请求队列
const reqQueue = new Map();

// 默认超时时间
axios.defaults.timeout = 15000;
// 数据接口域名统一配置.
envaxios.defaults.baseURL = baseURL || defaultBaseUrl;
// http request 拦截器
axios.interceptors.request.use(
  config => {
    let source = null;
    // 如果请求队列中已经存在，说明是重复请求
    if (reqQueue.has(config.url)) {
      // 把之前的请求取消
      source = reqQueue.get(config.url);
      source.cancel();
    }
    source = CancelToken.source();
    reqQueue.set(config.url, source); // 更新任务队列
    config.cancelToken = source.token;
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const data = error.response.data;
    return Promise.reject(data || error);
  }
);
export default axios;
/**
 * fetch 请求方法
 * @param {*} url
 * @param {*} params
 */
export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
/**
 * post 请求方法，发送数据格式 json
 * @param {*} url
 * @param {*} data
 */
export function post(
  url,
  data = {},
  config = {
    transformRequest: [
      function(fData, headers) {
        headers["Content-Type"] = "application/json";
        return JSON.stringify(fData);
      }
    ]
  }
) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, config).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}
/**
 * patch 请求方法，发送数据格式 json
 * @param {*} url
 * @param {*} data
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios
      .patch(url, data, {
        transformRequest: [
          function(fData, headers) {
            headers["Content-Type"] = "application/json";
            return JSON.stringify(fData);
          }
        ]
      })
      .then(
        response => {
          resolve(response.data);
        },
        err => {
          reject(err);
        }
      );
  });
}
export function del(url, data) {
  return new Promise((resolve, reject) => {
    axios.delete(url, { data }).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}
```

## 封装 api

```js
// 引入封装好的 get post 方法
import { get, post } from "./http";

// 如果 post get 没有特殊处理没必要再封装，直接使用实例方法
import { axiosInstance } from "./http";

// 示例 post 请求
const postApi = p => post(url, p);
const postApi = p => axiosInstance.post(url, p);
```
