import React from 'react';
import ProtectedApp from './ProtectedApp';
import { PublicApp } from './PublicApp';
import { useAuth } from '../context/AuthContext';
import { StatusBar } from 'react-native';

export const MainAppEntry = () => {
  const { authState } = useAuth();

  return (
    <>
      {authState?.authenticated ? <ProtectedApp /> : <PublicApp />}
      <StatusBar animated={true} backgroundColor='#61dafb' barStyle={'light-content'} showHideTransition={'slide'} />
    </>
  );
};
