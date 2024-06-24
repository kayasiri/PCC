import {createContext} from 'react';
import noop from 'lodash/noop';

const UserProfileContext = createContext({
  signIn: noop,
  signOut: noop,
  loginUserId: null,
  userProfile: {},
});

export default UserProfileContext;
