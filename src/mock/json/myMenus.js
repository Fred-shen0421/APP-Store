export default {
  code: 200,
  data: {
    menu: [
      {
        name: "home",
        path: "/home",
        meta: {
          title: "App List",
          icon: "el-icon-eleme-filled",
          type: "menu",
        },
        children: [
          {
            name: "dashboard",
            path: "/dashboard",
            meta: {
              title: "控制台",
              icon: "el-icon-menu",
              affix: true,
            },
            component: "home",
          },
          {
            name: "userCenter",
            path: "/usercenter",
            meta: {
              title: "帳號資訊",
              icon: "el-icon-user",
            },
            component: "userCenter",
          },
        ],
      },
      {
        name: "blank",
        path: "/template/layout/blank",
        meta: {
          title: "Dashboard",
          icon: "el-icon-grid",
          type: "menu",
        },
        component: "template/layout/blank",
      },
      {
        path: "/other/about",
        name: "about",
        meta: {
          title: "Settings",
          icon: "el-icon-info-filled",
          type: "menu",
        },
        component: "other/about",
      },
    ],
    permissions: [
      "list.add",
      "list.edit",
      "list.delete",
      "user.add",
      "user.edit",
      "user.delete",
    ],
  },
  message: "",
};
