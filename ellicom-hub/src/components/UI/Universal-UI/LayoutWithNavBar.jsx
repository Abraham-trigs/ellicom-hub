import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';

const LayoutWithNav = ({ children }) => {
  const location = useLocation();

  const hideNavRoutes = ['/User-login', '/Staff-Login', '/Login', '/'];

  const shouldHideNav = hideNavRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNav && <NavBar />}
      <main className={!shouldHideNav ? 'pt-10' : ''}>
        {children}
      </main>
    </>
  );
};

export default LayoutWithNav;
