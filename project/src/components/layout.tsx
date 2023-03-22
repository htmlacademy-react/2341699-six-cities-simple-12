import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from './header/header';
import ScrollToTop from './scroll-to-top/scroll-to-top';

type LayoutProps = {
  isAuthorised: boolean;
  changeAuth: (isAuthorised: boolean) => void;
};

function Layout({ changeAuth, isAuthorised }: LayoutProps): JSX.Element {

  let rootClassName: string;
  const location = useLocation();

  switch (location.pathname) {
    case '/':
      rootClassName = 'page--gray page--main';
      break;
    case '/login':
      rootClassName = 'page--login';
      break;
    default:
      rootClassName = 'page__main--property';
      break;
  }

  return (
    <div className={`page  ${rootClassName}`}>
      <ScrollToTop />
      <Header changeAuth={changeAuth} isAuthorised={isAuthorised} />
      <Outlet />
    </div>
  );
}

export default Layout;
