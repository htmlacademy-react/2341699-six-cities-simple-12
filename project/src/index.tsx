import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Offers } from './mocks/offers';

const Setting = {
  PlacesFound: 100,
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App placesFound={Setting.PlacesFound} offers={Offers} />
  </React.StrictMode>,
);
