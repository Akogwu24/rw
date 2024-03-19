import { HStack, Heading, Image, Stack, Text, View } from 'native-base';
import React, { useState } from 'react';
import { ImageBackground, Platform, SafeAreaView, TouchableOpacity } from 'react-native';
import { COLORS, globalStyles } from '../../globalStyles';
import SelectDropdown from 'react-native-select-dropdown';
import { MaterialIcons } from '@expo/vector-icons';
import { PROTECTED_ROUTES } from '../../app/routes';
import { useUseNavigate } from '../../hooks/useUseNavigate';
import { wariningToast } from '../../components/NotificationHandler';

export const WelcomeDsva = () => {
  const { navigate } = useUseNavigate();
  const [reporterType, setReporterType] = useState('');

  const handleNext = () => {
    if (!reporterType) return wariningToast('Select your reporter type');
    navigate(PROTECTED_ROUTES.QUESTION_ONE, { reporterType });
  };

  return (
    <View flex={1} bg='white'>
      <ImageBackground source={require('../../../assets/ellipse.png')} imageStyle={{ borderBottomRightRadius: 40 }}>
        <View h={Platform.OS === 'ios' ? 350 : 260} borderBottomRadius='50px'>
          <SafeAreaView>
            <Stack p={5} mt={5}>
              <Image h={16} w={32} source={require('../../../assets/images/dsva/dsva-logo.png')} />
              <Heading fontSize='20' color='white' my={5}>
                Welcome back to the Lagos State Domestic and Sexual Violence Agency reporting platform
              </Heading>
              <Text color='white'>Report any form of Domestic and Sexual violence happening to you or around you and get help. </Text>
            </Stack>
          </SafeAreaView>
        </View>
      </ImageBackground>

      <View p={5} flex={1}>
        <Text py={5} fontSize={17}>
          Which of the following best describes you?
        </Text>
        <SelectDropdown
          data={['Mandated reporter', 'Survivor', 'Alleged Perpetrator']}
          defaultButtonText='Please Seclect'
          buttonStyle={{ height: 40, width: '100%', padding: 0, borderBottomWidth: 1, borderColor: '#eee', backgroundColor: 'transparent', borderRadius: 4 }}
          buttonTextStyle={{ marginLeft: 0, color: '#333', margin: 0, textAlign: 'left', fontSize: 15 }}
          renderDropdownIcon={() => <MaterialIcons name='keyboard-arrow-down' size={24} color='black' />}
          onSelect={(selectedItem) => setReporterType(selectedItem)}
          defaultValue={''}
          buttonTextAfterSelection={(selectedItem, index) => selectedItem}
          rowTextForSelection={(item, index) => item}
        />
      </View>

      <HStack p={5} justifyContent={'flex-end'}>
        <TouchableOpacity onPress={handleNext} style={[globalStyles.button, { backgroundColor: COLORS.primary, width: 120 }]}>
          <Text color='white' fontSize={16} fontWeight={700}>
            Next
          </Text>
        </TouchableOpacity>
      </HStack>
    </View>
  );
};
