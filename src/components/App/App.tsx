import MainPage from '../../pages/MainPage/MainPage';

type AppProps = {
    numberOfOffers: number;
};

function App({ numberOfOffers }: AppProps): JSX.Element {
  return (
    <MainPage
      numberOfOffers={numberOfOffers}
    />
  );
}

export default App;
