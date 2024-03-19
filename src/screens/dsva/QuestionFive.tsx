import React from 'react';

import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { QuestionWrapper } from './QuestionWrapper';
import { PROTECTED_ROUTES } from '../../app/routes';
import { Heading, View } from 'native-base';
import SelectDropdown from 'react-native-select-dropdown';
import { MaterialIcons } from '@expo/vector-icons';
import { useUseNavigate } from '../../hooks/useUseNavigate';
import { disabilities, reportViolenceIncident } from './extras';
import { TDisability } from '../../utils/types';
import { errorToast, successToast, wariningToast } from '../../components/NotificationHandler';
import { useMutation } from '@tanstack/react-query';
import axiosInstance, { API_ENDPOITS } from '../../services/api';
import { FullPageLoader } from '../../components/FullPageLoader';

export const QuestionsFive = () => {
  const { params } = useRoute<any>();

  const [hasRecievedMedicalAttention, setHasRecievedMedicalAttention] = useState(false);
  const [hasDisability, setHasDisability] = useState(false);
  const [disability, setDisability] = useState<TDisability>();
  const [employmentStatus, setEmploymentStatus] = useState('');

  const handleNext = () => {
    if (!hasRecievedMedicalAttention) return wariningToast('Medical attention status is required');
    if (!disability) return wariningToast('Select a disability status');

    mutate();
  };
  const { mutate, isLoading } = useMutation({
    mutationFn: () => {
      const payload = { ...params, hasReceivedMedicalAttention: hasRecievedMedicalAttention, employmentStatus, disability: disability?.id, hasDisability };

      return reportViolenceIncident(payload);
    },
    onSuccess: (data) => successToast(),
    onError: (error: any) => errorToast(error?.response?.data?.message[0]),
  });

  return isLoading ? (
    <FullPageLoader />
  ) : (
    <QuestionWrapper space={10} isLast={true} questionNumber={5} screenTo={PROTECTED_ROUTES.QUESTION_SIX} handleSubmit={handleNext}>
      <View>
        <Heading fontSize={20} color={'white'}>
          Have You recieved medical attention?
        </Heading>
        <SelectDropdown
          data={['Yes', 'No']}
          defaultButtonText='Medical attention'
          buttonStyle={{ height: 50, width: '100%', borderBottomWidth: 1, borderColor: '#eee', backgroundColor: 'transparent', marginTop: 5 }}
          buttonTextStyle={{ marginLeft: 0, color: '#fff', margin: 0, textAlign: 'left', fontSize: 16 }}
          renderDropdownIcon={() => <MaterialIcons name='keyboard-arrow-down' size={24} color='#fff' />}
          onSelect={(selectedItem) => setHasRecievedMedicalAttention(selectedItem === 'Yes' ? true : false)}
          //   defaultValue={''}
          buttonTextAfterSelection={(selectedItem, index) => selectedItem}
          rowTextForSelection={(item, index) => item}
        />
      </View>
      <View>
        <Heading fontSize={20} color={'white'}>
          Do you have any disability?
        </Heading>
        <SelectDropdown
          data={['Yes', 'No']}
          defaultButtonText='Do you have any disability?'
          buttonStyle={{ height: 50, width: '100%', borderBottomWidth: 1, borderColor: '#eee', backgroundColor: 'transparent', marginTop: 5 }}
          buttonTextStyle={{ marginLeft: 0, color: '#fff', margin: 0, textAlign: 'left', fontSize: 16 }}
          renderDropdownIcon={() => <MaterialIcons name='keyboard-arrow-down' size={24} color='#fff' />}
          onSelect={(selectedItem) => setHasDisability(selectedItem === 'Yes' ? true : false)}
          buttonTextAfterSelection={(selectedItem, index) => selectedItem}
          rowTextForSelection={(item, index) => item}
        />
      </View>
      {hasDisability && (
        <View>
          <Heading fontSize={20} color={'white'}>
            Disability
          </Heading>
          <SelectDropdown
            data={disabilities.map((d) => d.name)}
            defaultButtonText='select disabiliy kind'
            buttonStyle={{ height: 50, width: '100%', borderBottomWidth: 1, borderColor: '#eee', backgroundColor: 'transparent', marginTop: 5 }}
            buttonTextStyle={{ marginLeft: 0, color: '#fff', margin: 0, textAlign: 'left', fontSize: 16 }}
            renderDropdownIcon={() => <MaterialIcons name='keyboard-arrow-down' size={24} color='#fff' />}
            onSelect={(selectedItem) => setDisability(disabilities.find((d) => d.name === selectedItem))}
            buttonTextAfterSelection={(selectedItem, index) => selectedItem}
            rowTextForSelection={(item, index) => item}
          />
        </View>
      )}
      <View>
        <Heading fontSize={20} color={'white'}>
          Employment Status
        </Heading>
        <SelectDropdown
          data={['EMPLOYED', 'UNEMPLOYED', 'SELF_EMPLOYED', 'STUDENT', 'RETIRED']}
          defaultButtonText='Employment Status'
          buttonStyle={{ height: 50, width: '100%', borderBottomWidth: 1, borderColor: '#eee', backgroundColor: 'transparent', marginTop: 5 }}
          buttonTextStyle={{ marginLeft: 0, color: '#fff', margin: 0, textAlign: 'left', fontSize: 16 }}
          renderDropdownIcon={() => <MaterialIcons name='keyboard-arrow-down' size={24} color='#fff' />}
          onSelect={(selectedItem) => setEmploymentStatus(selectedItem)}
          buttonTextAfterSelection={(selectedItem, index) => selectedItem}
          rowTextForSelection={(item, index) => item}
        />
      </View>
    </QuestionWrapper>
  );
};
