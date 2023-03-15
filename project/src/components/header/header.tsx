import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

type HeaderProps = {
  isAuthorised: boolean;
  changeAuth: (isAuthorised: boolean) => void;
};

type SignOutLinkProps = {
  changeAuth: (isAuthorised: boolean) => void;
};

function Header({ changeAuth, isAuthorised }: HeaderProps): JSX.Element {

  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active" href="/#">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {(!isLoginPage && !isAuthorised) && <SignInLink />}
                {isAuthorised && <UserProfile />}
              </li>
              {isAuthorised && <SignOutLink changeAuth={changeAuth} />}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

function UserProfile(): JSX.Element {
  return (
    <div className="header__nav-profile">
      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
    </div>
  );
}

function SignOutLink({ changeAuth }: SignOutLinkProps): JSX.Element {
  return (
    <li className="header__nav-item">
      <Link className="header__nav-link" to="/" onClick={() => changeAuth(false)}>
        <span className="header__signout">Sign out</span>
      </Link>
    </li>
  );
}

function SignInLink(): JSX.Element {
  return (
    <Link className="header__nav-link header__nav-link--profile" to="/login">
      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
      <span className="header__login">Sign in</span>
    </Link>
  );
}

export default Header;
