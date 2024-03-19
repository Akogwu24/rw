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
import { TContact, TUserDetails } from './types';

// type TContact = {
//   contactId: string;
//   email: string;
//   name: string;
//   phoneNumber: string;
//   relationship: string;
// };
type TEmergencyContactProps = {
  onClose?: () => void;
  contact: TContact;
  userDetails: TUserDetails;
};

export const EditEmergencyContact = ({ onClose, userDetails, contact }: TEmergencyContactProps) => {
  const [name, setName] = useState(contact?.name);
  const [phoneNumber, setPhoneNumber] = useState(contact?.phoneNumber);
  const [relationship, setRelationship] = useState(contact?.relationship);
  const [email, setEmail] = useState(contact?.email);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => http.patch(API_ENDPOITS.EDIT_EMAERGENCY_CONTACT(contact?.contactId), { name, phoneNumber, email, relationship }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['PROFILE'] });
      successToast('Emergency contact Updated Successfully');
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
            defaultValue={relationship}
            buttonTextAfterSelection={(selectedItem, index) => selectedItem}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />

          <TouchableOpacity onPress={() => mutate()} style={[globalStyles.button, { backgroundColor: COLORS.primary, marginBottom: 30, marginTop: 30 }]}>
            <Text color='white'>{isLoading ? 'Editing Contact' : 'Edit Contact'}</Text>
          </TouchableOpacity>
        </FormControl>
      </View>
    </View>
  );
};
