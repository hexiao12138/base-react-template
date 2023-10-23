export interface IMenu {
  icon?: string;
  title: string;
  titles?: string;
  path: string;
  paths?: string;
  active?: boolean;
  children?: IMenu[];
}

export class MenuService {
  menuItems: IMenu[] = [];
  currentPath = '';
  updateMenuByRoutes(routes: IMenu[]): IMenu[] {
    this.menuItems = this.convertRoutesToMenus(routes);
    return this.menuItems;
  }

  convertRoutesToMenus(routes: IMenu[]): IMenu[] {
    return this.convertArrayToItems(routes);
  }

  private convertArrayToItems(routes: IMenu[], parent?: IMenu): IMenu[] {
    const items: IMenu[] = [];
    routes?.forEach((route) => {
      items.push(this.convertObjectToItem(route, parent));
    });
    return items;
  }

  private convertObjectToItem(object: IMenu, parent?: IMenu): IMenu {
    const item = { ...object, paths: '', titles: '' };

    item.paths = parent && parent.paths ? parent.paths.slice(0) : '';
    item.titles = parent && parent.titles ? parent.titles.slice(0) : '';
    if (!!item.path) item.paths += `/${item.path}`;
    if (!!item.title) item.titles += `/${item.title}`;

    if (object.children && object.children.length > 0) {
      item.children = this.convertArrayToItems(object.children, item);
    }

    item.titles = item.titles.startsWith('/') ? item.titles.slice(1) : item.titles;
    return item;
  }
}
