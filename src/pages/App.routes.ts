import { IRoute } from '@/utils/routers/IRoute';
import Home from './home/home.page'
import {homeRoutes} from './home/home.routes'
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
  {
    path: '/home', //主页
    component: Home,
    children: homeRoutes
  }
];