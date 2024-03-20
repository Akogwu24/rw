import React, { useEffect, useState } from 'react';
import { HStack, Text, View } from 'native-base';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { styles } from './Styles';
import { CustomStatusBar } from '../../../components/CustomStatusBar';
import { TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { PROTECTED_ROUTES } from '../../../app/routes';
import { AntDesign } from '@expo/vector-icons';

export const CaptureLiveIncident = () => {
  const [hasCameraPermissions, setHasCameraPermissions] = useState(false);
  const [hasAudioPermissions, setHasAudioPermissions] = useState(false);
  const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraFlash, setCameraFlash] = useState(Camera.Constants.FlashMode.off);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [capturedIncident, setCapturedIncident] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const [imageVideoCapture, setImageVideoCapture] = useState('video');
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermissions(cameraStatus.status === 'granted');

      const audioStatus = await Audio.requestPermissionsAsync();
      setHasAudioPermissions(audioStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermissions(galleryStatus.status === 'granted');

      if (galleryStatus.status === 'granted') {
        const userGalleryMedia = await MediaLibrary.getAssetsAsync({ sortBy: ['creationTime'], mediaType: 'video' });
        setGalleryItems(userGalleryMedia.assets);
      }
    })();
  }, []);

  // useEffect(() => {
  //   setCapturedIncident(null);
  // }, []);

  useEffect(() => {
    capturedIncident && navigation.navigate(PROTECTED_ROUTES.PREVIEW_INCIDENT, { capturedIncident, imageVideoCapture });
  }, [capturedIncident]);

  const recordVideo = async () => {
    if (cameraRef) {
      try {
        setIsRecording(true);
        const options = { maxDuration: 180, quality: Camera.Constants.VideoQuality['480'] };
        const videoRecordPromise = await cameraRef.recordAsync(options);

        if (videoRecordPromise) {
          const data = videoRecordPromise;
          const source = data.uri;
          setCapturedIncident(data);
          media = data.uri;
          // console.log('source', source);
          stopVideoRecording();
          setIsRecording(false);
        }
      } catch (error) {
        console.warn('recording error', error);
      }
    }
  };

  const stopVideoRecording = async () => {
    if (cameraRef) {
      await cameraRef.stopRecording();
      console.log('stopRecording');
    }
  };

  const snapPicture = async () => {
    if (cameraRef) {
      try {
        const options = { quality: 0.7 };
        const photo = await cameraRef.takePictureAsync(options);

        setCapturedIncident(photo);
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      setIsCompleted(true);
    }
  };

  const handleCapture = () => {
    if (imageVideoCapture === 'video') {
      !isRecording ? recordVideo() : stopVideoRecording();
    } else {
      snapPicture();
    }
  };

  if (!hasCameraPermissions || !hasAudioPermissions || !hasGalleryPermissions) {
    return <View></View>;
  }

  return (
    <View style={styles.container}>
      <CustomStatusBar color='dark-content' />
      {isFocused ? (
        <Camera
          style={styles.camera}
          ref={(ref) => setCameraRef(ref)}
          ratio='16:9'
          flashMode={cameraFlash}
          type={cameraType}
          onCameraReady={() => setIsCameraReady(true)}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        />
      ) : null}

      <HStack position={'absolute'} w='full' p={5} justifyContent={'space-between'}>
        <View style={styles.flashContainer}>
          <TouchableOpacity
            onPress={() => setCameraFlash(cameraFlash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off)}
            style={styles.flash}
          >
            <Ionicons name={cameraFlash === Camera.Constants.FlashMode.off ? 'flash-outline' : 'flash-off-outline'} size={24} color='white' />
          </TouchableOpacity>
        </View>
      </HStack>
      <HStack
        position='absolute'
        // bottom={Dimensions.get('window').height  /7}
        bottom={120}
        justifyContent={'center'}
        width={Dimensions.get('window').width}
        space={10}
      >
        <Text onPress={() => setImageVideoCapture('video')} fontWeight={500} color={imageVideoCapture === 'video' ? 'yellow.400' : 'white'}>
          Video
        </Text>
        <Text onPress={() => setImageVideoCapture('photo')} color={imageVideoCapture === 'photo' ? 'yellow.400' : 'white'} fontWeight={500}>
          Photo
        </Text>
      </HStack>

      <View style={styles.bottomBarContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeCamera}>
          {/* <MaterialIcons name='arrow-back-ios' size={20} color='white' /> */}
          <AntDesign name='close' size={24} color='white' />
        </TouchableOpacity>
        <View style={styles.recordButtonContainer}>
          <TouchableOpacity
            // onPressOut={stopVideoRecording}
            onPress={handleCapture}
            // onLongPress={recordVideo}
            disabled={!isCameraReady}
            style={styles.recordButton}
          />
        </View>

        <View style={styles.sideBarContainer}>
          <TouchableOpacity
            onPress={() => setCameraType(cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)}
            style={styles.sideBarButton}
          >
            <MaterialIcons name='flip-camera-android' size={24} color='white' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
