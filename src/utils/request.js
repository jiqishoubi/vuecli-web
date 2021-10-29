import axios from 'axios';
import { ElMessage } from 'element-plus'
import { globalHost } from './utils';
import { LOGIN_TOKEN_KEY } from './consts';

const ERROR_MESSAGE = '网络异常';

function message(type, str) {
  ElMessage({
    type,
    message: str,
    center: true,
    showClose: true,
  })
}

const request = (options) => {
  const {
    url: urlParam,
    data: dataParam,
    method = 'post',
    headers = {},
    isNeedErrMsg = true,
    ...restOptions
  } = options;

  let data = dataParam || {};
  let url = urlParam;

  const token = localStorage.getItem(LOGIN_TOKEN_KEY) || null;
  if (token) {
    url = `${url}?sessionId=${token}`;
  }

  if (method == 'formData') {
    // 上传文件
    const formData = new FormData();
    for (let key in dataParam) {
      const value = dataParam[key];
      formData.append(key, value);
    }
    data = formData;
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  return new Promise((resolve, reject) => {
    axios
      .request({
        url: url.indexOf('http:') > -1 || url.indexOf('https:') > -1 ? url : globalHost() + url,
        method: method == 'get' ? 'get' : 'post',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        data,
        timeout: 60 * 1000,
        ...restOptions,
      })
      .then((response) => {
        if (response.data) {
          const res = response.data;
          if (res.code === '0') {
            // 业务成功
            resolve(res.data);
          } else {
            // 业务失败
            reject(res);
            if (isNeedErrMsg) message('warning', res.message || ERROR_MESSAGE);
          }
        } else {
          reject(JSON.stringify(err));
          if (isNeedErrMsg) message('error', ERROR_MESSAGE);
        }
      })
      .catch((err) => {
        // 网络没通
        reject(JSON.stringify(err));
        if (isNeedErrMsg) message('error', ERROR_MESSAGE);
      });
  });
};

export default request;
