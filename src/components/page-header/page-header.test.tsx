import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { withHistory, withStore } from '../../recources/mock-component';
import { makeFakeStore } from '../../recources/mock';
import PageHeader from './page-header';

describe('Page Header tests', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render header', () => {
    const withHistoryComponent = withHistory(<PageHeader />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const { container } = render(withStoreComponent);

    const headerContainer = container.querySelector('header.header');
    expect(headerContainer).toBeInTheDocument();
  });


  it('should contain username if logged in', () => {
    const withHistoryComponent = withHistory(<PageHeader />, mockHistory);
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

    const headerContainer = container.querySelector('header.header');
    expect(headerContainer).toBeInTheDocument();

    const usernameContainer = headerContainer?.querySelector('.user__name');
    expect(usernameContainer).toHaveTextContent('John');
  });

  it('should not contain username if not logged in', () => {
    const withHistoryComponent = withHistory(<PageHeader />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(
      {
        User: {
          authorizationStatus: false,
          userData: null
        }
      }
    ));
    const { container } = render(withStoreComponent);

    const headerContainer = container.querySelector('header.header');
    expect(headerContainer).toBeInTheDocument();

    const usernameContainer = headerContainer?.querySelector('.user__name');
    expect(usernameContainer).toBeNull();
  });

});
