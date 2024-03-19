import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FormControl, Heading, Input, Pressable, Text, View } from 'native-base';
import { SafeAreaView, StatusBar } from 'react-native';
import { COLORS, globalStyles, inputStyles, labelStyles } from '../../../globalStyles';
import { PUBLIC_ROUTES } from '../../../app/routes';

export const ForgotPassword = () => {
  const navigation = useNavigation<any>();
  return (
    <View bg='white' flex={1}>
      <StatusBar animated={true} backgroundColor='#61dafb' barStyle={'dark-content'} showHideTransition={'slide'} />
      <SafeAreaView>
        <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
          <Pressable
            onPress={() => navigation.navigate(PUBLIC_ROUTES.WELCOME)}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            borderRadius={'full'}
            bg='gray.200'
            pl='1'
            w='30'
            h={30}
          >
            <MaterialIcons name='arrow-back-ios' color='black' />
          </Pressable>
          <Heading mt={10}>Forget password</Heading>
          <Text my={2}>Please provide your watch app registered email</Text>
          <FormControl>
            <FormControl.Label {...labelStyles}>Email address</FormControl.Label>
            <Input {...inputStyles} placeholder='John@mail.com' />

            <Pressable
              onPress={() => navigation.navigate(PUBLIC_ROUTES.SUCCESSFULL_PASSWORD_RESET)}
              style={[globalStyles.button, { backgroundColor: COLORS.primary, marginVertical: 20, marginTop: 40 }]}
            >
              <Text color='white'>Reset</Text>
            </Pressable>
          </FormControl>
        </View>
      </SafeAreaView>
    </View>
  );
};
