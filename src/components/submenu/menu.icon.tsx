import {
  UserOutlined,
  SettingOutlined,
  MenuOutlined,
  HomeOutlined,
  DesktopOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { ReactNode } from 'react';

/** 按需扩展： key对应网权限网管的【菜单配置-图标】 */
export const IconList: Record<string, ReactNode> = {
  home: <HomeOutlined />,
  menu: <MenuOutlined />,
  down: <DownOutlined />,
  user: <UserOutlined />,
  system: <SettingOutlined />,
  appManage: <DesktopOutlined />,
};
