import { Center, KeyboardAvoidingView, Slider, Square, Stack, Text } from 'native-base';
import { HStack } from 'native-base';
import { View } from 'native-base';
import React, { ReactNode } from 'react';
import { ImageBackground, Platform, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../globalStyles';
import { Animated, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useWindowDimensions } from 'react-native';

type TQuestionWrapper = {
  children: ReactNode;
  screenTo?: string;
  isLast?: boolean;
  questionNumber: number;
  data?: any;
  handleSubmit?: () => void;
  space?: number;
};

export const QuestionWrapper = ({ handleSubmit, space, questionNumber = 1, children, isLast }: TQuestionWrapper) => {
  const navigation = useNavigation<any>();
  const { height } = useWindowDimensions();

  return (
    <KeyboardAvoidingView flex='1' behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={{ flex: 1 }}>
        <ImageBackground style={{ flex: 1, minHeight: height - 80 }} source={require('../../../assets/ellipse.png')}>
          <Center mt={24} mb={10}>
            <Slider defaultValue={20} value={(questionNumber / 5) * 100 - 5} size='lg' colorScheme='green'>
              <Slider.Track bg='white'>
                <Slider.FilledTrack bg='#733AD7' />
              </Slider.Track>
              <Slider.Thumb borderWidth='0' bg='transparent'>
                <Square px={2} bg='#733AD7' h={5}>
                  <Text w={10} color='#fff'>{`${questionNumber} of 5`}</Text>
                </Square>
              </Slider.Thumb>
            </Slider>
          </Center>
          <Stack space={space || 16} flex={1} p={5}>
            {children}
          </Stack>

          <HStack mb={5} p={5} justifyContent={'space-evenly'}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={[globalStyles.button, { backgroundColor: 'white', width: 120 }]}>
              <Text color='primary' fontSize={16} fontWeight={700}>
                Back
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSubmit} style={[globalStyles.button, { backgroundColor: 'white', width: 120 }]}>
              <Text color='primary' fontSize={16} fontWeight={700}>
                {isLast ? 'Submit' : 'Next'}
              </Text>
            </TouchableOpacity>
          </HStack>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
