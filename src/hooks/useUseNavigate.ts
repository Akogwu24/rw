import { useNavigation } from '@react-navigation/native';
import React from 'react';

export const useUseNavigate = () => {
  const navigation = useNavigation<any>();

  const navigate = (route: string, data?: any) => {
    navigation.navigate(route, data);
  };

  return { navigate };
};
