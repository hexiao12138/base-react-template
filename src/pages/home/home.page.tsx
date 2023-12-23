import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  KeyOutlined,
  PoweroffOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Layout, theme, Popover, Avatar, ColorPicker } from 'antd';
import React, { FC } from 'react';
import { useHomeState } from './home.store';
import './home.page.css';
import SearchMenuComponent from '@/components/search-menu/search-menu.component';
import HomeMenu from '@/components/submenu/submenu.component';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';
import { useSetThemeStore } from '@/store/theme'
const { Header, Sider } = Layout;
const HomePage: FC = () => {
  const { themeColor, setThemeColor } = useSetThemeStore(s => s)
  const { handleLogout, handleChangePassword } = useHomeState();
  const collapsed = true
  // const { themeColors } = useThemeKeyStore();
  // const { bgOnHover, titleBg, titleFont, bannerBg, bannerFont } = themeColors;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const Logo = <span>TITLE</span>

  return (
    <React.Fragment>
      <Layout>
        <div className="absolute bg-primary w-[200px] h-[64px]" />
        <Sider
          className="h-screen"
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflow: 'hidden auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            background: colorBgContainer,
          }}
        >
          <Header
            style={{ padding: 0, background: themeColor, color: '#ff' }}
            className="flex justify-center items-center"
          >
            <div className="font-[alimama] font-bold text-lg">
              {collapsed ? Logo : <span className="intro-x">{process.env.SITE_TITLE}</span>}
            </div>
          </Header>
          <HomeMenu />
        </Sider>
        <Layout style={{ marginLeft: collapsed ? '80px' : '200px' }} className="bg-gray-100 h-screen">
          <Header
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 99,
              width: '100%',
              padding: 0,
              background: themeColor,
              color: '#fff',
              lineHeight: '1rem',
            }}
            className="flex justify-between items-center"
          >
            <div className="flex">
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                // className: classNames(bgOnHover, 'ml-3 mr-24'),
                // onClick: () => setStateWrap({ collapsed: !collapsed }),
              })}
              <SearchMenuComponent>
                <div className="w-80 h-8 rounded-lg flex justify-center items-center bg-white hover:cursor-pointer">
                  <span className="text-gray-500">
                    <SearchOutlined /> 搜索你需要的内容 <b>【CTRL + K】</b>
                  </span>
                </div>
              </SearchMenuComponent>
            </div>
            <div className="flex items-center pr-10">
              <Popover
                // showArrow={false}
                overlayClassName="account-menu"
                overlayStyle={{ padding: 0 }}
                overlayInnerStyle={{ background: 'transparent', padding: 0 }}
                placement="bottomRight"
                trigger="click"
                open={false}
                //onOpenChange={(settingOpen) => setStateWrap({ settingOpen })}
                content={
                  <div className="account-menu__content">
                    <div className="account-menu__header">
                      <div>{}</div>
                      <div className="text-xs text-white/70 mt-0.5">{}</div>
                    </div>
                    <div className="account-menu__divider" />
                    <ul>
                      <li
                        className="account-menu__item"
                        onClick={() => {
                          handleChangePassword();
                        }}
                      >
                        <KeyOutlined className="w-4 h-4 mr-2" />
                        修改密码
                      </li>
                    </ul>
                    <div className="account-menu__divider" />
                    <div className="account-menu__item" onClick={handleLogout}>
                      <PoweroffOutlined className="w-4 h-4 mr-2" />
                      登出
                    </div>
                  </div>
                }
              >
                <ColorPicker onChange={(value) => setThemeColor('#' + value.toHex())}>
                <div
                  className={classNames('flex flex-col  items-center hover:cursor-pointer', {
                    // [`${bgOnHover}`]: true,
                  })}
                >
                  <span>
                    <SettingOutlined size={18} />
                  </span>
                  <span className="text-xs leading-5">切换主题</span>
                </div>
                </ColorPicker>
              </Popover>
              <div className="mr-3 ml-16 flex flex-col items-end text-xs">
                <span className="text-sm font-bold">你好，访客</span>
                <span className={`text-xs hover:cursor-pointer `} onClick={handleLogout}>
                  退出登录
                </span>
              </div>
              <Avatar className="text-primary w-10 h-10 flex justify-center items-center text-3xl font-normal bg-white">
                {/* {userDetail?.name?.charAt(0).toUpperCase() ?? <UserOutlined />} */}
                <UserOutlined />
              </Avatar>
            </div>
          </Header>
          {/* <div className="bo mx-7 mt-6 h-10 rounded-lg bg-white flex items-center">
            <TagsViewComponent mode="text" pageMenu={formattedMenu} />
          </div> */}
          <div className="mx-7 my-6">
            <Outlet />
          </div>
        </Layout>
      </Layout>
      {/* <div className='text-orange-900 text-teal-900 text-blue-900'></div> */}
    </React.Fragment>
  );
};

export default React.memo(HomePage);
