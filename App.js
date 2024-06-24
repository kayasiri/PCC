import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/views/login';
import HomePage from './src/views/homepage';
//import Storage from './src/library/utils/storage';
import UserProfileStorage from './src/library/storage/userProfile';
import UserProfileProvider from './src/library/providers/userProfile';
import UserProfileContext from './src/library/contexts/userProfile';
import {colours} from './src/styles/theme';
import AppNavigator from './src/library/utils/appNavigator';
import {AuthProvider} from './src/library/utils/AuthProvider';

// const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = React.useState(true);
  //const [isSignedIn, setIsSignedIn] = React.useState('false');
  // Storage.getValue('isSignedIn').then(signedIn => {
  //   console.log('*** isSignedIn ****' + signedIn);
  //   setIsSignedIn(signedIn);
  // });
  React.useEffect(() => {
    //console.log('*** App useEffect ****');
    UserProfileStorage.load();
    // .then(() => {
    //   console.log('*** UserProfileStorage Loaded ****');
    // });
  });
  setTimeout(() => {
    setLoading(false);
  }, 3000);

  return (
    <>
      {!loading && (
        <UserProfileProvider>
          <SafeAreaView style={{backgroundColor: colours.bgcolor, flex: 1}}>
            <AppNavigator />
          </SafeAreaView>
        </UserProfileProvider>
      )}
    </>
  );
  // const loadStorage = env => UserProfileStorage.load();
  // useEffect(() => {
  //   UserProfileStorage.load().then(() => {});
  // });
  // return loading ? (
  //   <AppLoading
  //     startAsync={loadAppAsync}
  //     onFinish={() => setLoading(false)}
  //     onError={console.warn}
  //   />
  // ) : (
  //   <RenderUI />
  // );
  // return (
  //   <UserProfileProvider>
  //     <AppNavigator />
  //   </UserProfileProvider>
  // );
}
