import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AUTH_STORAGE_KEY } from '../../common/constants';
import Layout from '../layout';
import Main from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import PropertyPage from '../../pages/property-page/property-page';
import NotFoundPage from '../../pages/not-found-page/nof-found-page';
import Offer from '../../types/offer';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';

type AppProps = {
  offers: Offer[];
};

function App({ offers }: AppProps): JSX.Element {

  const userSigned = localStorage.getItem(AUTH_STORAGE_KEY);

  const [authData, setAuthData] = useState(false);

  const handleChangeAuth = (isAuthorised: boolean) => {

    setAuthData(isAuthorised);

    // сохраняем состояние
    if (!isAuthorised) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    else {
      localStorage.setItem(AUTH_STORAGE_KEY, String(isAuthorised));
    }
  };

  if (!authData && userSigned && Boolean(userSigned)) {
    setAuthData(true);
  }

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path={AppRoute.Main} element={<Layout changeAuth={handleChangeAuth} isAuthorised={authData} />}>
            <Route index element={<Main offers={offers} />} />
            <Route path={AppRoute.Login} element={<LoginPage changeAuth={handleChangeAuth} isAuthorised={authData} />} />

            <Route path={`${AppRoute.Room}/:id`} element={<PropertyPage offers={offers} />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
