const origin = window.location.origin || '';

export const isDev = false; // 是否是开发状态

// 请求域名
export const allHostObj = {
  devHost: { text: '测试', host: 'https://cdcwebt.bld365.com' },
  // devHost: { text: '生产', host: 'https://cdcweb.bld365.com' }, // 生产
  // devHost: { text: '测试', host: 'http://1.2.4.181:8088' }, // 商
  // devHost: { text: '测试', host: 'http://1.2.4.227:8088' }, // 婷

  proHost: { text: '生产', host: 'https://cdcweb.bld365.com' },
};

// 前端代码部署的生产域名
export const prodHostArr = ['://cdc.bld365.com'];

export const LOGIN_TOKEN_KEY = origin + '-LOGIN_TOKEN_KEY';

