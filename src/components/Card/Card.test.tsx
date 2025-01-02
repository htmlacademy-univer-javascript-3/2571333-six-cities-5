import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { withHistory, withStore } from '../../recources/MockComponent';
import { makeFakeStore } from '../../recources/Mock';
import Card from './Card';
import { CITIES } from '../../recources/Cities';

describe('Card tests', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render card', () => {
    const withHistoryComponent = withHistory(<Card id={1} title='TestCardTitle' type={'Appartment'} previewImage='path/to/image.jpg' price={100} rating={5} isPremium={false} isFavorite={false} location={{latitude: 10,longitude: 10,zoom: 10}}city={CITIES.Amsterdam} />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(
      {
        User: {
          authorizationStatus: false,
          userData: null
        }
      }
    ));
    const { container } = render(withStoreComponent);

    const cardContainer = container.querySelector('.place-card');
    expect(cardContainer).toBeInTheDocument();
  });


  it('should contain proper name', () => {
    const testTitle = 'TestCardTitle';
    const withHistoryComponent = withHistory(<Card id={1} title={testTitle} type={'Appartment'} previewImage='path/to/image.jpg' price={100} rating={5} isPremium={false} isFavorite={false} location={{latitude: 10,longitude: 10,zoom: 10}}city={CITIES.Amsterdam}/>, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(
      {
        User: {
          authorizationStatus: false,
          userData: null
        }
      }
    ));
    const { container } = render(withStoreComponent);

    const cardContainer = container.querySelector('.place-card');
    expect(cardContainer).toBeInTheDocument();

    const cardNameContainer = cardContainer?.querySelector('.place-card__name');
    expect(cardNameContainer).toBeInTheDocument();

    const cardTitle = cardNameContainer?.querySelector('a')?.textContent;
    expect(cardTitle).toBe(testTitle);
  });


  it('should contain proper name', () => {
    const testCost = 123;
    const withHistoryComponent = withHistory(<Card id={1} title='TestCardTitle' type={'Appartment'} previewImage='path/to/image.jpg' price={testCost} rating={5} isPremium={false} isFavorite={false} location={ {latitude: 10,longitude: 10,zoom: 10}}city={CITIES.Amsterdam}/>, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(
      {
        User: {
          authorizationStatus: false,
          userData: null
        }
      }
    ));
    const { container } = render(withStoreComponent);

    const cardContainer = container.querySelector('.place-card');
    expect(cardContainer).toBeInTheDocument();

    const cardCostContainer = cardContainer?.querySelector('.place-card__price-wrapper');
    expect(cardCostContainer).toBeInTheDocument();

    const cardCost = cardCostContainer?.querySelector('b')?.textContent;
    expect(cardCost).toBe(`€${testCost}`);
  });


  it('should have favorite button as login link if authorizationStatus is false', () => {
    const withHistoryComponent = withHistory(<Card id={1} title='TestCardTitle' type={'Appartment'} previewImage='path/to/image.jpg'price={100} rating={5} isPremium={false} isFavorite={false} location={{latitude: 10,longitude: 10,zoom: 10}}city={CITIES.Amsterdam}/>, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(
      {
        User: {
          authorizationStatus: false,
          userData: null
        }
      }
    ));
    const { container } = render(withStoreComponent);

    const cardContainer = container.querySelector('.place-card');
    expect(cardContainer).toBeInTheDocument();

    const cardCostContainer = cardContainer?.querySelector('.place-card__price-wrapper');
    expect(cardCostContainer).toBeInTheDocument();

    const linkButton = cardCostContainer?.querySelector('a.place-card__bookmark-button');
    expect(linkButton).toBeInTheDocument();
    expect(linkButton).toHaveAttribute('type', 'button');
  });

  it('should have favorite button as button if authorizationStatus is true', () => {
    const withHistoryComponent = withHistory(<Card id={1} title={'TestCardTitle'} type={'Appartment'} previewImage='path/to/image.jpg'price={100} rating={5} isPremium={false} isFavorite={false} location={{latitude: 10,longitude: 10,zoom: 10}}city={CITIES.Amsterdam}/>, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(
      {
        User: {
          authorizationStatus: true,
          userData: {
            id: 1,
            name: 'John',
            avatarUrl: 'path/to/avatar.jpg',
            isPro: false,
            email: 'abc@def.gh',
            token: 'AAAAA'
          }
        }
      }
    ));
    const { container } = render(withStoreComponent);

    const cardContainer = container.querySelector('.place-card');
    expect(cardContainer).toBeInTheDocument();

    const cardCostContainer = cardContainer?.querySelector('.place-card__price-wrapper');
    expect(cardCostContainer).toBeInTheDocument();

    const linkButton = cardCostContainer?.querySelector('button.place-card__bookmark-button');
    expect(linkButton).toBeInTheDocument();
    expect(linkButton).toHaveAttribute('type', 'button');
  });

});
