export default {
  code: 200,
  data: [
    {
      id: "1",
      code: "notice",
      name: "通知類型",
    },
    {
      id: "2",
      code: "sex",
      name: "性別",
    },
    {
      id: "3",
      code: "menuCategory",
      name: "選單類型",
    },
    {
      id: "4",
      code: "userType",
      name: "用戶類型",
      children: [
        {
          id: "41",
          code: "userTypePC",
          name: "Desktop",
        },
        {
          id: "42",
          code: "userTypeAPP",
          name: "Mobile",
        },
      ],
    },
  ],
  message: "",
};
