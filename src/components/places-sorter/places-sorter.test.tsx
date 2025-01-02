import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { withHistory, withStore } from '../../recources/mock-component';
import { makeFakeStore } from '../../recources/mock';
import { SortOptions } from '../../recources/sort-options';
import PlacesSorter from './places-sorter';

describe('Places Sorter tests', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  const onSortingChange = () => {
  };

  it('should render sorter', () => {
    const withHistoryComponent = withHistory(<PlacesSorter currentSorting={SortOptions.POPULAR} onSortingChange={onSortingChange} />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const { container } = render(withStoreComponent);

    const sorterContainer = container.querySelector('.places__sorting');
    expect(sorterContainer).toBeInTheDocument();
  });
});
