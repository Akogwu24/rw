import React from 'react';
import { Circle, Flex, Heading, Icon, Image, Stack, Text, View } from 'native-base';
import Onboarding from 'react-native-onboarding-swiper';
import { COLORS } from '../../../globalStyles';
import { CustomStatusBar } from '../../../components/CustomStatusBar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../context/AuthContext';
import { scale, verticalScale } from 'react-native-size-matters';
import { PUBLIC_ROUTES } from '../../../app/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

type TOnboardingScreenSheetProps = {
  title: string;
  subtitle: string;
};
const OnboardingScreenSheet = ({ title, subtitle }: TOnboardingScreenSheetProps) => {
  return (
    <Stack
      bg='white'
      position={'absolute'}
      bottom={0}
      p={scale(10)}
      pt={verticalScale(45)}
      zIndex={1}
      w='full'
      h={'42%'}
      borderTopRightRadius={50}
      borderTopLeftRadius={20}
    >
      <Heading textAlign={'center'}>{title || 'Stay safe with realtime actionable data'}</Heading>
      <Text mt={4} textAlign={'center'} fontSize={scale(15)}>
        {subtitle || 'See areas of potential threats and event'}
      </Text>
    </Stack>
  );
};
const NextBTN = () => {
  return (
    <Circle bg={'primary'} w={36} h={36}>
      <MaterialCommunityIcons name='arrow-right-thin' size={28} color='#fff' />
    </Circle>
  );
};

const DotComponent = ({ selected }: { selected: boolean }) => {
  return (
    <Flex pb={120}>
      <View
        style={{
          borderRadius: 5,
          width: selected ? scale(30) : scale(15),
          marginHorizontal: 3,
          height: 5,
          backgroundColor: selected ? COLORS.primary : '#ddd',
        }}
      />
    </Flex>
  );
};
export function OnbordingScreens() {
  const navigation = useNavigation<any>();
  const { onLogin } = useAuth();

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1 }}>
        <CustomStatusBar color='light-content' />
        <Onboarding
          DoneButtonComponent={() => (
            <Icon onPress={() => navigation.navigate(PUBLIC_ROUTES.REGISTER)} as={AntDesign} name='checkcircle' size={9} mr={4} color='primary' />
          )}
          // onDone={() => navigation.navigate(PUBLIC_ROUTES.REGISTER)}
          onSkip={() => navigation.navigate(PUBLIC_ROUTES.REGISTER)}
          nextLabel={<NextBTN />}
          bottomBarColor='white'
          bottomBarHeight={50}
          containerStyles={{ flex: 1, backgroundColor: COLORS.primary, paddingBottom: 0 }}
          DotComponent={({ selected }) => <DotComponent selected={selected} />}
          controlStatusBar={false}
          pages={[
            {
              backgroundColor: 'white',
              image: <Image alt='screen1' w={'full'} mb={'35%'} resizeMode='contain' source={require('../../../../assets/images/onboarding/cuate.png')} />,
              title: <OnboardingScreenSheet title='Report An Incident' subtitle='A timely report from you can save a life.' />,
              subtitle: '',
            },
            {
              backgroundColor: 'white',
              image: <Image alt='screen2' w={'full'} mb={'35%'} resizeMode='contain' source={require('../../../../assets/images/onboarding/cuate2.png')} />,
              title: <OnboardingScreenSheet title='Capture Live Incidents' subtitle='Report An Incident That Has Already Happened.' />,
              subtitle: '',
            },
            {
              backgroundColor: 'white',
              image: <Image alt='screen3' w={'full'} mb={'35%'} resizeMode='contain' source={require('../../../../assets/images/onboarding/amico.png')} />,
              title: <OnboardingScreenSheet title='Detailed Report Screen' subtitle='Tell us what happened. Contribute to a safer community' />,
              subtitle: '',
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}
