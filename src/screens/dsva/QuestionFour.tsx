import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { useUseNavigate } from '../../hooks/useUseNavigate';
import dayjs from 'dayjs';
import { wariningToast } from '../../components/NotificationHandler';
import { PROTECTED_ROUTES } from '../../app/routes';
import { QuestionWrapper } from './QuestionWrapper';
import { Heading, Icon, Modal, Pressable, Text, View } from 'native-base';
import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './extras';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

export const QuestionsFour = () => {
  const { params } = useRoute<any>();
  const { navigate } = useUseNavigate();
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [maritalStatus, setMaritalStatus] = useState();
  const [marraigeType, setMarraigeType] = useState('');
  const [formattedDate, setFormattedDate] = useState('');

  const onChange = (event: any, selectedDate: any) => {
    console.log({ selectedDate });

    setDate(selectedDate);
    setFormattedDate(dayjs(selectedDate).format('YYYY-MM-DD'));
  };

  console.log('params4', params);

  const handleNext = () => {
    if (!maritalStatus) return wariningToast('Please select your gender');
    navigate(PROTECTED_ROUTES.QUESTION_FIVE, { ...params, maritalStatus, marriageType: marraigeType, marriageDate: formattedDate });
  };

  return (
    <QuestionWrapper questionNumber={4} screenTo={PROTECTED_ROUTES.QUESTION_FIVE} handleSubmit={handleNext}>
      <View>
        <Heading fontSize={22} color={'white'}>
          Marital Status
        </Heading>
        <SelectDropdown
          data={['Single', 'Married', 'Seperated', 'Cohabiting', 'Divorced', 'Widowed']}
          defaultButtonText='Marital  Status'
          buttonStyle={{ height: 50, width: '100%', borderBottomWidth: 1, borderColor: '#eee', backgroundColor: 'transparent', marginTop: 5 }}
          buttonTextStyle={{ marginLeft: 0, color: '#fff', margin: 0, textAlign: 'left', fontSize: 16 }}
          renderDropdownIcon={() => <MaterialIcons name='keyboard-arrow-down' size={24} color='#fff' />}
          onSelect={(selectedItem) => setMaritalStatus(selectedItem)}
          buttonTextAfterSelection={(selectedItem, index) => selectedItem}
          rowTextForSelection={(item, index) => item}
        />
      </View>

      {maritalStatus === 'Married' && (
        <>
          <View>
            <Heading fontSize={22} color={'white'}>
              Marriage types
            </Heading>
            <SelectDropdown
              data={['Traditional', 'Court', 'Church', 'Introduction', 'Islam']}
              defaultButtonText='Your type of marriage'
              buttonStyle={{ height: 50, width: '100%', borderBottomWidth: 1, borderColor: '#eee', backgroundColor: 'transparent', marginTop: 5 }}
              buttonTextStyle={{ marginLeft: 0, color: '#fff', margin: 0, textAlign: 'left', fontSize: 16 }}
              renderDropdownIcon={() => <MaterialIcons name='keyboard-arrow-down' size={24} color='#fff' />}
              onSelect={(selectedItem) => setMarraigeType(selectedItem)}
              buttonTextAfterSelection={(selectedItem, index) => selectedItem}
              rowTextForSelection={(item, index) => item}
            />
          </View>

          <View>
            <Heading fontSize={21} color={'white'}>
              Select your marriage date
            </Heading>

            <TouchableOpacity onPress={() => setShow(!show)} style={styles.inputContainer}>
              <Text style={styles.inputText}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>

            <Modal size={'xl'} isOpen={show} closeOnOverlayClick={true} onClose={() => setShow(!setShow)}>
              <Modal.Content>
                <Modal.Body>
                  <Pressable onPress={() => setShow(!setShow)}>
                    <Icon ml={'auto'} as={AntDesign} name='closecircleo' />
                  </Pressable>
                  <DateTimePicker
                    // style={{ backgroundColor: 'white', opacity: 1 }}
                    value={date}
                    mode='date'
                    maximumDate={new Date()}
                    display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                    onChange={onChange}
                  />
                </Modal.Body>
              </Modal.Content>
            </Modal>
          </View>
        </>
      )}
    </QuestionWrapper>
  );
};
