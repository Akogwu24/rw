import React, { useEffect, useState } from 'react';
import { View, Text, Icon, HStack, Circle } from 'native-base';
import { MapViewScreen } from '../components/MapViewScreen';
import { Entypo, Foundation } from '@expo/vector-icons';
// @ts-ignore
import ActionButton from 'react-native-circular-action-menu';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Platform, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import http, { API_ENDPOITS } from '../../../services/api';
import { useIsFocused } from '@react-navigation/native';

export function IncidentMap() {
  const [currentRegion, setCurrentRegion] = useState({ latitude: 37.78225, longitude: -122.4124, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
  const [incidentCategory, setIncidentCategory] = useState('ROBBERY');
  const [errorMsg, setErrorMsg] = useState('');
  const isFocused = useIsFocused();

  const { data: incidentByNature, isLoading } = useQuery({
    queryKey: ['ALL-INCIDENTS', isFocused, incidentCategory, currentRegion.longitude, currentRegion.latitude],
    queryFn: async () => {
      const { data } = await http.get(API_ENDPOITS.GET_INCIDENTS_BY_CATEGORY(incidentCategory));
      return data;
    },
  });

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});

    setCurrentRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View flex={1}>
      {/* <MapViewScreen /> */}
      <View w='full' h='full' flex={1}>
        <MapView
          showsUserLocation={true}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
          style={styles.map}
          zoomControlEnabled={true}
          mapType={'standard'}
          initialRegion={{
            longitude: 76.16,
            latitude: 12.53,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={currentRegion}
          // onMarkerDragEnd={(data) => console.warn('newly changed region', data)}
        >
          {incidentByNature?.results.map((incident, i) => {
            const markerColor =
              incident?.natureOfIncident == 'KIDNAPPING'
                ? '#1E88E5'
                : incident?.natureOfIncident == 'ROBBERY'
                ? '#DB7005'
                : incident?.natureOfIncident == 'ACCIDENT'
                ? '#269C55'
                : 'red';
            return (
              <Marker
                key={i}
                draggable
                coordinate={{
                  latitude: incident.location.coordinates[1],
                  longitude: incident.location.coordinates[0],
                }}
                description={'Your current location'}
                style={styles.Callout}
              >
                <Circle bg={`${markerColor}20`} p={2}>
                  <Circle bg={`${markerColor}40`}>
                    <Icon as={Entypo} name='dot-single' size={35} color={markerColor || 'primary'} />
                  </Circle>
                </Circle>
                {/* <Icon as={Foundation} name='marker' size={35} color={markerColor || 'primary'} /> */}

                <Callout>
                  <HStack w={200} space={4} alignItems={'center'}>
                    <Text fontSize={16} fontWeight={600} flex={1}>
                      {incident?.title}
                    </Text>
                    <Text fontWeight={600} borderRadius={30} w={20} color='white' bg='#333' py={1} px={2}>
                      0.5miles
                    </Text>
                  </HStack>
                </Callout>
              </Marker>
            );
          })}
        </MapView>
      </View>
      <ActionButton
        btnOutRange='white'
        radius={100}
        bgColor='rgba(0,0,0,0.3)'
        buttonColor='rgba(255,255,255,1)'
        position='right'
        icon={<Entypo name='cross' size={24} color='crimson' />}
      >
        <ActionButton.Item useNativeDriver title='New Task' onPress={() => setIncidentCategory('ROBBERY')}>
          <Text {...cartStyles} bg='rgba(219, 112, 5, 1)'>
            Robbery
          </Text>
        </ActionButton.Item>

        <ActionButton.Item radius={80} buttonColor='#1abc9c' title='All Tasks' onPress={() => setIncidentCategory('KIDNAPPING')}>
          <Text {...cartStyles} bg='rgba(30, 136, 229, 1)'>
            Kidnapping
          </Text>
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#3498db' title='Notifications' onPress={() => setIncidentCategory('ACCIDENT')}>
          <Text {...cartStyles} bg='rgba(38, 156, 85, 1)'>
            Accident
          </Text>
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
}

const cartStyles = {
  bg: 'rgba(219, 112, 5, 1)',
  py: '1',
  px: '2',
  color: 'white',
  w: 90,
  borderRadius: 50,
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    zIndex: -1,
    // ...StyleSheet.absoluteFillObject,
  },
  Callout: {
    borderLeftColor: '#333',
    borderLeftWidth: 3,
  },
});
