import * as React from 'react';

import UserProfileContext from '../contexts/userProfile';
import UserProfileReducer from '../reducers/userProfile';
import UserProfileStorage from '../storage/userProfile';
import UserProfileUtils from '../utils/userProfile';

export default function UserProfileProvider({children}) {
  const [state, dispatch] = React.useReducer(UserProfileReducer, {
    loginUserId: UserProfileStorage.getLoginUserId(),
    userProfile: UserProfileStorage.getUserProfile(),
  });

  const context = React.useMemo(
    () => ({
      loginUserId: null,
      userProfile: {},

      signIn: data =>
        UserProfileUtils.logIn(data).then(res => {
          console.log(
            '******* UserProfileProvider - res :' + JSON.stringify(res),
          );
          dispatch({type: 'SIGN_IN', userProfile: res});
        }),
      signOut: () =>
        UserProfileUtils.logOut().then(() => dispatch({type: 'SIGN_OUT'})),

      // setUserProfile: profile => {
      //   UserProfileStorage.setUserProfile(profile);

      //   dispatch({
      //     type: 'SET_PROFILE',
      //     profile,
      //   });
      // },
    }),
    [],
  );

  return (
    <UserProfileContext.Provider value={{...context, ...state}}>
      {children}
    </UserProfileContext.Provider>
  );
}
