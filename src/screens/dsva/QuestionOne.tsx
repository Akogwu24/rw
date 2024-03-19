import { Heading, Input, View } from 'native-base';
import React, { useState } from 'react';
import { QuestionWrapper } from './QuestionWrapper';
import { PROTECTED_ROUTES } from '../../app/routes';
import { useRoute } from '@react-navigation/native';

import { useUseNavigate } from '../../hooks/useUseNavigate';
import { wariningToast } from '../../components/NotificationHandler';

export const QuestionOne = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [altPhoneNumber, setAltPhoneNumber] = useState('');
  const { navigate } = useUseNavigate();
  const { params } = useRoute<any>();

  const handleNext = () => {
    if (!fullName) return wariningToast('Enter full name');
    if (!phoneNumber) return wariningToast('Enter Your Phone Number');
    navigate(PROTECTED_ROUTES.QUESTION_TWO, { ...params, name: fullName, phoneNumber, altPhoneNumber });
  };

  return (
    <QuestionWrapper questionNumber={1} screenTo={PROTECTED_ROUTES.QUESTION_TWO} handleSubmit={handleNext}>
      <View>
        <Heading fontSize={21} color={'white'}>
          What is your full name?
        </Heading>
        <Input value={fullName} onChangeText={setFullName} h={50} color='white' fontSize={16} placeholder='Enter answer here' variant={'underlined'} />
      </View>

      <View>
        <Heading fontSize={21} color={'white'}>
          Please enter your phone number
        </Heading>
        <Input
          keyboardType='numeric'
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          h={50}
          color='white'
          fontSize={16}
          placeholder='080*****'
          variant={'underlined'}
          maxLength={11}
        />
      </View>

      <View>
        <Heading fontSize={21} color={'white'}>
          Please enter an alternative phone number
        </Heading>
        <Input
          keyboardType='numeric'
          maxLength={11}
          value={altPhoneNumber}
          onChangeText={setAltPhoneNumber}
          h={50}
          color='white'
          fontSize={16}
          placeholder='080*****'
          variant={'underlined'}
        />
      </View>
    </QuestionWrapper>
  );
};
