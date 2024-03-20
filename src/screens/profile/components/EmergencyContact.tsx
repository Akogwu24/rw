import React from 'react';
import { Text, View, FormControl, Input } from 'native-base';
import { COLORS, globalStyles, inputStyles, labelStyles } from '../../../globalStyles';
import { useState } from 'react';
import { ProfileMenuModalHead } from './ProfileMenuModalHead';
import { TouchableOpacity } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import http, { API_ENDPOITS } from '../../../services/api';
import { errorToast, successToast } from '../../../components/NotificationHandler';
import SelectDropdown from 'react-native-select-dropdown';
import { MaterialIcons } from '@expo/vector-icons';
import { relationshipWithContact } from './extras';
import { TUserDetails } from './types';

type TEmergencyContactProps = {
  onClose?: () => void;
  userDetails: TUserDetails;
};

export const EmergencyContact = ({ onClose, userDetails }: TEmergencyContactProps) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [relationship, setRelationship] = useState('');
  const [email, setEmail] = useState('');
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => await http.post(API_ENDPOITS.CREATE_EMERGENCY_CONTACT(userDetails._id), { name, phoneNumber, email, relationship, primary: true }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['PROFILE'] });
      successToast('Emergency contact Created Successfully');
      onClose && onClose();
    },
    onError: (error) => {
      errorToast('Could not add, Check your internet connection');
    },
  });

  return (
    <View style={{ width: '100%' }}>
      <View w='full' px={4}>
        <ProfileMenuModalHead title='Emergency contact' onClose={onClose} />

        <FormControl>
          <FormControl.Label {...labelStyles}>Contact Name</FormControl.Label>
          <Input {...inputStyles} placeholder='John Doe' value={name} onChangeText={setName} />
          <FormControl.Label {...labelStyles}>Contact Phone Number</FormControl.Label>
          <Input {...inputStyles} onChangeText={setPhoneNumber} value={phoneNumber} />
          <FormControl.Label {...labelStyles}>Contact Email</FormControl.Label>
          <Input {...inputStyles} onChangeText={setEmail} value={email} />
          <FormControl.Label {...labelStyles}>Relationship with contact</FormControl.Label>

          <SelectDropdown
            data={relationshipWithContact}
            defaultButtonText='Choose Relationship'
            buttonStyle={{ height: 40, width: '100%', backgroundColor: 'white', borderWidth: 1, borderColor: '#eee', borderRadius: 4 }}
            buttonTextStyle={{ textAlign: 'left', fontSize: 15 }}
            renderDropdownIcon={() => <MaterialIcons name='keyboard-arrow-down' size={24} color='black' />}
            onSelect={(selectedItem) => setRelationship(selectedItem)}
            buttonTextAfterSelection={(selectedItem, index) => selectedItem}
            rowTextForSelection={(item, index) => item}
          />

          <TouchableOpacity onPress={() => mutate()} style={[globalStyles.button, { backgroundColor: COLORS.primary, marginBottom: 30, marginTop: 30 }]}>
            <Text color='white'>{isLoading ? 'Adding Contact' : 'Update Contact'}</Text>
          </TouchableOpacity>
        </FormControl>
      </View>
    </View>
  );
};
