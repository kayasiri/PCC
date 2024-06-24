import React, {useContext} from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {styles} from '../styles/theme';
import NetInfo from '@react-native-community/netinfo';
import UserProfileContext from '../library/contexts/userProfile';

const Login = ({}) => {
  //const isDarkMode = useColorScheme() === 'dark';

  const [username, onUsernameChange] = React.useState('demouser');
  const [password, onPasswordChange] = React.useState('demouser');
  const [loading, showLoading] = React.useState(false);

  const {signIn} = useContext(UserProfileContext);

  const clearPressed = () => {
    onUsernameChange('');
    onPasswordChange('');
    showLoading(false);
  };

  const loginPressed = () => {
    if (username.trim() === '') {
      Alert.alert('Please enter username');
    } else if (password.trim() === '') {
      Alert.alert('Please enter password');
    } else {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          doLogin();
        } else {
          Alert.alert('Please check your network connection.');
        }
      });
    }
  };

  const doLogin = async () => {
    showLoading(true);

    var loginFormData = new FormData();
    loginFormData.append('username', username.trim());
    loginFormData.append('password', password);
    loginFormData.append('isMobile', true);

    signIn(loginFormData).catch(err => {
      showLoading(false);
      Alert.alert(err);
    });
  };

  return (
    <ScrollView
      style={styles.loginWindowBGStyle}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
      }}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Text style={styles.loginTitle}>PCC</Text>
        <TextInput
          style={{...styles.text_input, marginTop: 20}}
          placeholder="Username"
          keyboardType="default"
          value={username}
          onChangeText={onUsernameChange}
          autoCapitalize={'none'}
        />
        <TextInput
          style={{...styles.text_input, marginTop: 20}}
          placeholder="Password"
          keyboardType="default"
          secureTextEntry={true}
          value={password}
          onChangeText={onPasswordChange}
          autoCapitalize={'none'}
        />
        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={{...styles.button, marginRight: 10}}
            onPress={clearPressed}>
            <Text style={[styles.clearButtonText]}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={loginPressed}>
            <Text style={[styles.loginButtonText]}>Login</Text>
          </TouchableOpacity>
        </View>

        <ActivityIndicator
          size="large"
          color="#FFF"
          style={{marginTop: 20}}
          animating={loading}
        />
      </View>
    </ScrollView>
  );
};

export default Login;
