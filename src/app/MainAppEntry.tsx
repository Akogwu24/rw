import React, { useEffect, useState } from 'react';
// import ProtectedApp from './ProtectedApp';
// import { PublicApp } from './PublicApp';
// import { useAuth } from '../context/AuthContext';
import { StatusBar } from 'react-native';
import { Button, Text, View } from 'native-base';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

export const MainAppEntry = () => {
  // const { authState } = useAuth();
  const [auth, setAuth] = useState(undefined);
  const [userInfo, setUserInfo] = useState(undefined);
  console.log({ userInfo });
  useEffect(() => {
    GoogleSignin.configure({ webClientId: '861479018703-q09enfhg5v7jit0spc1dadd6mtgu0s1i.apps.googleusercontent.com' });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      console.log('user', user);
      setUserInfo(user);
    } catch (error) {
      console.log('err', error);
    }
  };

  const logout = async () => {
    setUserInfo(undefined);
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };
  return (
    <>
      {auth ? (
        <View>
          <Text fontSize={40} color='green.400'>
            Protected
          </Text>
          <Button onPress={logout}>Logout</Button>
        </View>
      ) : (
        <View>
          <Text fontSize={40} color='red.400'>
            Pubic
          </Text>
          <GoogleSigninButton size={GoogleSigninButton.Size.Standard} onPress={signIn} />
        </View>
      )}
      {/* {authState?.authenticated ? <ProtectedApp /> : <PublicApp />} */}
      <StatusBar animated={true} backgroundColor='#61dafb' barStyle={'light-content'} showHideTransition={'slide'} />
    </>
  );
};
