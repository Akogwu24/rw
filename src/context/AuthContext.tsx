import React, {Dispatch, SetStateAction} from 'react';
import {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  errorToast,
  successToast,
  wariningToast,
} from '../components/NotificationHandler';
// import {jwtDecode, JwtPayload} from 'jwt-decode';
import 'core-js/stable/atob';

type TAuthState = {token: string | null; authenticated: boolean | null};

type TAuthProps = {
  authState: TAuthState;
  setAuthState: Dispatch<SetStateAction<TAuthState>>;
  onRegister: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    setOpenModal: any,
    coordinates: {longitude: number; latitude: number},
  ) => Promise<any>;
  onLogin: (email: string, password: string) => Promise<any>;
  onLogout: () => Promise<any>;
};

export const baseURL = 'https://api.routewatche.com/api/v1';
// export const baseURL = 'http://routewatche.us-east-1.elasticbeanstalk.com/api/v1';
// export const baseURL = 'http://routewatche-stg-env.eba-pd7sntn7.us-east-2.elasticbeanstalk.com/api/v1';

const AuthContext = createContext<TAuthProps>({});

export const JWT_TOKEN = 'token';

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [authState, setAuthState] = useState<TAuthState>({
    token: '',
    authenticated: false,
  });

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem(JWT_TOKEN);

      // if (!storedToken) return setAuthState({ token: '', authenticated: false });

      // console.log('storedTokenfff', storedToken);

      // // console.log('storedTokenffff', storedToken, jwtDecode(storedToken));
      // const decoded = jwtDecode(storedToken);
      // const expiryDate = new Date((decoded.exp as number) * 1000);
      // console.log('expiryDate', expiryDate);
      // new Date() >= expiryDate ? setAuthState({ token: '', authenticated: false }) : setAuthState({ token: storedToken, authenticated: true });

      if (!storedToken) {
        setAuthState({
          token: '',
          authenticated: false,
        });
      } else {
        setAuthState({
          token: storedToken,
          authenticated: true,
        });
      }
    };
    loadToken();
  }, []);

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    setOpenModal: any,
    coordinates: {longitude: number; latitude: number},
  ) => {
    if (!firstName || !lastName || !email || !password)
      return wariningToast('All Fields are required');
    try {
      const payload = {
        email,
        firstName,
        lastName,
        password,
        location: {
          type: 'Point',
          coordinates: [coordinates?.longitude, coordinates?.latitude],
        },
      };

      await axios.post(`${baseURL}/auth/register`, payload);
      successToast();
      setOpenModal(true);
    } catch (error: any) {
      errorToast(error.response.data.message || error.response.data.message[0]);
    }
  };

  const login = async (email: string, password: string) => {
    if (!email || !password)
      return wariningToast('Please enter Login information');
    try {
      const {data} = await axios.post(`${baseURL}/auth/login`, {
        email,
        password,
      });

      setAuthState({
        token: data.access_token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.access_token}`;
      await AsyncStorage.setItem(JWT_TOKEN, data.access_token as string);
      await AsyncStorage.setItem('userID', data?._id);
      await AsyncStorage.setItem('userEmail', data?.email);
      // await AsyncStorage.setItem('firstName', data?.firstName);
      // await AsyncStorage.setItem('lastName', data?.lastName);

      return data;
    } catch (e: any) {
      console.log(e);
      errorToast(e.response.data.message || undefined);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(JWT_TOKEN);
      axios.defaults.headers.common['Authorization'] = '';
      setAuthState({
        token: null,
        authenticated: false,
      });
    } catch (e) {}
  };

  const authContextValue = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
    setAuthState,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
