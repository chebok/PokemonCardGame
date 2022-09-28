import { Outlet } from 'react-router-dom';
import Header from './Header';

const AppLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default AppLayout;
