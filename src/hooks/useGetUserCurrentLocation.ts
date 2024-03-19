import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export const useGetUserCurrentLocation = () => {
  const [currentRegion, setCurrentRegion] = useState({ latitude: 37.78225, longitude: -122.4124, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
  const [errorMsg, setErrorMsg] = useState('');

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});

    setCurrentRegion({ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0322, longitudeDelta: 0.0121 });
  };

  useEffect(() => {
    getUserLocation();
  }, []);
  return { getUserLocation, currentRegion };
};

// latitude: 37.78825,
// longitude: -122.4324,
// latitudeDelta: 0.0922,
// longitudeDelta: 0.0421,
