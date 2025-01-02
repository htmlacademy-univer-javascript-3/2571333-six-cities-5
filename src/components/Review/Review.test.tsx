import { render, screen } from '@testing-library/react';
import Review, { ReviewProps } from './review';
import * as dateUtils from './date-parsers';

vi.mock('./date-parsers', () => ({
  parseDateNumber: vi.fn(),
  parseDateWord: vi.fn(),
}));

describe('Review component', () => {
  const mockReview: ReviewProps = {
    id: 1,
    date: '2023-10-12T14:48:00.000Z',
    user: {
      id: 1,
      name: 'John Doe',
      avatarUrl: '/path/to/avatar.jpg',
      isPro: false,
    },
    comment: 'Great place to stay!',
    rating: 4,
  };

  it('should render correctly', () => {
    const parseDateNumberMock = dateUtils.parseDateNumber as jest.Mock;
    const parseDateWordMock = dateUtils.parseDateWord as jest.Mock;

    parseDateNumberMock.mockReturnValue('2023-10-12');
    parseDateWordMock.mockReturnValue('October 2023');

    render(<Review {...mockReview} />);

    const avatar = screen.getByAltText('Reviews avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', '/path/to/avatar.jpg');
    expect(avatar).toHaveAttribute('width', '54');
    expect(avatar).toHaveAttribute('height', '54');

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Great place to stay!')).toBeInTheDocument();

    const timeElement = screen.getByText('October 2023');
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveAttribute('dateTime', '2023-10-12');

    expect(parseDateNumberMock).toHaveBeenCalledWith(new Date('2023-10-12T14:48:00.000Z'));
    expect(parseDateWordMock).toHaveBeenCalledWith(new Date('2023-10-12T14:48:00.000Z'));
  });
});
