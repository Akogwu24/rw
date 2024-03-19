import React, { MutableRefObject, useEffect, useRef } from 'react';
import { Circle, Flex, HStack, Icon, IconButton, Stack, Text, View } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Foundation, Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { scale, verticalScale } from 'react-native-size-matters';
import { CustomStatusBar } from '../../../components/CustomStatusBar';
import { Octicons } from '@expo/vector-icons';
import { useState } from 'react';
import { BottomMapSheet, TTravelInfo } from './BottomMapSheet';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_PLACES_API_KEY } from '../../../utils/constants';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { useGetUserCurrentLocation } from '../../../hooks/useGetUserCurrentLocation';
import MapViewDirections from 'react-native-maps-directions';
import axiosInstance from '../../../services/api';
import axios from 'axios';
import { getTravelInfo } from '../service';
import { wariningToast } from '../../../components/NotificationHandler';

type TLocation = {
  lat: number;
  lng: number;
};

export type TDestination = {
  location: TLocation | undefined;
  description: string;
};
export const MapDirection = () => {
  const { currentRegion } = useGetUserCurrentLocation();
  const [startingPoint, setStartingPoint] = useState<TDestination>({ location: undefined, description: '' });
  const [destination, setDestination] = useState<TDestination>({ location: undefined, description: '' });
  const [travelInfo, setTravelInfo] = useState<TTravelInfo>();
  const [modalVisible, setModalVisible] = useState(false);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (!startingPoint.location || !destination.location) return;
    mapRef?.current?.fitToSuppliedMarkers(['origin', 'destination'], { edgePadding: { top: 50, bottom: 50, left: 50, right: 50 } });
  }, [startingPoint.location, destination.location]);

  useEffect(() => {
    if (!startingPoint.location || !destination.location) return;
    getTravelInfo(startingPoint, destination, GOOGLE_PLACES_API_KEY, setTravelInfo);
  }, [startingPoint.location, destination.location, GOOGLE_PLACES_API_KEY]);

  useEffect(() => {
    if (!startingPoint.location || !destination.location) return;
    if (travelInfo?.distance.value && travelInfo.duration.value) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [travelInfo?.distance.value, travelInfo?.duration.value]);

  console.log('travelInfo', travelInfo);

  const handleOpenBottomSheet = () => {
    if (!startingPoint.location || !destination.location) {
      return wariningToast('Enter starting point and destination first');
    }
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: 'white' }}>
      <CustomStatusBar color='dark-content' />
      <Flex align='center' direction='row' w={'full'} p={3} paddingTop={verticalScale(50)}>
        <Stack flex={1} space={scale(15)}>
          <Flex>
            <HStack space={4}>
              <Circle bg='gray.400' mt={1} w={scale(25)} h={scale(25)}>
                <Ionicons name='checkmark' size={20} color='#fff' />
              </Circle>

              <GooglePlacesAutocomplete
                // ref={googlePlacesAutocompleteRef}
                nearbyPlacesAPI='GooglePlacesSearch'
                placeholder='starting point'
                fetchDetails={true}
                GooglePlacesDetailsQuery={{ rankby: 'distance' }}
                debounce={400}
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  setStartingPoint({ location: details?.geometry?.location, description: data?.description });
                }}
                isRowScrollable={true}
                onFail={(fail) => console.warn(fail)}
                query={{
                  key: GOOGLE_PLACES_API_KEY,
                  language: 'en',
                  components: 'country:ng',
                  // radius: '30000',
                  // location: ``,
                }}
                styles={{
                  container: { width: '100%', zIndex: 2 },
                  listView: { top: 0, right: 10, position: 'relative', backgroundColor: 'white', borderColor: 'red', color: '#333' },
                  textInputContainer: { height: 40 },
                  textInput: { width: '100', height: 38, borderColor: '#ddd', borderWidth: 1 },
                }}
                renderRow={(results) => (
                  <>
                    <Circle bg='#efefef' mr={1}>
                      <Ionicons name='md-location-sharp' size={16} color='rebeccapurple' />
                    </Circle>
                    <Text>{results.description}</Text>
                  </>
                )}
                // minLength={2}
                enablePoweredByContainer={false}
                listEmptyComponent={<Text>No Location found Check your connection</Text>}
                listLoaderComponent={<Text>Getting Locations...</Text>}
              />
            </HStack>
          </Flex>
          <Flex>
            <HStack space={4}>
              <Circle bg='primary' mt={1} w={scale(25)} h={scale(25)}>
                <Ionicons name='ios-location-sharp' size={20} color='white' />
              </Circle>

              <GooglePlacesAutocomplete
                // ref={googlePlacesAutocompleteRef}
                nearbyPlacesAPI='GooglePlacesSearch'
                placeholder='Destiation'
                fetchDetails={true}
                GooglePlacesDetailsQuery={{ rankby: 'distance' }}
                debounce={400}
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true

                  setDestination({ location: details?.geometry?.location, description: data?.description });
                }}
                isRowScrollable={true}
                onFail={(fail) => console.warn(fail)}
                query={{
                  key: GOOGLE_PLACES_API_KEY,
                  language: 'en',
                  components: 'country:ng',
                  // radius: '30000',
                  // location: ``,
                }}
                styles={{
                  container: { width: '100%', zIndex: 2 },
                  listView: { top: 0, right: 10, position: 'relative', backgroundColor: 'white', borderColor: 'red', color: '#333' },
                  textInputContainer: { height: 40 },
                  textInput: { width: '100', height: 38, borderColor: '#ddd', borderWidth: 1 },
                }}
                renderRow={(results) => (
                  <>
                    <Circle bg='#efefef' mr={1}>
                      <Ionicons name='md-location-sharp' size={16} color='rebeccapurple' />
                    </Circle>
                    <Text>{results.description}</Text>
                  </>
                )}
                // minLength={2}
                enablePoweredByContainer={false}
                listEmptyComponent={<Text>No Location found Check your connection</Text>}
                listLoaderComponent={<Text>Getting Locations...</Text>}
              />
            </HStack>
          </Flex>
        </Stack>
        <Circle ml={2} w={scale(32)} h={scale(32)} bg='gray.200'>
          <IconButton onPress={handleOpenBottomSheet} icon={<Icon as={MaterialIcons} name='timer' />} borderRadius='full' />
        </Circle>
      </Flex>

      <View w='full' h='full' flex={1}>
        <MapView
          ref={mapRef}
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={currentRegion}
          // onRegionChange={(data) => console.warn('newly changed region', data)}
        >
          {destination.location && startingPoint.location && (
            <MapViewDirections
              apikey={GOOGLE_PLACES_API_KEY}
              strokeWidth={3}
              strokeColor='black'
              origin={{ latitude: startingPoint.location?.lat as number, longitude: startingPoint.location?.lng as number }}
              destination={{ latitude: destination.location?.lat as number, longitude: destination.location?.lng as number }}
            />
          )}

          {startingPoint.location && (
            <Marker
              draggable
              coordinate={{ latitude: startingPoint.location?.lat as number, longitude: startingPoint.location?.lng as number }}
              title='Origin'
              identifier='origin'
              description={'Your starting point'}
            >
              <FontAwesome name='dot-circle-o' size={35} color='white' />
            </Marker>
          )}
          {destination.location && (
            <Marker
              draggable
              coordinate={{ latitude: destination.location?.lat as number, longitude: destination.location?.lng as number }}
              title='Destination'
              identifier='destination'
              description={'where you want to go'}
            >
              <Foundation name='marker' size={35} color='red' />
            </Marker>
          )}
        </MapView>
      </View>

      <BottomMapSheet modalVisible={modalVisible} setModalVisible={setModalVisible} destination={destination} startingPoint={startingPoint} travelInfo={travelInfo} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    zIndex: -1,
    ...StyleSheet.absoluteFillObject,
  },
});
