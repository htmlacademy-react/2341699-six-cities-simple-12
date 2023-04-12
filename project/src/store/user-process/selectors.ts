import { AuthorizationStatus, NameSpace } from '../../common/constants';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const getUserIsAuthorized = (state: State): boolean => state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth;

export const getUserEmail = (state: State): string => state[NameSpace.User].userProfile?.email ?? '';

export const getUserAvatarUrl = (state: State): string => state[NameSpace.User].userProfile?.avatarUrl ?? '';
