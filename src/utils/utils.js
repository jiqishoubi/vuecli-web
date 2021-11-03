import { produce } from "immer";
import { prodHostArr, allHostObj } from "./consts";

/**
 * @description 生成随机字符串
 * @param {number} [num=7]
 */
export const randomStrKey = (num = 7) => {
  return Math.random().toString(36).substr(2, num);
};

export function getIsProd() {
  const url = window.location.href;
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

function isObjectOrArray(obj) {
  return (
    Object.prototype.toString.call(obj) === "[object Object]" ||
    Object.prototype.toString.call(obj) === "[object Array]"
  );
}

export function cloneDeep(obj) {
  if (isObjectOrArray(obj)) {
    var objClone = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === "object") {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (obj[key] && typeof obj[key] === "object") {
            objClone[key] = cloneDeep(obj[key]);
          } else {
            objClone[key] = obj[key];
          }
        }
      }
    }
    return objClone;
  }
  return obj;
}
