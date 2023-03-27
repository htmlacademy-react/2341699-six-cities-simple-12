import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { PageTitles } from '../../common/constants';

type LoginPageProps = {
  isAuthorised: boolean;
  changeAuth: (isAuthorised: boolean) => void;
};

function LoginPage({ isAuthorised, changeAuth }: LoginPageProps): JSX.Element {

  useEffect(() => {
    document.title = PageTitles.Login;
  }, []);

  const [formData, setFormData] = useState({
    // данные для тестирования
    email: 'Oliver.conner@gmail.com',
    password: 'test123'
  });

  // если пользователь авторизован, редирект на главную
  if (isAuthorised) {
    return (<Navigate to={'/'} replace />);
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (formData.email && validatePassword(formData.password)) {
      changeAuth(true);
    }
  };

  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/g;
    return regex.test(password);
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
            <a className="locations__item-link" href="/#">
              <span>Amsterdam</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginPage;
