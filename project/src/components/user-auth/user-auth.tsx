import { Link, useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../common/constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';

function UserAuth(): JSX.Element {

  const location = useLocation();

  const authorizationStatus = useAppSelector((state) => state[NameSpace.User].authorizationStatus);

  const isAuthorised = authorizationStatus === AuthorizationStatus.Auth;
  const isLoginPage = location.pathname === AppRoute.Login;

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          {(!isLoginPage && !isAuthorised) && <SignInLink />}
          {isAuthorised && <UserProfile />}
        </li>
        {isAuthorised && <SignOutLink />}
      </ul>
    </nav>
  );
}

export default UserAuth;

function UserProfile(): JSX.Element {

  const email = useAppSelector((state) => state[NameSpace.User].userProfile?.email);
  const avatarUrl = useAppSelector((state) => state[NameSpace.User].userProfile?.avatarUrl);

  return (
    <div className="header__nav-profile">
      <div className="header__avatar-wrapper user__avatar-wrapper">
        {avatarUrl && <img src={avatarUrl} alt={email} />}
      </div>
      <span className="header__user-name user__name">{email}</span>
    </div>
  );
}

function SignOutLink(): JSX.Element {

  const dispatch = useAppDispatch();

  const handleSignOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <li className="header__nav-item">
      <Link className="header__nav-link" to={'/'} onClick={handleSignOut}>
        <span className="header__signout">Log Out</span>
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
