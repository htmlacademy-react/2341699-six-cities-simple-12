import { AuthorizationStatus, AUTH_TOKEN_KEY_NAME } from "../../common/constants";
import { makeFakeUserData } from "../../common/mocks";
import { UserProcess } from "../../types/store";
import { checkAuthAction, loginAction, logoutAction } from "../api-actions";
import { userProcess } from "./user-process";

describe('Reducer: user-process', () => {

  let state: UserProcess;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userProfile: undefined
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({ authorizationStatus: AuthorizationStatus.Unknown });
  });

  describe('checkAuthAction test', () => {

    it('should update authorizationStatus to "AUTH" if checkAuthAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.fulfilled.type }))
        .toEqual({ authorizationStatus: AuthorizationStatus.Auth });
    });

    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.rejected.type }))
        .toEqual({ authorizationStatus: AuthorizationStatus.NoAuth });
    });
  });

  describe('loginAction test', () => {

    it('should update authorizationStatus to "AUTH" if loginAction fulfilled', () => {

      const fakeUserData = makeFakeUserData();
      Storage.prototype.setItem = jest.fn();

      expect(userProcess.reducer(state, { type: loginAction.fulfilled.type, payload: fakeUserData }))
        .toEqual({ authorizationStatus: AuthorizationStatus.Auth, userProfile: fakeUserData });

      expect(Storage.prototype.setItem).toBeCalledTimes(1);
      expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME, fakeUserData.token);

    });

    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(userProcess.reducer(state, { type: loginAction.rejected.type }))
        .toEqual({ authorizationStatus: AuthorizationStatus.NoAuth });
    });
  });

  describe('logoutAction test', () => {

    it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {

      Storage.prototype.removeItem = jest.fn();

      expect(userProcess.reducer(state, { type: logoutAction.fulfilled.type }))
        .toEqual({ authorizationStatus: AuthorizationStatus.NoAuth });

      expect(Storage.prototype.removeItem).toBeCalledTimes(1);
      expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
    });

  });

});
