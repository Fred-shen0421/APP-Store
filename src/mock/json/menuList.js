export default {
  code: 200,
  data: [
    {
      id: "00001",
      parentId: null,
      name: "system",
      path: "/system",
      meta: {
        title: "系統",
        icon: "el-icon-setting",
        type: "menu",
      },
      apiList: [
        {
          code: "system.list",
          url: "/api/system/list",
        },
      ],
      component: "",
      children: [
        {
          id: "00001001",
          parentId: "00001",
          name: "user",
          path: "/system/user",
          meta: {
            title: "用戶管理",
            icon: "el-icon-setting",
            type: "menu",
          },
          component: "",
          children: [
            {
              id: "00001001001",
              parentId: "00001001",
              name: "user.add",
              meta: {
                title: "新增",
                type: "button",
              },
            },
            {
              id: "00001001002",
              parentId: "00001001",
              name: "user.edit",
              meta: {
                title: "編輯",
                type: "button",
              },
            },
            {
              id: "00001001003",
              parentId: "00001001",
              name: "user.del",
              meta: {
                title: "刪除",
                type: "button",
              },
            },
          ],
        },
      ],
    },
    {
      id: "00002",
      parentId: null,
      name: "other",
      path: "/other",
      meta: {
        title: "其他",
        icon: "el-icon-more",
        type: "menu",
      },
      component: "",
      children: [
        {
          id: "00002001",
          parentId: "00002",
          name: "directive",
          path: "/other/directive",
          meta: {
            title: "指令",
            icon: "el-icon-price-tag",
            type: "menu",
          },
          component: "",
          children: [
            {
              id: "00002001001",
              parentId: "00002001",
              name: "directive.add",
              meta: {
                title: "新增",
                type: "button",
              },
            },
            {
              id: "00002001002",
              parentId: "00002001",
              name: "directive.edit",
              meta: {
                title: "編輯",
                type: "button",
              },
            },
            {
              id: "00002001003",
              parentId: "00002001",
              name: "directive.del",
              meta: {
                title: "刪除",
                type: "button",
              },
            },
          ],
        },
      ],
    },
  ],
  message: "",
};
