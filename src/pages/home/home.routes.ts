import { IRoute } from '~/utils/routes/IRoute';

export const homeRoutes: IRoute[] = [
  {
    path: 'appManage/orderManage', // 参考实例-用户管理页
    component: () => import('./user-page/user-manage.page'),
    lazyload: true,
  },
  {
    path: 'appManage/orderManage/detail', // 参考实例-用户详情
    component: () => import('./user-page/user-detail/user-detail.page'),
    lazyload: true,
  },
];
