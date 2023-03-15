import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../common/constants';
import Layout from '../layout';
import Main from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import PropertyPage from '../../pages/property-page/property-page';
import NotFoundPage from '../../pages/not-found-page/nof-found-page';
import Offer from '../../types/offer';
import { useState } from 'react';

type AppProps = {
  offers: Offer[];
};

function App({ offers }: AppProps): JSX.Element {

  const [authData, setAuthData] = useState(false);

  const handleChangeAuth = (isAuthorised: boolean) => {
    setAuthData(isAuthorised);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout changeAuth={handleChangeAuth} isAuthorised={authData} />}>
          <Route index element={<Main offers={offers} />} />
          <Route path={AppRoute.Login} element={<LoginPage changeAuth={handleChangeAuth} isAuthorised={authData} />} />

          <Route path={`${AppRoute.Offer}/:id`} element={<PropertyPage offers={offers} />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
