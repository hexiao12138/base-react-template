// import { useSetMenuState } from '~/stores/menu';

import { useNavigate } from 'react-router-dom';
import { useSetThemeStore } from '@/store/theme'
class IHomePageState {
  collapsed = false;
  settingOpen = false;
  changePasswordOpen = false;
}

export function useHomeState() {
  const { setThemeColor } = useSetThemeStore(s => s)
  // const { state, setStateWrap } = useStateStore(new IHomePageState());
  // const setSideMenuStore = useSetMenuState((state) => state.setSideMenuStore);
  // const { clearUserInfo, userDetail } = useUserInfoStore((state) => state);
  // const { formattedMenu } = useSetMenuState((state) => state);
  // const { pwUnbinding } = useRememberMe((s) => s);
  // const navigate = useNavigate();

  // const { data: userInfo } = commonService.useGetUserInfo();
  // commonService.useGetMenutree(
  //   {
  //     roleIdList: userInfo?.roleIdList,
  //     systemId: userInfo?.systemId,
  //   },
  //   {
  //     enabled: !!userInfo?.roleIdList?.length,
  //     onSuccess: (data: IMenu[]) => {
  //       setSideMenuStore(data);
  //     },
  //   }
  // );

  const handleLogout = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    setThemeColor(color)
    // pwUnbinding();
    // clearUserInfo();
    // setSideMenuStore([]);
    // navigate('/login', { replace: true });
  };

  const handleChangePassword = () => {
    //setStateWrap({ changePasswordOpen: !state.changePasswordOpen, settingOpen: false });
  };

  return { handleLogout, handleChangePassword };
}
