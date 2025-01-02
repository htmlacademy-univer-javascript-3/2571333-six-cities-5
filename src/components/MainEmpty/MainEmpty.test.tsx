import { render } from '@testing-library/react';
import MainEmpty from './MainEmpty';
import { CITIES } from '../../recources/Cities';

describe('Empty main component', () => {
  it('renders component for the empty main page', () => {
    const { container } = render(<MainEmpty city={CITIES.Amsterdam}/>);

    const mainContainer = container.querySelector('.cities');
    expect(mainContainer).toBeInTheDocument();

    const noPlacesSection = mainContainer?.querySelector('.cities__no-places');
    expect(noPlacesSection).toBeInTheDocument();

    const noCityDescription = noPlacesSection?.querySelector('.cities__status-description');
    expect(noCityDescription).toBeInTheDocument();
    expect(noCityDescription?.textContent).toContain(CITIES.Amsterdam.name);
  });
});
