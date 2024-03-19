import React from 'react';

import { useRoute } from '@react-navigation/native';
import { useUseNavigate } from '../../hooks/useUseNavigate';
import { useState } from 'react';
import { wariningToast } from '../../components/NotificationHandler';
import { PROTECTED_ROUTES } from '../../app/routes';
import { QuestionWrapper } from './QuestionWrapper';
import { Heading, Input, TextArea, View } from 'native-base';
import SelectDropdown from 'react-native-select-dropdown';
import { MaterialIcons } from '@expo/vector-icons';

export const QuestionsThree = () => {
  const { params } = useRoute<any>();
  const { navigate } = useUseNavigate();
  const [report, setReport] = useState('');
  const [hasReportedToPolice, setHasReportedToPolice] = useState(false);
  const [policeReportAddress, setPoliceReportAddress] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('english');

  console.log('params3', params);

  const handleNext = () => {
    if (!preferredLanguage) return wariningToast('You have not seleted a language');
    if (!report) return wariningToast('Enter report details');
    if (hasReportedToPolice && !policeReportAddress) return wariningToast('Please Indicate where you reported to');
    navigate(PROTECTED_ROUTES.QUESTION_FOUR, { ...params, hasReportedPolice: hasReportedToPolice, preferredLanguage, report, policeReportAddress });
  };

  return (
    // <ScrollView style={{ flex: 1, backgroundColor: '#f0f' }}>
    <QuestionWrapper questionNumber={3} screenTo={PROTECTED_ROUTES.QUESTION_FOUR} handleSubmit={handleNext}>
      <View>
        <Heading fontSize={22} color={'white'}>
          Give more details of the incident
        </Heading>
        <TextArea
          value={report}
          onChangeText={setReport}
          color='white'
          fontSize={16}
          borderBottomWidth={1}
          variant={'unstyled'}
          mt={5}
          autoCompleteType=''
          h={16}
          placeholder='Enter reprts details'
          w='full'
        />
      </View>
      <View>
        <Heading fontSize={20} color={'white'}>
          Prefered Language
        </Heading>
        <SelectDropdown
          data={['English', 'Igbo', 'Yoruba', 'Hausa', 'Pidgin']}
          defaultButtonText='Choose a language'
          buttonStyle={{ height: 45, width: '100%', borderBottomWidth: 1, borderColor: '#eee', backgroundColor: 'transparent', marginTop: 5 }}
          buttonTextStyle={{ marginLeft: 0, color: '#fff', margin: 0, textAlign: 'left', fontSize: 16 }}
          renderDropdownIcon={() => <MaterialIcons name='keyboard-arrow-down' size={24} color='#fff' />}
          onSelect={(selectedItem) => setPreferredLanguage(selectedItem)}
          //   defaultValue={''}
          buttonTextAfterSelection={(selectedItem, index) => selectedItem}
          rowTextForSelection={(item, index) => item}
        />
      </View>
      <View>
        <Heading fontSize={22} color={'white'}>
          Have you reported to the Police?
        </Heading>
        <SelectDropdown
          data={['Yes, I have reported', 'No']}
          defaultButtonText='Have you repoted incident to police?'
          buttonStyle={{ height: 50, width: '100%', borderBottomWidth: 1, borderColor: '#eee', backgroundColor: 'transparent', marginTop: 5 }}
          buttonTextStyle={{ marginLeft: 0, color: '#fff', margin: 0, textAlign: 'left', fontSize: 16 }}
          renderDropdownIcon={() => <MaterialIcons name='keyboard-arrow-down' size={24} color='#fff' />}
          onSelect={(selectedItem) => setHasReportedToPolice(selectedItem === 'No' ? false : true)}
          //   defaultValue={''}
          buttonTextAfterSelection={(selectedItem, index) => selectedItem}
          rowTextForSelection={(item, index) => item}
        />
      </View>

      {hasReportedToPolice && (
        <View>
          <Heading fontSize={22} color={'white'}>
            Which Police Station did you report to?
          </Heading>
          <Input
            value={policeReportAddress}
            onChangeText={setPoliceReportAddress}
            h={50}
            color='white'
            fontSize={16}
            placeholder='Enter answer here'
            variant={'underlined'}
          />
        </View>
      )}
    </QuestionWrapper>
    // </ScrollView>
  );
};
