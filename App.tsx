/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ToastProvider} from 'react-native-toast-notifications';
import {AuthProvider} from './src/context/AuthContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {MainAppEntry} from './src/app/MainAppEntry';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/navigation/RootNavigation';
import Happy from 'react-native-vector-icons/Entypo';

GoogleSignin.configure({
  webClientId:
    '379284442293-2kjgcge5knd4iasu93nblsk5liitc424.apps.googleusercontent.com',
  iosClientId:
    '379284442293-pvgq7o2u2dcur4nvfvngvuvajh8et990.apps.googleusercontent.com',
});

const theme = extendTheme({
  colors: {
    primary: '#2E007F',
  },
  fonts: {},
  brand: {
    200: '#2E007F',
  },
});

type CustomThemeType = typeof theme;

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}

const queryClient = new QueryClient();

function App() {
  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log('suceesful sign in', googleCredential);
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log('google error', error);
    }
  }
  return (
    <SafeAreaProvider>
      <ToastProvider
        placement="top"
        swipeEnabled={true}
        successColor="rgba(222, 242, 213, 1)"
        successIcon={<Entypo name="emoji-happy" size={24} color="green" />}
        dangerColor="rgba(234, 200, 196, 1)"
        dangerIcon={<Entypo name="block" size={24} color="red" />}
        warningColor="rgba(247, 243, 214, 1)"
        warningIcon={
          <AntDesign name="warning" size={24} color="rgba(138, 122, 77, 1)" />
        }>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <NativeBaseProvider theme={theme}>
              <NavigationContainer ref={navigationRef}>
                <MainAppEntry />
                {/* <Toast /> */}
              </NavigationContainer>
            </NativeBaseProvider>
          </QueryClientProvider>
        </AuthProvider>
      </ToastProvider>
    </SafeAreaProvider>
  );
}

export default App;
