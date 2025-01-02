import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { withHistory, withStore } from '../../recources/mock-component';
import { makeFakeStore } from '../../recources/mock';
import { CITIES } from '../../recources/cities';
import Map from './map';

describe('Map tests', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render map', () => {
    const testCity = CITIES.Amsterdam;
    const withHistoryComponent = withHistory(<Map city={testCity}/>, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const { container } = render(withStoreComponent);

    const mapContainer = container.querySelector('div.mapContainer');
    expect(mapContainer).toBeInTheDocument();
  });
});
