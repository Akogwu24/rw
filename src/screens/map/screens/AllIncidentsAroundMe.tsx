import React, { useRef } from 'react';
import { Button, HStack, Icon, Pressable, Stack, Text, View } from 'native-base';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Foundation } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import http, { API_ENDPOITS } from '../../../services/api';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TIncident } from '../../profile/components/types';
import { useGetAddressFromCoordinates } from '../../../hooks/useGetAddressFromCoordinates';
import dayjs from 'dayjs';
import { calculateDistanceApart } from '../../../utils/utils';
import { useUseNavigate } from '../../../hooks/useUseNavigate';
import { PROTECTED_ROUTES } from '../../../app/routes';

var relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

export const AllIncidentsAroundMe = () => {
  const [currentRegion, setCurrentRegion] = useState({ latitude: 37.78225, longitude: -122.4124, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
  const [errorMsg, setErrorMsg] = useState('');
  const { navigate } = useUseNavigate();
  const { address, getAddressFromCoordinates } = useGetAddressFromCoordinates();

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
      latitudeDelta: 0.0522,
      longitudeDelta: 0.0421,
    });
  };

  useEffect(() => {
    userLocation();
  }, []);

  const { data: allIncidents } = useQuery({
    queryKey: ['ALL-INCIDENTS', currentRegion.longitude, currentRegion.latitude],
    queryFn: async () => {
      const { data } = await http.get(API_ENDPOITS.GET_INCIDENTS({ long: currentRegion.longitude, lat: currentRegion.latitude, radius: 200 }));
      return data;
    },
  });

  return (
    <View w='full' h='full' flex={1}>
      <MapView
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        zoomControlEnabled={true}
        mapType={'standard'}
        initialRegion={{
          longitude: 76.16,
          latitude: 12.53,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0421,
        }}
        region={currentRegion}
        // onMarkerDragEnd={(data) => console.warn('newly changed region', data)}
      >
        {allIncidents?.results.map((incident: TIncident, i: number) => {
          return (
            <Marker
              key={i}
              draggable
              coordinate={{
                latitude: Number(incident?.location?.coordinates[1]),
                longitude: Number(incident?.location?.coordinates[0]),
              }}
              // title={incident?.title}
              description={'Your current location'}
              style={styles.Callout}
              onPress={() => getAddressFromCoordinates(Number(incident.location.coordinates[1]), Number(incident.location.coordinates[0]))}
            >
              <Icon as={Foundation} name='marker' size={35} color='primary' />

              <Callout onPress={() => navigate(PROTECTED_ROUTES.INCIDENT_SUMMARY, incident)}>
                <HStack space={4} alignItems={'center'}>
                  <Stack space={3} p={1}>
                    <Text fontSize={18} fontWeight={600} flex={1}>
                      {incident?.title}
                    </Text>
                    <Stack>
                      {address && <Text color='black'>{`${address?.city || address?.name}`}</Text>}
                      {/* @ts-ignore */}
                      <Text color='black'>{dayjs().to(dayjs(incident?.createdAt))}</Text>
                    </Stack>
                  </Stack>
                  <Stack space={3}>
                    <Text fontWeight={600} borderRadius={30} w={20} color='white' bg='#333' py={1} px={2}>
                      {calculateDistanceApart(currentRegion.longitude, currentRegion.latitude, incident.location.coordinates[0], incident.location.coordinates[1])} miles
                    </Text>

                    {/* <TouchableOpacity style={{ zIndex: 999999999 }} onPress={() => triggerTargetElementPress()}>
                      <Text fontWeight={600} color='#333'>
                        View summary
                      </Text>
                    </TouchableOpacity> */}
                    {/* 
                    <TouchableOpacity style={{ zIndex: 9999909999 }} onPress={() => navigate.navigate(PROTECTED_ROUTES.INCIDENT_SUMMARY, incident)}>
                      <Text fontWeight={600} color='#333'>
                        View summary
                      </Text>
                    </TouchableOpacity> */}
                  </Stack>
                </HStack>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
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
    width: '100%',
  },
});
