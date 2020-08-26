
export default [
  // user  有name 属性 可以有tab页
  {
    path: '/',
    redirect: '/daping',
  },
  {
    path: '/daping',
    component: '../layouts/DapingLayout',
    routes: [
      {
        path: '/daping',
        redirect: '/daping/index',
      },
      {
        path: '/daping/index',
        component: './tj_xunlianzhixu',
      },
    ]
  },

];
