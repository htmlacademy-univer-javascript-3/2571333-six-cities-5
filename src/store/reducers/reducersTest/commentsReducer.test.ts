import { ReviewProps } from '../../../components/Review/Review';
import { LoadingStatus } from '../../../recources/LoadingStatus';
import { clearComments, setComments, setLoadingOfferComments } from '../../actions';
import { commentsReducer } from '../commentsReducer';


describe('commentsReducer', () => {
  const initialState = {
    comments: [],
    isCommentsDataLoading: LoadingStatus.Init,
  };

  const mockComment: ReviewProps = {
    id: 1,
    date: '2023-10-01T12:34:56Z',
    user: {
      id: 1,
      name: 'John Doe',
      avatarUrl: '/img/avatar.jpg',
      isPro: true,
    },
    comment: 'Great place!',
    rating: 5,
  };

  it('should return the initial state by default', () => {
    expect(commentsReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle setComments action', () => {
    const mockComments = [mockComment];
    expect(commentsReducer(initialState, setComments(mockComments))).toEqual({
      ...initialState,
      comments: mockComments,
    });
  });

  it('should handle clearComments action', () => {
    const stateWithComments = {
      comments: [mockComment],
      isCommentsDataLoading: LoadingStatus.Success,
    };

    expect(commentsReducer(stateWithComments, clearComments())).toEqual({
      ...initialState,
      comments: [],
      isCommentsDataLoading: LoadingStatus.Init,
    });
  });

  it('should handle setCommentsLoadingStatus action', () => {
    expect(
      commentsReducer(initialState, setLoadingOfferComments(LoadingStatus.Pending))
    ).toEqual({
      ...initialState,
      isCommentsDataLoading: LoadingStatus.Pending,
    });
  });
});
