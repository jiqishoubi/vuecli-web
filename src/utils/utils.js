import { produce } from "immer";
import { prodHostArr, allHostObj } from "./consts";
import { ElMessageBox } from "element-plus";
import store from "@/store/index.ts";

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

export function myConfirm(str) {
  return new Promise((resolve, reject) => {
    ElMessageBox({
      title: "提示", //MessageBox 标题
      message: str, //MessageBox 消息正文内容
      confirmButtonText: "确定", //确定按钮的文本内容
      cancelButtonText: "取消", //取消按钮的文本内容
      showCancelButton: true, //是否显示取消按钮
      closeOnClickModal: false, //是否可通过点击遮罩关闭
      type: "warning", //消息类型，用于显示图标
    })
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
}

/**
 *
 * @param {*} url
 * @param {*} [allMenu]
 * @returns {boolean}
 */
export function useHaveRight(url, allMenu) {
  let allRights = [];
  if (allMenu) {
    allRights = allMenu;
  } else {
    allRights = store.state?.user?.allMenu || [];
  }
  let isHave = false;
  for (let i = 0; i < allRights.length; i++) {
    if (url == allRights[i].menuUrl) {
      isHave = true;
      break;
    }
  }
  return isHave;
}
