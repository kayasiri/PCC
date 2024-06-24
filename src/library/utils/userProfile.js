import UserProfileStorage from '../storage/userProfile';
import {request} from './request';

const logIn = async data => {
  return request('login', data).then(res => {
    if (res.loginStatus === 'failure' || res.loginStatus === 'error') {
      return Promise.reject(res.message);
    } else {
      const userProfile = {
        firstName: res.FirstName,
        lastName: res.LastName,
        userId: res.Id,
        logInUserId: res.LoginId,
        clinicId: res.ClinicId,
      };

      UserProfileStorage.setUserProfile(userProfile);

      return Promise.resolve(res);
    }
  });

  // try {
  //   const loginResponse = await fetch(
  //     'https://mobile.hccapp.com/mobile2.0/titaniumLoginValidate.php',
  //     {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       body: data,
  //     },
  //   );

  //   if (loginResponse.status === 200) {
  //     const loginResponseJSON = await loginResponse.json();

  //     if (
  //       loginResponseJSON.loginStatus === 'failure' ||
  //       loginResponseJSON.loginStatus === 'error'
  //     ) {
  //       console.log('**** Login Fail ****' + loginResponseJSON.message);
  //       return Promise.reject(loginResponseJSON.message);
  //     } else {
  //       console.log('**** Load Home Page ****');
  //       //Storage.setValue('lastName', loginResponseJSON.LastName);

  //       //Storage.setValue('isSignedIn', 'true');

  //       // navigation.navigate('Home', {
  //       //   firstName: loginResponseJSON.FirstName,
  //       //   lastName: loginResponseJSON.LastName,
  //       //   userId: loginResponseJSON.Id,
  //       //   logInUserId: loginResponseJSON.LoginId,
  //       //   clinicId: loginResponseJSON.ClinicId,
  //       // });

  //       //navigation.navigate('Home');

  //       //UserProfileStorage.setUserProfile(loginResponseJSON);
  //       //UserProfileStorage.setLoginUserId(loginResponseJSON.LoginId);

  //       return Promise.resolve(loginResponseJSON);
  //     }
  //   } else {
  //     console.log('**** Login error - 1 ****');
  //     return Promise.reject(
  //       'An error occurred please try again after some time..!',
  //     );
  //   }

  //   // const userProfile = {
  //   //   firstName: res.FirstName,
  //   //   lastName: res.LastName,
  //   //   userId: res.Id,
  //   //   logInUserId: res.LoginId,
  //   //   clinicId: res.ClinicId,
  //   // };

  //   // UserProfileStorage.setUserProfile(userProfile);

  //   //    return Promise.resolve(userProfile);
  // } catch (err) {
  //   console.log('**** Login error - 2 ****' + JSON.stringify(err));
  //   return Promise.reject('User login failed due to ', JSON.stringify(err));
  // }
};

const logOut = () => {
  UserProfileStorage.clear();
  return Promise.resolve({});
};

export default {
  logIn,
  logOut,
};
