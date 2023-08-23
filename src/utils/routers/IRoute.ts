import { ComponentType } from 'react';
import { RouteObject } from 'react-router-dom';
import NotFoundComponent from '@/components/not-found-component/not-found.component';

export type RouteComponent = ComponentType<RouteObject>;
export type RouteComponentPromise = () => Promise<{ default: any } | any>;

export type IRoute = Omit<RouteObject, 'children'> & {
  component: RouteComponentPromise | RouteComponent | typeof NotFoundComponent;
  lazyload?: boolean;
  children?: IRoute[];
};
