import React from 'react';
// import ProtectedApp from './ProtectedApp';
// import { PublicApp } from './PublicApp';
// import { useAuth } from '../context/AuthContext';
import { StatusBar } from 'react-native';
import { Text } from 'native-base';

export const MainAppEntry = () => {
  // const { authState } = useAuth();

  const auth = false;

  return (
    <>
      {auth ? (
        <Text fontSize={40} color='green.400'>
          Protected
        </Text>
      ) : (
        <Text fontSize={40} color='red.400'>
          Pubic
        </Text>
      )}
      {/* {authState?.authenticated ? <ProtectedApp /> : <PublicApp />} */}
      <StatusBar animated={true} backgroundColor='#61dafb' barStyle={'light-content'} showHideTransition={'slide'} />
    </>
  );
};
