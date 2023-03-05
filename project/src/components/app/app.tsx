import MainPage from '../../pages/main-page/main-page';

type AppProps = {
  placesFound: number;
};

function App(props: AppProps): JSX.Element {
  return <MainPage placesFound={props.placesFound} />;
}

export default App;
