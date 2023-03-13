import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <div className="container ">
      <div className="error404-header">Oops, something went wrong</div>
      <div className="error404-subheader">Error 404 - Page Not Found</div>
      <div className="error404-details">Lets start again</div>

      <div className='error404-nav'>
        <Link to="/" className='header__nav-link'>Back to the main page</Link>
      </div>

    </div>
  );
}

export default NotFoundPage;
