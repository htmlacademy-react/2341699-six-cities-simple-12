import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { AppRoute, AuthorizationStatus, Cities, PageTitles } from '../../common/constants';
import { GetRandomArrayItem } from '../../common/utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCity } from '../../store/actions';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';

function LoginPage(): JSX.Element {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  useEffect(() => {
    document.title = PageTitles.Login;
  }, []);

  const [randomCity,] = useState(GetRandomArrayItem<Cities>(Object.values(Cities)));

  const [formData, setFormData] = useState<AuthData>({
    // данные для тестирования
    email: 'Oliver.conner@gmail.com',
    password: 'test123'
  });

  // если пользователь авторизован, редирект на главную
  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (<Navigate to={AppRoute.Main} replace />);
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const authDataShema = yup.object({
      email: yup.string()
        .required('Email is a required field')
        .email('Email must be a valid email'),
      password: yup.string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/g, 'Password must contain at least one number and letter'),
    });

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
              <input className="login__input form__input" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input className="login__input form__input" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
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
