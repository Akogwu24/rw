import React from 'react';
import 'react-native-gesture-handler';
// import 'expo-dev-client';
import { NavigationContainer } from '@react-navigation/native';
// import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider, Text, extendTheme } from 'native-base';
// import { AuthProvider } from './src/context/AuthContext';
// import { MainAppEntry } from './src/app/MainAppEntry';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { navigationRef } from './src/navigation/RootNavigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from 'react-native-toast-notifications';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MainAppEntry } from './src/app/MainAppEntry';

// SplashScreen.preventAutoHideAsync();
// setTimeout(SplashScreen.hideAsync, 3000);

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

// 3. Extend the internal NativeBase Theme
declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}

const queryClient = new QueryClient();

export default function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider
        placement='top'
        swipeEnabled={true}
        successColor='rgba(222, 242, 213, 1)'
        successIcon={<Entypo name='check' size={24} color='green' />}
        dangerColor='rgba(234, 200, 196, 1)'
        dangerIcon={<Entypo name='block' size={24} color='red' />}
        warningColor='rgba(247, 243, 214, 1)'
        warningIcon={<AntDesign name='warning' size={24} color='rgba(138, 122, 77, 1)' />}
      >
        {/* <AuthProvider> */}
        <QueryClientProvider client={queryClient}>
          <NativeBaseProvider theme={theme}>
            <NavigationContainer
            // ref={navigationRef}
            >
              <MainAppEntry />
              {/* <Toast /> */}
            </NavigationContainer>
          </NativeBaseProvider>
        </QueryClientProvider>
        {/* </AuthProvider> */}
      </ToastProvider>
    </SafeAreaProvider>
  );
}
