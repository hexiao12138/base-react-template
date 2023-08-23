import { IRoute } from '@/utils/routers/IRoute';
export const appRoutes: IRoute[] = [
  {
    path: '/login', //登录
    component: () => import('./login/login.page'),
    lazyload: true,
  },
  {
    path: '/', //登录
    component: () => import('./login/login.page'),
    lazyload: true,
  },
//   {
//     path: '/home', //主页
//     component: Home,
//     children: homeRoutes
//   }
];