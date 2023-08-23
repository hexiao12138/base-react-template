import { useRoutes } from 'react-router-dom';
import { RoutesService } from '@/utils/routers/routes.service';
import { appRoutes } from './App.routes'
function App() {
  const RouterMain = useRoutes(RoutesService.renderRoutes(appRoutes));
  return (
    <div>
      {RouterMain}
    </div>
  )
}

export default App
