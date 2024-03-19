import React from 'react';
import { View, ImageBackground, StyleSheet, Image, Pressable } from 'react-native';
import { Heading, Text } from 'native-base';
import { globalStyles } from '../../../globalStyles';
import { useNavigation } from '@react-navigation/native';
import { PUBLIC_ROUTES } from '../../../app/routes';
import { Video } from 'expo-av';

export function WelcomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <ImageBackground alt='...' style={styles.dontCrossBg} source={require('../../../../assets/gradient-bg.png')}>
      <View style={styles.videContainer}>
        <Video
          source={require('../../../../assets/traffic-vid.mp4')}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode='cover'
          shouldPlay
          isLooping
          style={styles.video}
        />
      </View>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../../../assets/logo-no_bg.png')} alt='Routewatche' />
        <Heading color='white'>RouteWatche</Heading>
        <Text py='5' fontSize={15} fontWeight={500} color={'white'}>
          Please log in or sign up to report this incident
        </Text>

        <Pressable onPress={() => navigation.navigate(PUBLIC_ROUTES.ONBOARDING)} style={[globalStyles.button, { backgroundColor: 'white', marginBottom: 5 }]}>
          <Text color='primary' fontWeight={500}>
            Sign Up
          </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(PUBLIC_ROUTES.LOGIN)} style={[globalStyles.button, { borderWidth: 1, borderColor: 'white', marginBottom: 5 }]}>
          <Text style={globalStyles.textStyles}>Login</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  dontCrossBg: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    height: 450,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 20,
  },
  videContainer: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
  logo: {
    height: 90,
    width: 90,
  },
  linearGradient: {
    flex: 1,
    position: 'absolute',
    zIndex: 0,
  },
});
