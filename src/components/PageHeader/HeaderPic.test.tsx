import { fireEvent, screen, render } from '@testing-library/react';
import HeaderPic from './HeaderPic';
import { AppRoute } from '../../recources/Routes';
import { MemoryRouter } from 'react-router-dom';

describe('Header picture component', () => {
  it('renders the header picture and container for it', () => {
    const { container } = render(
      <MemoryRouter>
        <HeaderPic />
      </MemoryRouter>);

    const headPicContainer = container.querySelector('.header__left');
    expect(headPicContainer).toBeInTheDocument();

    const headPicLink = screen.getByRole('link', { name: '6 cities logo' });
    expect(headPicLink).toBeInTheDocument();
    fireEvent.click(headPicLink);
    expect(window.location.pathname).toBe(AppRoute.Main);

    const headPic = headPicLink?.querySelector('.header__logo');
    expect(headPic).toBeInTheDocument();

  });
});
