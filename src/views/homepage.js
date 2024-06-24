/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {styles, colours} from '../styles/theme';
import UserProfileStorage from '../library/storage/userProfile';
import UserProfileContext from '../library/contexts/userProfile';
import {Image} from 'react-native-elements';
//import Storage from '../utils/storage';
import tw from 'tailwind-rn';
import {RNCamera as Camera} from 'react-native-camera';

const HomePage = ({navigation, route}) => {
  // Storage.getValue('lastName').then(value => {
  //   console.log('*** HomePage ****' + value);
  // });

  const profile = UserProfileStorage.getUserProfile();

  const {signOut} = React.useContext(UserProfileContext);

  //const {userProfile} = React.useContext(UserProfileContext);

  const myCamera = React.useRef();
  const [showCamera, setShowCamera] = React.useState(false);
  const [imageURI, setImageURI] = React.useState('');
  const [showPreview, setShowPreview] = React.useState(true);
  //const [showUpload, setShowUpload] = React.useState(false);

  const doLogout = () => {
    signOut();
  };

  const uploadImage = () => {
    console.log('*** uploadImage ****');
  };

  const captureImage = async () => {
    try {
      setShowCamera(true);
      if (myCamera) {
        const options = {quality: 0.5, base64: true};
        const data = await myCamera.current.takePictureAsync(options);
        //console.log('**** data ****' + JSON.stringify(data));
        console.log('**** data ****' + data.uri);
        setImageURI(data.uri);
        //setImageURI(data.base64);
        setShowCamera(false);
        setShowPreview(true);
      }
    } catch (err) {
      console.log('err: ', err);
    }
  };

  const saveImage = async filePath => {
    try {
      // set new image name and filepath
      const newImageName = `${moment().format('DDMMYY_HHmmSSS')}.jpg`;
      const newFilepath = `${dirPicutures}/${newImageName}`;
      // move and save image to new filepath
      const imageMoved = await moveAttachment(filePath, newFilepath);
      console.log('image moved', imageMoved);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={[
        tw('flex flex-col h-full'),
        {...styles.loginWindowBGStyle, padding: 10},
      ]}>
      <View style={[tw('flex flex-row justify-between items-center')]}>
        <Text style={{...styles.welcomeTitle}}>
          Welcome {profile.firstName} {profile.lastName}
        </Text>
        <Image
          style={{width: 32, height: 32}}
          source={require('../assets/logout.png')}
          onPress={doLogout}
        />
      </View>
      <View style={[tw('flex flex-1')]}>
        <TouchableOpacity
          style={{...styles.button, marginTop: 5}}
          onPress={captureImage}>
          <Text style={[styles.loginButtonText]}>Capture Image</Text>
        </TouchableOpacity>
        {showCamera && (
          <Camera
            ref={myCamera}
            style={styles.preview}
            flashMode={Camera.Constants.FlashMode.off}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            captureAudio={false}>
            {/* <Text style={styles.capture} onPress={takePicture}>
              CAPTURE
            </Text> */}
          </Camera>
        )}
        {showPreview && (
          <View style={{...styles.preview}}>
            <Image
              style={{
                width: 32,
                height: 32,
              }}
              source={require('../assets/logout.png')}
              // source={{
              //   //uri: Image.resolveAssetSource(imageURI).uri,
              //   //uri: 'data:image/jpeg;base64,' + imageURI,
              //   uri: 'file:///var/mobile/Containers/Data/Application/2789E17E-FDF7-483F-B3CA-F214AD858938/Library/Caches/Camera/BC67F265-00EA-44E1-A3CC-72763453B061.jpg',
              // }}
            />
          </View>
        )}
      </View>

      {/* <View
        style={[
          tw('flex flex-grow justify-between'),
          {marginTop: 5, backgroundColor: 'green'},
        ]}>
        {imageURI && (
          <Image
            source={{
              uri: imageURI,
              //uri: 'data:image/jpeg;base64,' + base64image,
            }}
            style={{height: '100%', width: '100%', backgroundColor: 'red'}}
          />
        )}
      </View> */}

      {/* <ScrollView
          style={{backgroundColor: 'red', flex: 1}}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}> */}

      {/* </ScrollView> */}
      {showPreview && (
        <View>
          <TouchableOpacity
            style={{
              ...styles.button,
              width: 100,
              marginTop: 5,
            }}
            onPress={uploadImage}>
            <Text style={[styles.loginButtonText]}>Upload</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HomePage;
