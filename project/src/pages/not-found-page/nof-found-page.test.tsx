
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import NotFoundPage from './nof-found-page';
import HistoryRouter from '../../components/history-router/history-router';

const history = createMemoryHistory();

describe('Component: NotFoundPage', () => {

  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <NotFoundPage />
      </HistoryRouter>
    );

    expect(screen.getByText('Error 404 - Page Not Found')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent('Back to the main page');

  });

});

