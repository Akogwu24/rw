import React from 'react';
import { Avatar, Center, FormControl, Image, Input, ScrollView, Spinner, Text } from 'native-base';
import { Pressable, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { COLORS, globalStyles, inputStyles, labelStyles } from '../../../globalStyles';
import { ProfileMenuModalHead } from './ProfileMenuModalHead';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import http, { API_ENDPOITS } from '../../../services/api';
import { errorToast, successToast } from '../../../components/NotificationHandler';
import axios from 'axios';
import { TUserDetails } from './types';
import { useAuth } from '../../../context/AuthContext';

type TProfileModalProps = {
  onClose?: () => void;
  userDetails: TUserDetails;
  refetch: () => void;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};

export const ProfileModal = ({ onClose, userDetails, refetch, setModalVisible }: TProfileModalProps) => {
  const inputRef = useRef<any>();
  const queryClient = useQueryClient();
  const [selectedProfileImage, setSelectedProfileImage] = useState('');
  const [firstName, setFirstName] = useState(userDetails?.firstName);
  const [lastName, setLastName] = useState(userDetails?.lastName);
  const [email, setEmail] = useState(userDetails?.email);
  const [username, setUsername] = useState(userDetails?.userHandle);
  const [phone, setPhone] = useState(userDetails?.phone);
  const [loading, setLoading] = useState(false);
  let profileImageUrlFormCloud: string;

  async function updateProfile() {
    const payload = { firstName, lastName, email, username, phone };
    const { data } = await http.patch(API_ENDPOITS.UPDATE_USER(userDetails._id), payload);
    return data;
  }

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['PROFILE'] });
      successToast('Profile Updated');
      setModalVisible(false);
      refetch();
      onClose && onClose();
    },
  });

  const selectProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setSelectedProfileImage(result.assets[0].uri);
      let newfile = {
        uri: result.assets[0].uri,
        type: `test/${result.assets[0].uri.split('.')[1]}`,
        name: `test.${result.assets[0].uri.split('.')[1]}`,
      };
      // handleUpload(newfile);
      handleProfileImageUpload(newfile);
    } else {
      alert('You did not select any image.');
    }
  };
  const handleProfileImageUpload = (image: any) => {
    setLoading(true);
    const uploaders = [image].map((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'akogwu');
      formData.append('cloud_name', 'akogwu');
      return axios
        .post(`https://api.cloudinary.com/v1_1/akogwu/image/upload`, formData, {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          const data = response.data;
          profileImageUrlFormCloud = data.secure_url;
          setModalVisible(false);
        });
    });

    axios.all(uploaders).then(async () => {
      try {
        const profilPhotoRes = await http.put(API_ENDPOITS.UPLOAD_PROFILE_PHOTO, { photo: profileImageUrlFormCloud, userId: userDetails._id });

        successToast();
        refetch();
      } catch (error) {
        errorToast();
        refetch();
      }
    });
  };

  return (
    <KeyboardAvoidingView style={{ width: '100%' }}>
      <ScrollView w='full' p={4} showsVerticalScrollIndicator={false}>
        <ProfileMenuModalHead title='Profile' onClose={() => setModalVisible(false)} />

        <Center>
          <Pressable onPress={selectProfileImage}>
            <Avatar alignSelf='center' size='xl' source={{ uri: selectedProfileImage ? selectedProfileImage : userDetails?.photo }}>
              {userDetails?.lastName?.charAt(0)?.toUpperCase()}
            </Avatar>
            {/* <Image
              style={{ width: 100, height: 100, borderRadius: 50 }}
              alt='...'
              source={{
                uri: selectedProfileImage ? selectedProfileImage : userDetails?.photo || require('../../../../assets/images/avatar.png'),
              }}
            /> */}
            <Text textDecoration={'underline'} my={3}>
              Tap to Change
            </Text>
          </Pressable>
        </Center>

        <FormControl>
          <FormControl.Label {...labelStyles}>First Name</FormControl.Label>
          <Input ref={inputRef} onLayout={() => inputRef?.current?.focus()} {...inputStyles} placeholder='John' value={firstName} onChangeText={setFirstName} />
          <FormControl.Label {...labelStyles}>Last Name</FormControl.Label>
          <Input {...inputStyles} placeholder='Doe' value={lastName} onChangeText={setLastName} />
          <FormControl.Label {...labelStyles}>Username</FormControl.Label>
          <Input {...inputStyles} placeholder='Doe John' value={username} onChangeText={setUsername} />
          <FormControl.Label {...labelStyles}>Email Address</FormControl.Label>
          <Input {...inputStyles} placeholder='John@mail.com' value={email} onChangeText={setEmail} />
          <FormControl.Label {...labelStyles}>Phone Number</FormControl.Label>
          <Input {...inputStyles} placeholder='phone' value={phone} onChangeText={setPhone} />

          <TouchableOpacity onPress={() => mutate()} style={[globalStyles.button, { backgroundColor: COLORS.primary, marginBottom: 40, marginTop: 40 }]}>
            {loading ? <Spinner color={'white'} /> : <Text color='white'>{'Update Profile'}</Text>}
          </TouchableOpacity>
        </FormControl>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
