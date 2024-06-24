import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../views/login';
import HomePage from '../../views/homepage';
//import Storage from './src/library/utils/storage';
import UserProfileStorage from '../storage/userProfile';
import UserProfileProvider from '../providers/userProfile';
import UserProfileContext from '../contexts/userProfile';
import {colours} from '../../../src/styles/theme';
import {useAuthorization} from './AuthProvider';
import isObject from 'lodash/isObject';
import {isEmpty} from 'lodash';

const Stack = createStackNavigator();

export default function AppNavigator() {
  //const {status, authToken} = useAuthorization();

  // const {loginUserId, userProfile} = useContext(UserProfileContext);
  // console.log(
  //   '********** AppNavigator - loginUserId : ' +
  //     loginUserId +
  //     ' && userProfile : ' +
  //     JSON.stringify(userProfile) +
  //     ' && ' +
  //     isEmpty(userProfile) +
  //     ' ** ' +
  //     ' && userProfile.LoginId : ' +
  //     userProfile.LoginId +
  //     ' & ' +
  //     (userProfile.LoginId !== null),
  // );

  return (
    // <UserProfileContext.Consumer>
    //   {({loginUserId, userProfile}) => {
    //     console.log(
    //       '**** UserProfileContext.Consumer - userProfile ***' +
    //         JSON.stringify(userProfile) +
    //         ' && loginUserId : ' +
    //         loginUserId,
    //     );
    //     <NavigationContainer>
    //       <Stack.Navigator screenOptions={{headerShown: false}}>
    //         {userProfile ? (
    //           <Stack.Screen name="Home" component={HomePage} />
    //         ) : (
    //           <Stack.Screen name="Login" component={Login} />
    //         )}
    //       </Stack.Navigator>
    //     </NavigationContainer>;
    //   }}
    // </UserProfileContext.Consumer>

    <UserProfileContext.Consumer>
      {({loginUserId, userProfile}) => (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Root"
            screenOptions={{headerShown: false}}>
            {!isEmpty(userProfile) && userProfile.LoginId !== undefined ? (
              <Stack.Screen name="Home" component={HomePage} />
            ) : (
              <Stack.Screen name="Login" component={Login} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </UserProfileContext.Consumer>
  );
}
