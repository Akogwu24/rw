import * as Location from 'expo-location';
import { useState } from 'react';
import { Alert } from 'react-native';

type TLocation = {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  latitude: number;
  longitude: number;
  speed: number;
};

export const useGetCurrentLocation = () => {
  const [userCurrentLocation, setUserCurrentLocation] = useState<any>(null);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserCurrentLocation(location);
  };

  return { getCurrentLocation, userCurrentLocation, coordinates: userCurrentLocation?.coords };
};
