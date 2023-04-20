import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { AppRoute, Cities, PageTitles } from '../../common/constants';
import { getRandomArrayItem } from '../../common/utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { setCity } from '../../store/main-data/main-data';
import { getUserIsAuthorized } from '../../store/user-process/selectors';

const authDataShema = yup.object({
  email: yup.string()
    .required('Email is a required field')
    .email('Email must be a valid email'),
  password: yup.string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/g, 'Password must contain at least one number and letter'),
});

function LoginPage(): JSX.Element {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userIsAuthorized = useAppSelector(getUserIsAuthorized);

  useEffect(() => {
    document.title = PageTitles.Login;
  }, []);

  const [randomCity,] = useState(getRandomArrayItem<Cities>(Object.values(Cities)));

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  // если пользователь авторизован, редирект на главную
  if (userIsAuthorized) {
    return (<Navigate to={AppRoute.Main} replace />);
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!emailRef || !emailRef.current || !passwordRef || !passwordRef.current) {
      return;
    }

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    };

    authDataShema
      .validate(formData)
      .then(() => dispatch(loginAction(formData)))
      .catch((err: yup.ValidationError) => {
        err.errors.forEach((errorText) => toast.error(errorText));
      });
  };

  // переход на город
  const handleNavigateToCity = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    dispatch(setCity(Cities[randomCity]));
    navigate(AppRoute.Main, { replace: true });
  };

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post">
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input aria-label="email" className="login__input form__input" type="email" name="email" placeholder="Email" ref={emailRef} />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input aria-label="password" className="login__input form__input" type="password" name="password" placeholder="Password" ref={passwordRef} />
            </div>
            <button className="login__submit form__submit button" type="submit" onClick={handleSubmit}>Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href={'/'} onClick={(e) => handleNavigateToCity(e)}>
              <span>{randomCity}</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginPage;
