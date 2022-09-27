import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined, HomeOutlined } from '@ant-design/icons';
import { logout } from '../redux/actions/auth';
import { clearMessage } from '../redux/actions/message';
import styled from 'styled-components';

const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const { user } = auth;

  const loggedInMenuItems = [
    {
      key: 'Profile',
      icon: <UserOutlined />,
      label: (<a href="/profile">Profile</a>),
    },
    {
      key: 'Logout',
      icon: <LogoutOutlined />,
      label: (<a href="/">Logout</a>),
    },
    {
      key: 'Home',
      icon: <HomeOutlined />,
      label: (<a href="/">Home</a>),
    },
  ];

  const loggedOutMenuItems = [
    {
      key: 'Register',
      icon: <UserOutlined />,
      label: (<a href="/register">Register</a>),
    },
    {
      key: 'Login',
      icon: <LoginOutlined />,
      label: (<a href="/login">Login</a>),
    },
    {
      key: 'Home',
      icon: <HomeOutlined />,
      label: (<a href="/">Home</a>),
    },
  ];

  const logoutUser = () => {
    dispatch(logout());
    dispatch(clearMessage());
  }

  const handleMenuClick = (e) => {
    if (e.key === 'Logout') {
      logoutUser();
    }
  }

  return (
    <Container>
      {user &&(
        <Menu onClick={handleMenuClick} mode='horizontal' items={loggedInMenuItems}></Menu>
      )}
      {!user &&(
        <Menu mode='horizontal' items={loggedOutMenuItems}></Menu>
      )}
      {/* <Menu mode='horizontal'>
        {user && (
          <>
            <Menu.Item key='Profile' icon={<UserOutlined />}>
              <Link to='/profile'>
                <span>Profile</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='Logout' icon={<LogoutOutlined />}>
              <Link to='/' onClick={logoutUser}>
                <span>Logout</span>
              </Link>
            </Menu.Item>
          </>
        )}
        {!user && (
          <>
            <Menu.Item key='Login' icon={<LoginOutlined />}>
              <Link to='/login'>
                <span>Login</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='Register' icon={<UserAddOutlined />}>
              <Link to='/register'>
                <span>Register</span>
              </Link>
            </Menu.Item>
          </>
        )}
        <Menu.Item key='Home' icon={<HomeOutlined />}>
          <Link to='/'>
            <span>Home</span>
          </Link>
        </Menu.Item>
      </Menu> */}
    </Container >
  );
}

export default Header;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #f3f3f3;
`;
