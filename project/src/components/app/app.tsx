import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../common/constants';
import Layout from '../layout/layout';
import Main from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import PropertyPage from '../../pages/property-page/property-page';
import NotFoundPage from '../../pages/not-found-page/nof-found-page';
import { useAppSelector } from '../../hooks';
import Spinner from '../spinner/spinner';
import { getOffersLoading } from '../../store/main-data/selectors';

function App(): JSX.Element {

  const offersLoading = useAppSelector(getOffersLoading);

  // если данные еще не загружены показываем Спиннер
  if (offersLoading) {
    return (<Spinner />);
  }

  return (
    <Routes>
      <Route path={AppRoute.Main} element={<Layout />}>
        <Route index element={<Main />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />

        <Route path={`${AppRoute.Room}/:id`} element={<PropertyPage />} />

        <Route path={AppRoute.Erorr404} element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
