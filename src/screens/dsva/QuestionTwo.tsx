import React from 'react';
import { useRoute } from '@react-navigation/native';
import { useUseNavigate } from '../../hooks/useUseNavigate';
import { useState } from 'react';
import { wariningToast } from '../../components/NotificationHandler';
import dayjs from 'dayjs';
import { PROTECTED_ROUTES } from '../../app/routes';
import { QuestionWrapper } from './QuestionWrapper';
import { Heading, Icon, Modal, Pressable, Text, TextArea, View } from 'native-base';
import { Platform, TouchableOpacity } from 'react-native';
import { styles } from './extras';
import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export const QuestionsTwo = () => {
  const { params } = useRoute<any>();
  const { navigate } = useUseNavigate();
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [sex, setSex] = useState('');
  const [curentAddress, setCurentAddress] = useState('');
  const [formattedDate, setFormattedDate] = useState('');

  const onChange = (event: any, selectedDate: any) => {
    console.log({ selectedDate });

    setDate(selectedDate);
    setFormattedDate(dayjs(selectedDate).format('YYYY-MM-DD'));
  };

  console.log('${date}`', `${formattedDate}`);
  const handleNext = () => {
    if (!formattedDate) return wariningToast('Please enter your date of birth');
    if (!sex) return wariningToast('Please Select your gender');
    if (!curentAddress) return wariningToast('Please Select your current address');

    navigate(PROTECTED_ROUTES.QUESTION_THREE, { ...params, dateOfBirth: formattedDate, sex, address: curentAddress });
  };

  return (
    <>
      <QuestionWrapper questionNumber={2} screenTo={PROTECTED_ROUTES.QUESTION_THREE} handleSubmit={handleNext}>
        <View h='20' w='full'>
          <Heading fontSize={21} color={'white'}>
            Select your date of birth
          </Heading>

          <TouchableOpacity onPress={() => setShow(!show)} style={styles.inputContainer}>
            <Text style={styles.inputText}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>

          <Modal size={'lg'} isOpen={show} closeOnOverlayClick={true} onClose={() => setShow(!setShow)}>
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

        <View>
          <Heading fontSize={22} color={'white'}>
            What is your gender?
          </Heading>
          <SelectDropdown
            data={['Male', 'Female']}
            defaultButtonText='Select your gender'
            buttonStyle={{ height: 50, width: '100%', borderBottomWidth: 1, borderColor: '#eee', backgroundColor: 'transparent', marginTop: 5 }}
            buttonTextStyle={{ marginLeft: 0, color: '#fff', margin: 0, textAlign: 'left', fontSize: 16 }}
            renderDropdownIcon={() => <MaterialIcons name='keyboard-arrow-down' size={24} color='#fff' />}
            onSelect={(selectedItem) => setSex(selectedItem)}
            //   defaultValue={''}
            buttonTextAfterSelection={(selectedItem, index) => selectedItem}
            rowTextForSelection={(item, index) => item}
          />
        </View>

        <View>
          <Heading fontSize={22} color={'white'}>
            Please enter your current address
          </Heading>
          <TextArea
            onChangeText={setCurentAddress}
            value={curentAddress}
            color='white'
            fontSize={16}
            borderBottomWidth={1}
            variant={'unstyled'}
            mt={5}
            autoCompleteType=''
            h={20}
            placeholder='Enter your address'
            w='full'
          />
        </View>
      </QuestionWrapper>
    </>
  );
};
