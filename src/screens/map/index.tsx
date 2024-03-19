import React, { useState } from 'react';
import { SafeAreaView, Platform } from 'react-native';
import { Badge, Image, View, Pressable, Circle, Icon } from 'native-base';
import { scale } from 'react-native-size-matters';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'native-base';
import { searches } from './components/extras';
import { useNavigation } from '@react-navigation/native';
import { PROTECTED_ROUTES } from '../../app/routes';
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import { GOOGLE_PLACES_API_KEY } from '../../utils/constants';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRef } from 'react';
import { AllIncidentsAroundMe } from './screens/AllIncidentsAroundMe';

export default function Map() {
  const navigation = useNavigation<any>();
  const googlePlacesAutocompleteRef = useRef<GooglePlacesAutocompleteRef | null>(null);
  const [activeLandmark, setActiveLandmark] = useState('atm');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex={1} position='relative'>
        {/* <GooglePlacesAutocomplete
          ref={googlePlacesAutocompleteRef}
          nearbyPlacesAPI='GooglePlacesSearch'
          placeholder='Enter Location'
          fetchDetails={true}
          GooglePlacesDetailsQuery={{ rankby: 'distance' }}
          debounce={300}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
          }}
          onFail={(fail) => console.warn(fail)}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: 'en',
            components: 'country:ng',
            // radius: '30000',
            // location: ``,
          }}
          styles={{
            container: { padding: scale(12), width: '100%', zIndex: 2, position: 'absolute' },
            listView: { top: -5, backgroundColor: 'white', color: '#333' },
            textInputContainer: {},
            // textInput: { borderColor: '#333', borderWidth: 1 },
          }}
          renderRow={(results) => (
            <>
              <Circle bg='#efefef' p='1' mr={1}>
                <Ionicons name='md-location-sharp' size={18} color='rebeccapurple' />
              </Circle>
              <Text>{results.description}</Text>
            </>
          )}
          // minLength={3}
          enablePoweredByContainer={false}
          listEmptyComponent={<Text>No Location found Check your connection</Text>}
          listLoaderComponent={<Text>Getting Locations...</Text>}
        /> */}
        <View
          // my={Platform.OS === 'android' ? 18 : 12}
          zIndex={1}
          px={Platform.OS === 'android' ? 3 : 1}
          position={'absolute'}
          top={Platform.OS === 'ios' ? 30 : 50}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentInset={{ top: 0, bottom: 0, left: 5, right: 5 }}
            contentContainerStyle={{ height: 30, gap: 10 }}
            horizontal={true}
          >
            {searches.map((search, i) => {
              return (
                <Badge borderRadius={10} bg={activeLandmark.toLowerCase() === search.toLowerCase() ? 'primary' : '#fff'} key={i}>
                  <Text
                    onPress={() => setActiveLandmark(search)}
                    fontSize={scale(11)}
                    fontWeight={600}
                    color={activeLandmark.toLowerCase() === search.toLowerCase() ? 'white' : '#333'}
                  >
                    {search}
                  </Text>
                </Badge>
              );
            })}
          </ScrollView>
        </View>
        <View flex={1}>
          <AllIncidentsAroundMe />
        </View>

        <Pressable onPress={() => navigation.navigate(PROTECTED_ROUTES.MAP_DIRECTION)} position={'absolute'} bottom={24} right={7}>
          <Circle bg='primary' p='3'>
            <Icon as={FontAwesome5} size={'22px'} name='directions' color='white' />
          </Circle>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(PROTECTED_ROUTES.INCIDENT_MAP)} position={'absolute'} bottom={4} right={5}>
          <Image borderRadius={'full'} alt='direction' size='55px' source={require('../../../assets/images/map/direction.jpg')} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
