import React from 'react';
import { RouteObject } from 'react-router-dom';
import NotFoundComponent from '@/components/not-found-component/not-found.component';
import { IRoute, RouteComponent, RouteComponentPromise } from './IRoute';
import LazyloadLoadingComponent from '@/components/lazyload-loading-component/lazyload-loading.component';


export class RoutesService {
  // 渲染路由
  static renderRoutes(routes: IRoute[]): RouteObject[] {
    routes.push({ path: '*', component: NotFoundComponent });
    const RoutesArr = routes.map((route) => {
      const ReactNode = RoutesService.render(route);
      return {
        path: route.path,
        element: ReactNode,
        children: route?.children?.length && RoutesService.renderRoutes(route.children),
      };
    });
    return RoutesArr;
  }

  // 路由
  static render(route: IRoute) {
    let TargetComponent = route.component as RouteComponent;
    if (route.lazyload) {
      TargetComponent = React.lazy(route.component as RouteComponentPromise);
      return (
        <React.Suspense fallback={<LazyloadLoadingComponent />}>
          <TargetComponent />
        </React.Suspense>
      );
    }
    return <TargetComponent />;
  }
}
