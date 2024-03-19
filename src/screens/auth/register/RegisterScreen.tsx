import React, { useEffect } from 'react';
import { Button, FormControl, Heading, Icon, Input, KeyboardAvoidingView, Modal, Pressable, Stack, Text, View } from 'native-base';
import { StatusBar, SafeAreaView, Alert, TouchableOpacity, Platform } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, globalStyles, inputStyles, labelStyles } from '../../../globalStyles';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { PUBLIC_ROUTES } from '../../../app/routes';
import { useAuth } from '../../../context/AuthContext';
import { useCountdown } from 'react-native-countdown-circle-timer';
import http, { API_ENDPOITS } from '../../../services/api';
import { successToast } from '../../../components/NotificationHandler';
import { timeout } from '../../../utils/utils';
import { useGetCurrentLocation } from '../../../hooks/useGetCurrentLocation';

export function RegisterScreen() {
  const [show, setShow] = useState(false);
  const navigation = useNavigation<any>();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const { getCurrentLocation, coordinates } = useGetCurrentLocation();
  const { remainingTime, elapsedTime } = useCountdown({ isPlaying: openModal && true, duration: 30, colors: '#abc' });
  const [resending, setResending] = useState(false);

  const { onRegister } = useAuth();

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleRegister = async () => {
    await onRegister(firstName, lastName, email, password, setOpenModal, coordinates);
  };

  const handleResendVerificationLink = async () => {
    try {
      setResending(true);
      await http.get(API_ENDPOITS.RESEND_VERIFICATION_LINK(email));

      successToast();
      timeout(() => setOpenModal(false), 500);

      timeout(() => navigation.navigate(PUBLIC_ROUTES.LOGIN), 1000);
    } catch (error) {
    } finally {
      setResending(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar animated={true} backgroundColor='#61dafb' barStyle={'dark-content'} showHideTransition={'slide'} />

        <ScrollView style={{ paddingHorizontal: 10, paddingTop: 5 }}>
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
          <Heading mt={5}>Sign Up</Heading>
          <Text my={2}>Create a RouteWatche account</Text>
          <FormControl>
            <FormControl.Label {...labelStyles}>First name</FormControl.Label>
            <Input {...inputStyles} onChangeText={setFirstName} placeholder='John' />
            <FormControl.Label {...labelStyles}>Last name</FormControl.Label>
            <Input {...inputStyles} onChangeText={setLastName} placeholder='Doe' />
            <FormControl.Label {...labelStyles}>Email</FormControl.Label>
            <Input {...inputStyles} onChangeText={setEmail} placeholder='johndoe@mail.com' />
            <FormControl.Label {...labelStyles}>Password</FormControl.Label>
            <Input
              {...inputStyles}
              onChangeText={setPassword}
              type={show ? 'text' : 'password'}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />} size={5} mr='2' color='muted.400' />
                </Pressable>
              }
              placeholder='Password'
            />
            <TouchableOpacity onPress={handleRegister} style={[globalStyles.button, { backgroundColor: COLORS.primary, marginVertical: 20, marginTop: 40 }]}>
              <Text color='white'>Sign Up</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
              <View style={{ flex: 1, height: 1, backgroundColor: '#ddd' }} />
              <View>
                <Text style={{ width: 30, textAlign: 'center', fontSize: 20, color: '#555' }}>Or</Text>
              </View>
              <View style={{ flex: 1, height: 1, backgroundColor: '#ddd' }} />
            </View>
            <Button
              variant={'outline'}
              style={[globalStyles.button, { marginTop: 10 }]}
              startIcon={<EvilIcons color='rgba(201, 36, 36, 0.8)' name='sc-google-plus' size={24} />}
              onPress={() => Alert.alert('coming soon')}
            >
              <Text style={{ color: '#333' }}>Sign up with Google</Text>
            </Button>
            
          </FormControl>
        </ScrollView>

        <Modal
          isOpen={openModal}
          onClose={() => {
            setOpenModal(false);
            navigation.navigate(PUBLIC_ROUTES.LOGIN);
          }}
        >
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Body borderRadius={10}>
              <Stack space={3} alignItems={'center'} p={5}>
                <Icon name='mark-email-read' as={MaterialIcons} size={20} color='primary' />
                {/* <MaterialIcons name='mark-email-read' size={24} color='black' /> */}
                <Heading size='md'>Email Verification</Heading>
                <Text textAlign={'center'}>A verification link has been send to your email.</Text>
                <Text>
                  {' '}
                  <TouchableOpacity onPress={handleResendVerificationLink} disabled={resending || remainingTime !== 0}>
                    <Text color='primary' fontWeight={600}>
                      {resending ? 'Resending' : 'Resend link'}
                    </Text>
                  </TouchableOpacity>{' '}
                  in {remainingTime}sec
                </Text>
              </Stack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
