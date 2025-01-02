import { UserData } from '../../../recources/Types';
import { clearUserData, setAuthorizationStatus, setUserData } from '../../actions';
import { userReducer } from '../userReducer';

describe('userReducer', () => {
  const initialState = {
    authorizationStatus: false,
    userData: null,
  };

  const mockUserData: UserData = {
    id: 1,
    name: 'Nick Locks',
    avatarUrl: '/img/avatar.jpg',
    isPro: false,
    email: 'locks@example.com',
    token: 'testToken123',
  };

  it('should return the initial state by default', () => {
    expect(userReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle setAuthorizationStatus action', () => {
    expect(userReducer(initialState, setAuthorizationStatus(true))).toEqual({
      ...initialState,
      authorizationStatus: true,
    });

    expect(userReducer(initialState, setAuthorizationStatus(false))).toEqual({
      ...initialState,
      authorizationStatus: false,
    });
  });

  it('should handle setUserData action', () => {
    expect(userReducer(initialState, setUserData(mockUserData))).toEqual({
      ...initialState,
      userData: mockUserData,
    });
  });

  it('should handle clearUserData action', () => {
    const stateWithUserData = {
      ...initialState,
      userData: mockUserData,
    };

    expect(userReducer(stateWithUserData, clearUserData())).toEqual({
      ...initialState,
      userData: null,
    });
  });
});
