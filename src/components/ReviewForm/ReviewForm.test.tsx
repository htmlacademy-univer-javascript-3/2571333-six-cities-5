import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { withHistory, withStore } from '../../recources/MockComponent';
import { makeFakeStore } from '../../recources/Mock';
import ReviewForm from './ReviewForm';
import userEvent from '@testing-library/user-event';

describe('Review Form tests', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render form', () => {
    const withHistoryComponent = withHistory(<ReviewForm />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const { container } = render(withStoreComponent);

    const formContainer = container.querySelector('.reviews__form');
    expect(formContainer).toBeInTheDocument();
  });


  it('should render form button', () => {
    const withHistoryComponent = withHistory(<ReviewForm />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const { container } = render(withStoreComponent);

    const formContainer = container.querySelector('.reviews__form');
    expect(formContainer).toBeInTheDocument();

    const submitButtonContainer = formContainer?.querySelector('.reviews__submit');
    expect(submitButtonContainer).toBeInTheDocument();
  });


  it('should have button disabled if text is empty', () => {
    const withHistoryComponent = withHistory(<ReviewForm />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const { container } = render(withStoreComponent);

    const formContainer = container.querySelector('.reviews__form');
    expect(formContainer).toBeInTheDocument();

    const submitButtonContainer = formContainer?.querySelector('.reviews__submit');
    expect(submitButtonContainer).toBeInTheDocument();
    expect(submitButtonContainer).toBeDisabled();

  });


  it('should have button disabled if text is too short', () => {
    const withHistoryComponent = withHistory(<ReviewForm />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const { container } = render(withStoreComponent);

    const textarea = container.querySelector('textarea[name="review"]');
    if (textarea) {
      fireEvent.change(textarea, { target: { value: 'Short comment' } });
    }

    const formContainer = container.querySelector('.reviews__form');
    expect(formContainer).toBeInTheDocument();

    const submitButtonContainer = formContainer?.querySelector('.reviews__submit');
    expect(submitButtonContainer).toBeInTheDocument();
    expect(submitButtonContainer).toBeDisabled();
  });


  it('should have button enabled if text long enough', async () => {
    const withHistoryComponent = withHistory(<ReviewForm />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const { container } = render(withStoreComponent);

    const formContainer = container.querySelector('.reviews__form');
    expect(formContainer).toBeInTheDocument();

    const textFieldContent = 'Not so short comment that has enough good info here and there about the place';

    const textArea = container.querySelector('.reviews__textarea');
    if (textArea) {
      await userEvent.type(textArea, textFieldContent);
    }

    expect(textArea).toHaveValue(textFieldContent);

    const submitButtonContainer = formContainer?.querySelector('.reviews__submit');
    expect(submitButtonContainer).toBeInTheDocument();

    expect(submitButtonContainer).toHaveAttribute('disabled', '');
  });
});
