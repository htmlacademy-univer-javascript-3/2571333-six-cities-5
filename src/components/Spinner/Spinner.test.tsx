import { render } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner component', () => {
  it('renders the spinner container and spinner element', () => {
    const { container } = render(<Spinner />);

    const spinnerContainer = container.querySelector('.spin-container');
    expect(spinnerContainer).toBeInTheDocument();

    const spinner = spinnerContainer?.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });
});
