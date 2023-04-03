import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../common/constants';
import Layout from '../layout';
import Main from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import PropertyPage from '../../pages/property-page/property-page';
import NotFoundPage from '../../pages/not-found-page/nof-found-page';
import { useAppSelector } from '../../hooks';
import Spinner from '../spinner/spinner';

function App(): JSX.Element {

  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  // если данные еще не загружены показываем Спиннер
  if (isOffersDataLoading) {
    return (<Spinner />);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout />}>
          <Route index element={<Main />} />
          <Route path={AppRoute.Login} element={<LoginPage />} />

          <Route path={`${AppRoute.Room}/:id`} element={<PropertyPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
