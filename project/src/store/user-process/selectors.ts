import { AuthorizationStatus, NameSpace } from '../../common/constants';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
