import { useRoutes } from 'react-router-dom';
import { ConfigProvider } from 'antd'
import { useEffect } from 'react'
import { RoutesService } from '@/utils/routers/routes.service';
import { appRoutes } from './App.routes'
import  { useSetThemeStore } from '@/store/theme'
function App() {
  const { themeColor } = useSetThemeStore(s => s)
  const RouterMain = useRoutes(RoutesService.renderRoutes(appRoutes));
  useEffect(() => {
    document.querySelector('body').style.setProperty('--dynamic-color', themeColor); // 设置 CSS 变量的值
  })
  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: themeColor,
        
      }
    }}>
      {RouterMain}
    </ConfigProvider>
  )
}

export default App
