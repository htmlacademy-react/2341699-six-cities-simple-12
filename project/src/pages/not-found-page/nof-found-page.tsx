import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <div className="container ">
      <h2>Ошибка 404. Страница не найдена</h2>
      <hr />
      <Link to="/" className='header__nav-link'>На главную</Link>
    </div>
  );
}

export default NotFoundPage;
