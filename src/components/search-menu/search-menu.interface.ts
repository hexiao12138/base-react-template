import React from 'react';

export interface formatMenu {
  icon?: string;
  title: string;
  titles?: string;
  path: string;
  paths?: string;
  children?: formatMenu[];
}

export type IconProps = {
  name: string;
  size?: number;
  className?: string;
};

export interface SearchMenuProps {
  children: React.ReactNode;
  pageMenu: Array<formatMenu>;
  /** 是否通过 `ctrl + k` 打开，`默认true` */
  isKeyDownOpen?: boolean;
  /** 渲染拉下菜单的icon (只会显示顶级菜单的icon) */
  iconList?: Record<string, React.ReactNode>;
}
