import Storage from '../utils/storage';

const UserProfileCache = new Storage('UserProfileCache', {
  enableLocal: false,
  enableSession: Platform.OS === 'web' ? true : false,
  throttleWait: 0,
  ttl: 0,
});

const load = () => {
  UserProfileCache.load();
};

const setUserProfile = profile => {
  UserProfileCache.put('userProfile', profile);
};

const getUserProfile = () => UserProfileCache.get('userProfile') || {};

const setLoginUserId = userId => {
  UserProfileCache.put('loginUserId', userId);
};

const getLoginUserId = () => {
  UserProfileCache.get('loginUserId') || null;
};

const clear = () => {
  UserProfileCache.clear();
};

export default {
  load,
  setUserProfile,
  getUserProfile,
  setLoginUserId,
  getLoginUserId,
  clear,
};
