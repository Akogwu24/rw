import React from 'react';
import { Button, FormControl, Icon, Input, KeyboardAvoidingView, ScrollView, Text, VStack, View } from 'native-base';
import { useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, Pressable, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { COLORS, globalStyles, inputStyles } from '../../../globalStyles';
import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { JWT_TOKEN, baseURL, useAuth } from '../../../context/AuthContext';
import { PUBLIC_ROUTES } from '../../../app/routes';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { androidClientdId, iosClientdId } from '../../../utils/constants';
import http, { API_ENDPOITS } from '../../../services/api';
import { errorToast, successToast, wariningToast } from '../../../components/NotificationHandler';
import axios from 'axios';
import * as AppleAuthentication from 'expo-apple-authentication';

WebBrowser.maybeCompleteAuthSession();

export function LoginScreen() {
  const [show, setShow] = useState(false);
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin, setAuthState } = useAuth();
  const [appleAuthAvailableOnDevice, setAppleAuthAvailableOnDevice] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: iosClientdId,
    androidClientId: androidClientdId,
  });

  useEffect(() => {
    const checkAvailable = async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      setAppleAuthAvailableOnDevice(isAvailable);
    };

    checkAvailable();
  }, []);

  async function LoginWithGoogle(idToken: string) {
    try {
      const { data } = await axios.post(`${baseURL}${API_ENDPOITS.LOGIN_WITH_GOOGLE}`, { idToken });

      setAuthState({ authenticated: true, token: data?.accessToken?.access_token });
      axios.defaults.headers.common['Authorization'] = `Bearer ${data?.accessToken?.access_token}`;
      await AsyncStorage.setItem(JWT_TOKEN, data?.accessToken?.access_token as string);
      await AsyncStorage.setItem('userID', data?._id);

      successToast();
    } catch (error) {
      console.log(error);
      errorToast();
    }
  }
  useEffect(() => {
    if (response?.type === 'success') {
      console.log('response in useEffect', response);
      const idToken = response?.params?.id_token || response?.authentication?.idToken;
      console.log('idToken', idToken);
      LoginWithGoogle(idToken as string);
    } else {
    }
  }, [response]);

  const getAppleAuthContent = () => {
    return (
      <View style={styles.container}>
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={styles.button}
          onPress={async () => {
            try {
              // const credential = await AppleAuthentication.signInAsync();
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [AppleAuthentication.AppleAuthenticationScope.FULL_NAME, AppleAuthentication.AppleAuthenticationScope.EMAIL],
              });
              console.log('credential', credential);
              // signed in

              credential?.email && (await AsyncStorage.setItem('appleEmail', credential?.email));

              credential?.fullName?.familyName && (await AsyncStorage.setItem('lastName', credential?.fullName?.familyName));

              credential?.fullName?.givenName && (await AsyncStorage.setItem('firstName', credential?.fullName?.givenName));

              const appleEmail = await AsyncStorage.getItem('appleEmail');
              const lastName = await AsyncStorage.getItem('lastName');
              const firstName = await AsyncStorage.getItem('firstName');

              const payload = {
                idToken: credential?.identityToken,
                email: credential?.email || appleEmail,
                firstName: credential?.fullName?.givenName || firstName,
                lastName: credential?.fullName?.givenName || lastName,
              };

              const { data } = await http.post(API_ENDPOITS.LOGIN_WITH_APPLE, payload);

              setAuthState({ token: data.accessToken.access_token, authenticated: true });
              successToast('Successfully logged in');
              axios.defaults.headers.common['Authorization'] = `Bearer ${data?.accessToken?.access_token}`;
              await AsyncStorage.setItem(JWT_TOKEN, data?.accessToken?.access_token as string);
              await AsyncStorage.setItem('userID', data?._id);
            } catch (e: any) {
              if (e.code === 'ERR_REQUEST_CANCELED') {
                // handle that the user canceled the sign-in flow
                wariningToast('You cancelled the login process');
              } else {
                // handle other errors
                console.log('apple error', e);
                errorToast();
              }
            }
          }}
        />
      </View>
    );
  };

  return (
    <ImageBackground alt='...' style={[styles.dontCrossBg]} source={require('../../../../assets/images/dont-cross-bg.png')}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <VStack alignItems='center'>
            {/* <Image alt='login' resizeMode='cover' source={require('../../../../assets/icon.png')} width={100} height={100} /> */}
            <Image alt='login' source={require('../../../../assets/logo-no_bg.png')} style={{ width: 60, height: 60, resizeMode: 'cover' }} />
            <Text fontSize={'xl'} my={5} color='white' fontWeight={500}>
              Welcome to RouteWatche
            </Text>
          </VStack>
          {/* <KeyboardAvoidingView behavior='height' flex={1}> */}
          <View bg='white' p='5' borderTopRadius={20}>
            <Button
              variant={'outline'}
              style={[globalStyles.button, { backgroundColor: COLORS.primary, marginTop: 10 }]}
              startIcon={<EvilIcons color='white' name='sc-google-plus' size={24} />}
              onPress={() => promptAsync()}
            >
              <Text style={{ color: 'white' }}>Sign up/Log in with Google</Text>
            </Button>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
              <View style={{ flex: 1, height: 1, backgroundColor: '#ddd' }} />
              <View>
                <Text style={{ width: 30, textAlign: 'center', fontSize: 20, color: '#555' }}>Or</Text>
              </View>
              <View style={{ flex: 1, height: 1, backgroundColor: '#ddd' }} />
            </View>
            {/* apple login */}
            {appleAuthAvailableOnDevice ? getAppleAuthContent() : null}
            {/* apple login */}

            <FormControl mb={10} mt={5}>
              <FormControl.Label>Email Address</FormControl.Label>
              <Input {...inputStyles} onChangeText={setEmail} placeholder='Enter your email' />
              <FormControl.Label mt={5}>Password</FormControl.Label>
              <Input
                {...inputStyles}
                onChangeText={setPassword}
                type={show ? 'text' : 'password'}
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />} size={5} mr='2' color='muted.400' />
                  </Pressable>
                }
                placeholder='Password'
              />
            </FormControl>
            <TouchableOpacity onPress={() => onLogin(email, password)} style={[globalStyles.button, { backgroundColor: COLORS.primary }]}>
              <Text color='white'>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(PUBLIC_ROUTES.REGISTER)}
              style={[globalStyles.button, { backgroundColor: COLORS.primary, marginVertical: 10 }]}
            >
              <Text color='white'>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate(PUBLIC_ROUTES.FORGOT_PASSWORD)}>
              <Text fontWeight={600} textAlign={'center'} my={5}>
                Fogot Password?
              </Text>
            </TouchableOpacity>
          </View>
          {/* </SafeAreaView> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  dontCrossBg: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {},
  button: {
    width: Dimensions.get('window').width - 40,
    height: 40,
  },
});
