import { prodHostArr, allHostObj } from './consts'

/**
 * @description 生成随机字符串
 * @param {number} [num=7]
 */
export const randomStrKey = (num = 7) => {
  return Math.random().toString(36).substr(2, num);
};

export function getIsProd() {
  const url = window.location.href
  let isProd = false;
  for (let i = 0; i < prodHostArr.length; i++) {
    if (url.indexOf(prodHostArr[i]) > -1) {
      isProd = true;
      break;
    }
  }
  return isProd;
}

// 获取当前的globalHost
export const globalHost = () => {
  return getIsProd() ? allHostObj.proHost.host : allHostObj.devHost.host;
};
