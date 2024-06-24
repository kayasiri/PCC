import actionTypes from '../actions/userProfile';

const initState = {
  loginUserId: null,
  userProfile: {},
};

const UserProfileReducer = (prevState = initState, action) => {
  //console.log('UserProfileReducer: action=', JSON.stringify(action));
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return {
        ...prevState,
        loginUserId: action.userProfile.LoginId,
        userProfile: action.userProfile,
      };
    case actionTypes.SIGN_OUT:
      return {
        ...prevState,
        ...initState,
      };
    case actionTypes.RESET_PROFILE:
      return {
        ...prevState,
        ...initState,
      };
    case actionTypes.SET_PROFILE:
      return {
        ...prevState,
        userProfile: action.profile,
      };
  }
};

export default UserProfileReducer;
