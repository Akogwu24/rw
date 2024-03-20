import React from 'react';
import { StatusBar } from 'react-native';

export const CustomStatusBar = ({ color = 'dark-content' }: { color?: 'dark-content' | 'light-content' }) => {
  return <StatusBar animated={true} backgroundColor='#61dafb' barStyle={color} showHideTransition={'slide'} />;
};
