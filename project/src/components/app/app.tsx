import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../common/constants';
import Layout from '../layout';
import Main from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import PropertyPage from '../../pages/property-page/property-page';
import NotFoundPage from '../../pages/not-found-page/nof-found-page';

type AppProps = {
  placesFound: number;
};

function App(props: AppProps): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<Main placesFound={props.placesFound} />} />
          <Route path={AppRoute.Login} element={<LoginPage />} />

          <Route path={AppRoute.Offer}>
            <Route index element={<Main placesFound={props.placesFound} />} />
            <Route path=":id" element={<PropertyPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
