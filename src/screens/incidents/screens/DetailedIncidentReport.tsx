import { Center, Circle, FormControl, HStack, Heading, Icon, Input, Modal, ScrollView, Spinner, Stack, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Platform, Pressable, SafeAreaView, TouchableOpacity } from 'react-native';
import { COLORS, globalStyles, labelStyles } from '../../../globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useGetCurrentLocation } from '../../../hooks/useGetCurrentLocation';
import axios from 'axios';
import { errorToast, successToast } from '../../../components/NotificationHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../../../navigation/RootNavigation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_PLACES_API_KEY } from '../../../utils/constants';
import { IncidentType } from '../../../utils/types';
import { API_ENDPOITS } from '../../../services/routes.constants';
import axiosInstance from '../../../services/api';

export const label = { mt: 10, fontSize: 16, fontWeight: 'bold' };

// const predefinedPlaces = [
//   {
//     description: 'My current Location',
//     geometry: { location: { lat: coordinates.latitude, lng: coordinates.longitude } },
//   },
//   {
//     description: 'Statue of Liberty, New York, USA',
//     geometry: { location: { lat: 40.689247, lng: -74.044502 } },
//   },
// ];

export const DetailedIncidentReport = () => {
  const { getCurrentLocation, coordinates } = useGetCurrentLocation();
  const [locationOfIncident, setLocationOfIncident] = useState<any>(undefined);
  const [natureOfIncident, setNatureOfIncident] = useState('');
  const [detailsOfIncident, setDetailsOfIncident] = useState('');
  const [title, setTitle] = useState('');
  const [links, setLinks] = useState('');
  const [media, setMedia] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>('');
  const [uploading, setUploading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  let incidentImageUrlFormCloud: string;

  const handleGotoReportIncident = () => {
    RootNavigation.navigate('Map', '');
    // RootNavigation.navigate('incidentsStack', '');
  };

  async function getUserId() {
    AsyncStorage.getItem('userID')
      .then((userId) => setUserId(userId))
      .catch((error) => {});
  }

  useEffect(() => {
    getUserId();
  }, []);

  const pickImageMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      let newfile = {
        uri: result.assets[0].uri,
        type: `test/${result.assets[0].uri.split('.')[1]}`,
        name: `test.${result.assets[0].uri.split('.')[1]}`,
        mediaType: result.assets[0].type,
      };

      setMedia(newfile);
    } else {
      alert('You did not select any file.');
    }
  };

  const handleSubmitIncidence = () => {
    setUploading(true);

    const uploaders = [media].map((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'akogwu');
      formData.append('cloud_name', 'akogwu');

      return axios
        .post(`https://api.cloudinary.com/v1_1/akogwu/${media.mediaType === 'video' ? 'video' : 'image'}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            // 'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          const data = response.data;
          incidentImageUrlFormCloud = data.secure_url;
        })
        .catch((err) => {
          console.log('cloudinary error', err);
        });
    });

    axios.all(uploaders).then(async () => {
      try {
        const payload = {
          title,
          description: detailsOfIncident,
          natureOfIncident,
          location: { type: 'Point', coordinates: [locationOfIncident?.lng || coordinates?.longitude, locationOfIncident?.lat || coordinates?.latitude] },
          links: [links],
          media: [incidentImageUrlFormCloud],
          userId,
        };

        await axiosInstance.post(API_ENDPOITS.CREATE_DETAILED_INCIDENT_REPORT, payload);
        successToast();
        setOpenModal(true);
      } catch (error: any) {
        errorToast(error?.response?.data?.message[0]);
      } finally {
        setUploading(false);
      }
    });
  };
  const canSubmit = Boolean(title);

  return (
    <View flex={1} bg='white'>
      <ImageBackground source={require('../../../../assets/ellipse.png')} imageStyle={{ borderBottomRightRadius: 40 }}>
        <View h={Platform.OS === 'ios' ? 200 : 160} borderBottomRadius='16px'>
          <SafeAreaView>
            <Stack p={5} mt={5}>
              <Heading color='white' mb={2}>
                Detailed Report
              </Heading>
              <Text color='white'>Your report plays a vital role in alerting others about potential risks Report NOW!</Text>
            </Stack>
          </SafeAreaView>
        </View>
      </ImageBackground>
      {/* @ts-ignore */}
      <ScrollView keyboardShouldPersistTaps='handled' listViewDisplayed={false}>
        <FormControl flex={1} px={5}>
          <FormControl.Label {...labelStyles}>
            <Text fontSize={16}>Location of Incident</Text>
          </FormControl.Label>
          <GooglePlacesAutocomplete
            // ref={googlePlacesAutocompleteRef}
            // currentLocation={true}
            // currentLocationLabel='Current Location'
            // predefinedPlaces={predefinedPlaces}
            nearbyPlacesAPI='GooglePlacesSearch'
            placeholder={coordinates ? 'Incident took place in my Current location' : 'Enter Location'}
            fetchDetails={true}
            GooglePlacesDetailsQuery={{ rankby: 'distance' }}
            debounce={300}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true

              setLocationOfIncident(details?.geometry?.location);
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
              container: { width: '100%', zIndex: 2 },
              listView: { top: -5, backgroundColor: 'white', color: '#333' },
              textInputContainer: { height: 38, width: '100%' },
              textInput: { paddingLeft: 2, height: 38, borderWidth: 0, borderBottomWidth: 1, borderColor: '#ddd' },
            }}
            renderRow={(results) => (
              <>
                <Circle bg='#efefef' p='1' mr={1}>
                  <Ionicons name='md-location-sharp' size={18} color='rebeccapurple' />
                </Circle>
                <Text>{results.description}</Text>
              </>
            )}
            // renderRightButton={() => (
            //   <Pressable onPress={getCurrentLocation}>
            //     <Icon as={<Ionicons name='location-outline' />} size={5} />
            //   </Pressable>
            // )}
            // minLength={3}
            enablePoweredByContainer={false}
            listEmptyComponent={<Text>No Location found Check your connection</Text>}
            listLoaderComponent={<Text>Getting Locations...</Text>}
          />
          {/* <Input
            value={locationOfIncident}
            onChangeText={setLocationOfIncident}
            size={'md'}
            variant='underlined'
            placeholder='Use your current location'
            InputRightElement={
              <Pressable onPress={getCurrentLocation}>
                <Icon as={<Ionicons name='location-outline' />} size={5} mr='2' />
              </Pressable>
            }
          /> */}

          <FormControl.Label {...labelStyles}>
            <Text fontSize={16}>Title of Incident</Text>
          </FormControl.Label>
          <Input size={'md'} variant='underlined' placeholder='Enter the title of the incident' value={title} onChangeText={setTitle} />

          <FormControl.Label {...labelStyles} {...label}>
            <Text fontSize={16}>Nature of Incident</Text>
          </FormControl.Label>
          <SelectDropdown
            data={Object.values(IncidentType)}
            defaultButtonText='Nature of Incident'
            buttonStyle={{ height: 40, width: '100%', padding: 0, borderBottomWidth: 1, borderColor: '#eee', backgroundColor: 'transparent', borderRadius: 4 }}
            buttonTextStyle={{ marginLeft: 0, color: '#333', margin: 0, textAlign: 'left', fontSize: 15 }}
            renderDropdownIcon={() => <MaterialIcons name='keyboard-arrow-down' size={24} color='black' />}
            onSelect={(selectedItem) => setNatureOfIncident(selectedItem)}
            defaultValue={natureOfIncident}
            buttonTextAfterSelection={(selectedItem, index) => selectedItem}
            rowTextForSelection={(item, index) => item}
          />

          <FormControl.Label {...labelStyles} {...label}>
            <Text fontSize={16}>Details of the Incident</Text>
          </FormControl.Label>
          <Input onChangeText={setDetailsOfIncident} size={'md'} variant='underlined' placeholder='Add your comments here' />

          <FormControl.Label {...labelStyles} {...label}>
            <Text fontSize={16}>Add Media</Text>
          </FormControl.Label>
          <TouchableOpacity onPress={pickImageMedia}>
            <HStack space='2' alignItems='center'>
              <Center bg='gray.100' p={5} w={70} borderRadius={10}>
                {media ? <Entypo name='check' size={24} color='black' /> : <Icon as={AntDesign} name='upload' size={7} color='gray.600' />}
              </Center>
              {/* {uploading ? <Spinner color='primary' /> : null} */}
            </HStack>
          </TouchableOpacity>

          <FormControl.Label {...labelStyles} mt={8}>
            <Text fontSize={16}>Add link(s)</Text>
          </FormControl.Label>
          <Input onChangeText={setLinks} size={'md'} variant='underlined' placeholder='Add your link here' />

          <View pt={10}>
            <Pressable
              disabled={canSubmit}
              onPress={handleSubmitIncidence}
              style={[globalStyles.button, { backgroundColor: COLORS.primary, marginTop: 10, marginBottom: 15 }]}
            >
              <Text color='white'>{uploading ? <Spinner color='white' /> : 'Submit'}</Text>
            </Pressable>
          </View>
        </FormControl>

        <Modal
          isOpen={openModal}
          onClose={() => {
            setOpenModal(false);
            handleGotoReportIncident();
          }}
        >
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Body borderRadius={10}>
              <Stack space={3} alignItems={'center'} p={5}>
                <Icon name='slideshare' as={Entypo} size={24} color='primary' />
                <Heading size='md' textAlign={'center'}>
                  Incident Shared
                </Heading>
                <Text textAlign={'center'}>Others can now know what's happening</Text>
              </Stack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </ScrollView>
    </View>
  );
};

// const androidSelectVideoOrImagePrompt = () => {
//   Alert.alert('Select Media', 'Would you like to take a picture or record a video?', [
//     {
//       text: 'Cancel',
//       style: 'cancel',
//     },
//     {
//       text: 'Image',
//       onPress: () => {
//         pickerOptions.mediaTypes = ImagePicker.MediaTypeOptions.Images;
//         openCameraAsync();
//       },
//     },
//     {
//       text: 'Video',
//       onPress: () => {
//         pickerOptions.mediaTypes = ImagePicker.MediaTypeOptions.Videos;
//         openCameraAsync();
//       },
//     },
//   ]);
// };
