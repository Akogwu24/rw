import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Heading, Image, ScrollView, Stack, Text, VStack, View } from 'native-base';
import { ImageBackground, Platform, SafeAreaView, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import { PROTECTED_ROUTES } from '../../../app/routes';
import { CameraType, Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { CustomStatusBar } from '../../../components/CustomStatusBar';

export const ReportIncident = () => {
  const navigate = useNavigation<any>();

  return (
    <View flex={1}>
      <CustomStatusBar color='light-content' />
      <ImageBackground source={require('../../../../assets/ellipse.png')} imageStyle={{ borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}>
        <View h={Platform.OS === 'ios' ? 180 : 130} borderBottomRadius='16px'>
          <SafeAreaView>
            <Stack p={5}>
              <Heading color='white' mb={2}>
                Report an Incident
              </Heading>
              <Text color='white'>Capture the moment and share an incident report. Together, let's ensure a secure community for all.</Text>
            </Stack>
          </SafeAreaView>
        </View>
      </ImageBackground>
      <ScrollView flex={1} my={3} p={5}>
        <TouchableOpacity onPress={() => navigate.navigate(PROTECTED_ROUTES.CAPTURE_LIVE_INCIDENT)}>
          <Stack p={10} py={8} space={3} alignItems={'center'} bg='gray.50'>
            <Image source={require('../../../../assets/images/incidents/camera.png')} alt='camera' />
            <Text fontSize={scale(18)} fontWeight={500}>
              Capture Live Incidents
            </Text>
            <TouchableOpacity onPress={() => navigate.navigate(PROTECTED_ROUTES.CAPTURE_LIVE_INCIDENT)}>
              <Text bg='white' borderWidth={1} px={10} py={2} borderColor={'primary'} borderRadius={20}>
                Capture
              </Text>
            </TouchableOpacity>
          </Stack>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => navigate.navigate(PROTECTED_ROUTES.DETAILED_INCICENT_REPORT)}>
          <Stack p={10} space={3} alignItems={'center'} bg='gray.50'>
            <Image source={require('../../../../assets/images/incidents/form.png')} alt='form' />
            <Text fontSize={scale(18)} fontWeight={500}>
              Full Incident Report
            </Text>
            <TouchableOpacity onPress={() => navigate.navigate(PROTECTED_ROUTES.DETAILED_INCICENT_REPORT)}>
              <Text bg='white' borderWidth={1} px={10} py={2} borderColor={'primary'} borderRadius={20}>
                Report
              </Text>
            </TouchableOpacity>
          </Stack>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
