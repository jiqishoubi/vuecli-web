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
      url: '/web/menu/getAllMenuList',
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
