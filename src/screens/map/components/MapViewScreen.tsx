import React from 'react';

import { Icon, Text, View } from 'native-base';
import { Dispatch, useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Foundation } from '@expo/vector-icons';
import { scale } from 'react-native-size-matters';

export function MapViewScreen() {
  const [currentRegion, setCurrentRegion] = useState({ latitude: 37.78225, longitude: -122.4124, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
  const [errorMsg, setErrorMsg] = useState('');

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});

    setCurrentRegion({ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View w='full' h='full' flex={1}>
      <MapView
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.009,
          longitudeDelta: 0.004,
        }}
        region={currentRegion}
        // onRegionChange={(data) => console.warn('newly changed region', data)}
      >
        <Marker draggable coordinate={{ latitude: currentRegion.latitude, longitude: currentRegion.longitude }} title='Origin' description={'Your current location'}>
          {/* <Icon as={Foundation} name='marker' size={scale(35)} color='primary' /> */}
          <Foundation name='marker' size={35} color='red' />
        </Marker>
      </MapView>
      {/* <Icon /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    zIndex: -1,
    ...StyleSheet.absoluteFillObject,
  },
});

// latitude: 37.78825,
// longitude: -122.4324,
// latitudeDelta: 0.0922,
// longitudeDelta: 0.0421,
