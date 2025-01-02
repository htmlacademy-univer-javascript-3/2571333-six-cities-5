import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { withHistory, withStore } from '../../recources/mock-component';
import { makeFakeStore } from '../../recources/mock';
import ReviewBlock from './review-block';

describe('Review Block tests', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render review block', () => {
    const testReviews = [
      {
        id: 1,
        user: {
          id: 1,
          name: 'John',
          avatarUrl: 'path/to/avatar.jpg',
          isPro: false,
        },
        rating: 4,
        comment: 'Hello to you, great dreamer',
        date: '2023-10-12T14:48:00.000Z',
      }
    ];
    const withHistoryComponent = withHistory(<ReviewBlock numberOfReviews={2} postedReviews={testReviews} />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const { container } = render(withStoreComponent);

    const reviewsContainer = container.querySelector('.offer__reviews');
    expect(reviewsContainer).toBeInTheDocument();
  });


  it('should render all reviews', () => {
    const testReviews = [
      {
        id: 1,
        user: {
          id: 1,
          name: 'John',
          avatarUrl: 'path/to/avatar.jpg',
          isPro: false,
        },
        rating: 4,
        comment: 'Hello to you, great dreamer',
        date: '2023-10-12T14:48:00.000Z',
      },
      {
        id: 2,
        user: {
          id: 2,
          name: 'Kenoby',
          avatarUrl: 'path/to/avatar.jpg',
          isPro: false,
        },
        rating: 1,
        comment: 'Hello there',
        date: '2023-10-12T14:48:00.000Z',
      },
      {
        id: 3,
        user: {
          id: 3,
          name: 'Zana',
          avatarUrl: 'path/to/avatar.jpg',
          isPro: false,
        },
        rating: 1,
        comment: 'Still sane?',
        date: '2023-10-12T14:48:00.000Z',
      }
    ];
    const withHistoryComponent = withHistory(<ReviewBlock numberOfReviews={2} postedReviews={testReviews} />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const { container } = render(withStoreComponent);

    const reviewsContainer = container.querySelector('.offer__reviews');
    expect(reviewsContainer).toBeInTheDocument();

    const oneReviewContainers = reviewsContainer ? Array.from(reviewsContainer?.querySelectorAll('.reviews__item')) : [];
    expect(oneReviewContainers[0]).toBeInTheDocument();
    expect(oneReviewContainers[1]).toBeInTheDocument();
    expect(oneReviewContainers[2]).toBeInTheDocument();
  });
});
