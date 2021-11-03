import { LOGIN_TOKEN_KEY } from "@/utils/consts";
import request from "@/utils/request";

// 获取全部的菜单 并处理
export function getAllMenuAjax() {
  let menuTreeObj = {
    allMenu: [],
    menuTree: [],
    rightsArr: [],
  };

  return new Promise(async (resolve) => {
    const token = localStorage.getItem(LOGIN_TOKEN_KEY);
    if (!token) {
      return resolve(menuTreeObj);
    }

    const data = await request({
      url: "/web/menu/getAllMenuList",
      isNeedErrMsg: false,
    });

    let dealResult = {};
    try {
      dealResult = dealMenu(data);
    } catch (e) {
      resolve(menuTreeObj);
    }
    resolve({
      allMenu: data,
      ...dealResult,
    });
  });
}

/**
 * 处理菜单
 */
export function dealMenu(allMenu) {
  let rightsArr = [];
  let levelArr = [];

  allMenu.forEach((obj) => {
    if (obj.menuUrl && obj.menuUrl.indexOf("-") > -1 && obj.menuUrl.indexOf("/") == -1) {
      //权限
      rightsArr.push(obj);
    } else {
      //菜单
      if (!levelArr[obj.menuLevel]) levelArr[obj.menuLevel] = [];
      obj.path = obj.menuUrl || "";
      obj.name = obj.menuName || "";

      // if (obj.menuLevel != 2) {
      //   obj.icon = getMenuIcon(obj);
      // }

      levelArr[obj.menuLevel].push(obj);
    }
  });

  for (let i = levelArr.length - 1; i >= 0; i--) {
    let index = i;
    let preIndex = i - 1;
    let arr = levelArr[index];
    let preArr = levelArr[preIndex];
    if (!preArr) continue;
    arr.forEach((obj) => {
      preArr.forEach((preObj) => {
        if (preObj.menuCode == obj.parentCode) {
          if (!preObj.children) preObj.children = [];
          preObj.children.push(obj);
        }
      });
    });
  }

  const menuTree = levelArr[0] ? levelArr[0] : [];

  // menuTree.unshift({
  //   ...welcomeRoute,
  //   icon: getMenuIcon({ menuTitle: '首页' }),
  // });

  return {
    menuTree,
    rightsArr,
  };
}

/**
 * 获取第一个菜单
 */
export function findFirstMenuUrl({ arr: arrArg, childrenkey = "children", urlKey = "menuUrl" }) {
  let url = "";
  const getFirst = (arr) => {
    if (arr && arr[0]) {
      if (arr[0][childrenkey]) {
        getFirst(arr[0][childrenkey]);
      } else {
        url = arr[0][urlKey];
      }
    }
  };
  getFirst(arrArg);
  return url;
}
