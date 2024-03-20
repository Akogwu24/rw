import React, { useEffect, useRef, useState } from 'react';
import { Button, Flex, FormControl, HStack, Heading, Icon, Image, KeyboardAvoidingView, Modal, Stack, Text, View } from 'native-base';
import * as ImageManipulator from 'expo-image-manipulator';
import { Dimensions, Platform, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
// import Marker, { Position, TextBackgroundType } from 'react-native-image-marker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Video } from 'expo-av';
import { Entypo, FontAwesome, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { ShareMewsModal } from '../../news/components/ShareMewsModal';
import CustomActionSheet from '../../../components/CustomActionSheet';
import { COLORS, labelStyles } from '../../../globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Input } from 'native-base';
import SelectDropdown from 'react-native-select-dropdown';
import { label } from './DetailedIncidentReport';
import * as RootNavigation from '../../../navigation/RootNavigation';
import { scale } from 'react-native-size-matters';
import axios from 'axios';
import { useGetCurrentLocation } from '../../../hooks/useGetCurrentLocation';
import { errorToast, successToast } from '../../../components/NotificationHandler';
import http, { API_ENDPOITS } from '../../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IncidentType } from '../../../utils/types';

export const PreviewIncident = () => {
  const { height, width } = Dimensions.get('window');
  const { params } = useRoute<any>();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [title, setTitle] = useState('');
  const [natureOfIncident, setNatureOfIncident] = useState('');
  const [detailsOfIncident, setDetailsOfIncident] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState<string | null>('');
  const navigation = useNavigation();

  const { getCurrentLocation, coordinates } = useGetCurrentLocation();
  let incidentImageUrlFormCloud: string;

  // const options = {
  //   // background image
  //   backgroundImage: {
  //     src: require('./images/test.jpg'),
  //     scale: 1,
  //   },
  //   watermarkTexts: [
  //     {
  //       text: 'text marker \n multline text',
  //       positionOptions: {
  //         position: Position.topLeft,
  //       },
  //       style: {
  //         color: '#ff00ff',
  //         fontSize: 30,
  //         fontName: 'Arial',
  //         shadowStyle: {
  //           dx: 10,
  //           dy: 10,
  //           radius: 10,
  //           color: '#008F6D',
  //         },
  //         textBackgroundStyle: {
  //           padding: '10% 10%',
  //           type: TextBackgroundType.none,
  //           color: '#0FFF00',
  //         },
  //       },
  //     },
  //   ],
  //   scale: 1,
  //   quality: 100,
  //   filename: 'test',
  //   // saveFormat: ImageFormat.png,
  //   maxSize: 1000,
  // };
  // Marker.markText(options);

  async function getUserId() {
    AsyncStorage.getItem('userID')
      .then((userId) => setUserId(userId))
      .catch((error) => {});
  }

  useEffect(() => {
    getUserId();
    getCurrentLocation();
  }, []);

  const playVideo = async () => {
    if (videoRef.current) {
      await videoRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      setIsCompleted(true);
    }
  };

  const replayVideo = () => {
    if (videoRef.current) {
      videoRef.current.replayAsync();
      setIsPlaying(true);
    }
  };

  // console.log('params.imageVideoCapture', params.imageVideoCapture);

  const handleSubmitLiveIncident = () => {
    setUploading(true);

    let newfile = {
      uri: params?.capturedIncident?.uri,
      type: `test/${params?.capturedIncident?.uri.split('.')[1]}`,
      name: `test.${params?.capturedIncident?.uri.split('.')[1]}`,
      // mediaType: params.imageVideoCapture === 'photo' ? 'image' : 'video',
    };

    const uploaders = [newfile].map((file: any) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'akogwu');
      formData.append('cloud_name', 'akogwu');

      return axios
        .post(`https://api.cloudinary.com/v1_1/akogwu/${params.imageVideoCapture === 'photo' ? 'image' : 'video'}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-Requested-With': 'XMLHttpRequest',
          },
        })
        .then((response) => {
          const data = response.data;
          incidentImageUrlFormCloud = data.secure_url;
          setUploading(false);
        })
        .catch((error) => {
          console.error('clouddinary error', error);
        });
    });

    axios.all(uploaders).then(async () => {
      setUploading(true);
      try {
        const payload = {
          title,
          description: detailsOfIncident,
          natureOfIncident,
          location: { type: 'Point', coordinates: [coordinates?.longitude, coordinates?.latitude] },
          media: [incidentImageUrlFormCloud],
          links: ['no link'],
          userId,
        };

        await http.post(API_ENDPOITS.CREATE_DETAILED_INCIDENT_REPORT, payload);
        successToast();
        setOpenModal(true);
      } catch (error: any) {
        errorToast(error?.response?.data?.message[0]);
        setUploading(false);
      } finally {
        setUploading(false);
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View flex={1}>
        <HStack px={5} py={2} justifyContent={'space-between'}>
          <TouchableOpacity
            style={{ backgroundColor: COLORS.primary, height: 30, width: 30, borderRadius: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome name='long-arrow-left' size={20} color='white' />
          </TouchableOpacity>

          <CustomActionSheet triggerButton={<Icon as={Fontisto} name='share' size={'24px'} color='black' />}>
            <ShareMewsModal />
          </CustomActionSheet>
        </HStack>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView style={{ backgroundColor: 'white' }}>
            {params?.imageVideoCapture === 'video' ? (
              <>
                <View position={'relative'}>
                  <Video
                    ref={videoRef}
                    source={{ uri: params?.capturedIncident?.uri }}
                    style={{ width: width, height: height / 2.1 }}
                    useNativeControls
                    onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                  />
                  {isPlaying ? (
                    <TouchableOpacity
                      style={{ position: 'absolute', width: width, height: height / 2, flex: 1, zIndex: 10, justifyContent: 'center', alignItems: 'center' }}
                      onPress={replayVideo}
                    >
                      <MaterialCommunityIcons name='restart' size={30} color='white' />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{ position: 'absolute', width: width, height: height / 2, flex: 1, zIndex: 10, justifyContent: 'center', alignItems: 'center' }}
                      onPress={playVideo}
                    >
                      <Ionicons name='ios-play' size={30} color='white' />
                    </TouchableOpacity>
                  )}
                </View>
              </>
            ) : (
              <Flex justify='center' paddingX={2}>
                <Image alt='capture' style={{ height: height / 2, width: width, borderRadius: 5 }} source={{ uri: params?.capturedIncident?.uri }} />
              </Flex>
            )}
            <KeyboardAvoidingView flex={1} px={5}>
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
                buttonTextStyle={{ color: '#333', margin: 0, textAlign: 'left', marginLeft: 0, fontSize: 13 }}
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
              <View mt={height / 15}>
                <Button h={45} bg='primary' marginBottom={Platform.OS === 'ios' ? 50 : 5} isLoading={uploading} onPress={handleSubmitLiveIncident}>
                  Submit
                </Button>
              </View>
            </KeyboardAvoidingView>
            <Modal
              isOpen={openModal}
              onClose={() => {
                setOpenModal(false);
                RootNavigation.navigate('News', '');
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
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};
