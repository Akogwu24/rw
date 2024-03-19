import React from 'react';
import { Link, Text, VStack } from 'native-base';
import { SafeAreaView } from 'react-native';
import { COLORS } from '../../../globalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { PUBLIC_ROUTES } from '../../../app/routes';

export const SuccessfulPasswordReset = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack p='3' alignItems={'center'} justifyContent={'center'} flex={0.7} space={3}>
        {/* <Animatable.View animation={fadeIn} delay={500}> */}
        <Animatable.View animation='bounceInDown' duration={2000} delay={500}>
          <MaterialCommunityIcons name='checkbox-marked-circle' size={100} color='green' />
        </Animatable.View>

        <Text fontWeight={500} size={'1.5'}>
          Forget password
        </Text>
        <Text textAlign={'center'}>We just sent you an email with a link to reset your old password. please click on the link to reset your password</Text>

        <Link onPress={() => navigation.navigate(PUBLIC_ROUTES.LOGIN)} _text={{ mt: 5, fontWeight: 600, fontSize: 16, color: COLORS.primary }}>
          Back to Login
        </Link>
      </VStack>
    </SafeAreaView>
  );
};
