import { FormControl, HStack, Input, Pressable, ScrollView, Text, View } from 'native-base';
import React, { useState } from 'react';
import { COLORS, globalStyles, inputStyles, labelStyles } from '../../../globalStyles';
import { ProfileMenuModalHead } from './ProfileMenuModalHead';
import { useMutation } from '@tanstack/react-query';
import http, { API_ENDPOITS } from '../../../services/api';
import { errorToast, successToast } from '../../../components/NotificationHandler';
import { TouchableOpacity } from 'react-native';

export const PasswordModal = ({ onClose }: { onClose?: () => void }) => {
  const [show, setShow] = useState({ input1: false, input2: false, input3: false });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const { data } = await http.put(API_ENDPOITS.USER_CHANGE_PASSWORD, { oldPassword, newPassword, confirmPassword });
      return data;
    },
    onSuccess: (data) => {
      successToast('Password Changed Successfully');
      onClose && onClose();
    },
    onError: (error: any) => {
      errorToast(error.response.data.message);
    },
  });

  return (
    <View w='full' p={4}>
      <ProfileMenuModalHead title='Password' onClose={onClose} />

      <FormControl>
        <FormControl.Label {...labelStyles}>Old Password</FormControl.Label>
        <Input
          onChangeText={setOldPassword}
          {...inputStyles}
          type={show.input1 ? 'text' : 'password'}
          InputRightElement={
            <Pressable pr={5} onPress={() => setShow((prev) => ({ ...prev, input1: !show.input1 }))}>
              <Text> {show.input1 ? 'Hide' : 'Show'}</Text>
            </Pressable>
          }
          placeholder='Password'
        />
        <FormControl.Label {...labelStyles}>New password</FormControl.Label>
        <Input
          onChangeText={setNewPassword}
          {...inputStyles}
          type={show.input2 ? 'text' : 'password'}
          InputRightElement={
            <Pressable pr={5} onPress={() => setShow((prev) => ({ ...prev, input2: !show.input2 }))}>
              <Text> {show.input2 ? 'Hide' : 'Show'}</Text>
            </Pressable>
          }
          placeholder='Password'
        />
        <FormControl.Label {...labelStyles}>Confirm password</FormControl.Label>
        <Input
          onChangeText={setConfirmPassword}
          {...inputStyles}
          type={show.input3 ? 'text' : 'password'}
          InputRightElement={
            <Pressable pr={5} onPress={() => setShow((prev) => ({ ...prev, input3: !show.input3 }))}>
              <Text> {show ? 'Hide' : 'Show'}</Text>
            </Pressable>
          }
          placeholder='Password'
        />

        <TouchableOpacity onPress={() => mutate()} style={[globalStyles.button, { backgroundColor: COLORS.primary, marginBottom: 30, marginTop: 30 }]}>
          <Text color='white'>{isLoading ? 'Updating' : 'Update Password'}</Text>
        </TouchableOpacity>
      </FormControl>
    </View>
  );
};
