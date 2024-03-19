import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Center, Divider, HStack, Icon, Image, ScrollView, Text, View } from 'native-base';
import React, { useState } from 'react';
import { Modal, SafeAreaView, TouchableOpacity } from 'react-native';
import { CustomStatusBar } from '../../../components/CustomStatusBar';
import { COLORS, globalStyles } from '../../../globalStyles';
import { ProfileModal } from './ProfileModal';
import { useQuery } from '@tanstack/react-query';
import http, { API_ENDPOITS } from '../../../services/api';
import { CustomModal } from '../../../components/CustomModal';
import { EditEmergencyContact } from './EditEmergencyContact';

type TPropertyValue = {
  property: string;
  value: string;
};

export const ProfileView = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const { data: userDetails, refetch } = useQuery({
    queryKey: ['PROFILE'],
    queryFn: async () => {
      const { data } = await http.get(API_ENDPOITS.GET_USER);
      return data;
    },
  });

  const PopertyValue = ({ property, value }: TPropertyValue) => {
    return (
      <HStack py={3} justifyContent={'space-between'}>
        <Text color='gray.700'>{property}</Text>
        <Text fontSize={15} fontWeight={500} numberOfLines={1} ellipsizeMode='tail' w='220' textAlign={'right'}>
          {value}
        </Text>
      </HStack>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1, paddingTop: 20 }}>
      <CustomStatusBar color='dark-content' />
      <HStack justifyContent={'space-between'} px={5}>
        <Icon onPress={() => navigation.goBack()} as={MaterialIcons} name='arrow-back-ios' size={'20px'} color='black' />
        <Text flex={1} pr={5} fontSize={18} fontWeight={500} textAlign={'center'}>
          My Profile
        </Text>
      </HStack>
      <Center my={5}>
        <Avatar alignSelf='center' size='xl' source={{ uri: userDetails?.photo }}>
          {userDetails?.lastName?.charAt(0)?.toUpperCase()}
        </Avatar>
      </Center>
      <ScrollView px={5}>
        <PopertyValue property='First Name' value={userDetails?.firstName} />
        <Divider bg='gray.200' />
        <PopertyValue property='Last Name' value={userDetails?.lastName} />
        <Divider bg='gray.200' />
        <PopertyValue property='Username' value={userDetails?.userHandle} />
        <Divider bg='gray.200' />
        <PopertyValue property='email' value={userDetails?.email} />

        {userDetails?.contacts?.map((contact: any, i: number) => (
          <View key={1} borderTopWidth={4} borderColor={'gray.100'} my={5}>
            <HStack my={5} justifyContent={'space-between'}>
              <Text fontSize={15}>Emergency Contact 1</Text>
              {/* <FontAwesome5 name='edit' size={18} color='black' /> */}
              <CustomModal triggerButton={<FontAwesome5 name='edit' size={20} color='black' />}>
                <EditEmergencyContact userDetails={userDetails} contact={contact} />
              </CustomModal>
            </HStack>
            <PopertyValue property='Name' value={contact?.name} />
            <Divider bg='gray.200' />
            <PopertyValue property='Phone' value={contact?.phoneNumber} />
            <Divider bg='gray.200' />
            <PopertyValue property='Rlationship' value={contact?.relationship} />
          </View>
        ))}
        <TouchableOpacity onPress={() => setModalVisible(true)} style={[globalStyles.button, { backgroundColor: COLORS.primary }]}>
          <Text color='white'>Update Profile</Text>
        </TouchableOpacity>

        <Modal
          presentationStyle={'pageSheet'}
          animationType='slide'
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ProfileModal setModalVisible={setModalVisible} userDetails={userDetails} refetch={refetch} />
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};
