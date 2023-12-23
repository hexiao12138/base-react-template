import { FC, useEffect, useState, memo } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu,MenuProps } from 'antd'
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
const items: MenuItem[] = [
  getItem('Navigation One', '终端运营', <MailOutlined />, [
    getItem('C端订单', 'appManage/orderManage'),
    getItem('广告管理', '2'),
  ]),
];
const HomeMenu: FC = () => {
  const [current, setCurrent] = useState('appManage/orderManage');
  const navigate = useNavigate();
  const linkTo: MenuProps['onClick']  = (e) => {
    setCurrent(e.key);
    navigate(e.key)
  }
  return (
    <div className="menu-scrollbar scrollbar">
      <Menu
        // selectedKeys={[pathname]}
        // defaultOpenKeys={ExpandListKeys}
        mode="inline"
        onClick={linkTo}
        // key={menuKey}
        selectedKeys={[current]}
        defaultOpenKeys={['sub1']}
        items={items}
      />
    </div>
  );
};

export default memo(HomeMenu);
