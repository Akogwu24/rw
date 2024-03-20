import React from 'react';
import { Avatar, Center, Text, View, ScrollView, Spinner, FlatList, HStack, Icon } from 'native-base';
import { ActivityIndicator, SafeAreaView, View as RNView, TouchableOpacity } from 'react-native';
import { CustomStatusBar } from '../../components/CustomStatusBar';
import { COLORS } from '../../globalStyles';
import { ProfileMenuItem } from './components/ProfileMenuItem';
import { Ionicons, MaterialCommunityIcons, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import { ProfileModal } from './components/ProfileModal';
import { EmergencyContact } from './components/EmergencyContact';
import { Notifications } from './components/Notifications';
import { PasswordModal } from './components/PasswordModal';
import { AboutApp } from './components/AboutApp';
import { CustomModal } from '../../components/CustomModal';
import { ContactUs } from './components/ContactUs';
import { FAQ } from './components/FAQ';
import { Logout } from './components/Logout';
import { useQuery } from '@tanstack/react-query';
import http, { API_ENDPOITS } from '../../services/api';
import { FullPageLoader } from '../../components/FullPageLoader';
import { useNavigation } from '@react-navigation/native';
import { PROTECTED_ROUTES } from '../../app/routes';

export default function Profile() {
  const navigation = useNavigation<any>();
  const { data: userDetails, isLoading } = useQuery({
    queryKey: ['PROFILE'],
    queryFn: async () => {
      const { data } = await http.get(API_ENDPOITS.GET_USER);
      return data;
    },
  });

  if (isLoading) return <FullPageLoader />;

  return (
    <RNView style={{ flex: 1 }}>
      <CustomStatusBar color='light-content' />
      <View bg={COLORS.primary} flex={0.6}>
        <SafeAreaView style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
          <Center h='full' mt={7}>
            <Avatar bg='green.500' alignSelf='center' size='xl' source={{ uri: userDetails?.photo }}>
              {userDetails?.firstName?.charAt(0) || 'AJ'}
            </Avatar>
            <View mt={1}>
              <Text textAlign={'center'} color='white' fontWeight={500} fontSize='2xl'>
                {userDetails?.firstName} {userDetails?.lastName}
              </Text>
              <Text pb={3} textAlign={'center'} fontSize='md' color='white'>
                Profile
              </Text>
            </View>
          </Center>
        </SafeAreaView>
      </View>

      <ScrollView flex={1} p={5} pt={2} bg='white'>
        <TouchableOpacity onPress={() => navigation.navigate(PROTECTED_ROUTES.PROFILEVIEW)}>
          <HStack justifyContent={'space-between'} borderBottomWidth={1} borderBottomColor={'gray.200'} my={4} pt={2} pb={4}>
            <HStack space={3}>
              <Icon as={Ionicons} name={'person'} size={6} color='#333' />
              <Text fontSize={'md'}>Profile</Text>
            </HStack>
            <MaterialIcons name='keyboard-arrow-right' size={24} color='black' />
          </HStack>
        </TouchableOpacity>
        {/* <CustomModal hideDragIndicator={true} triggerButton={<ProfileMenuItem title={'Profile'} icon={Ionicons} name={'person'} />}>
          <ProfileModal userDetails={userDetails} refetch={refetch} />
        </CustomModal> */}

        <CustomModal triggerButton={<ProfileMenuItem title={'Emergency Contact'} icon={MaterialIcons} name={'quick-contacts-mail'} />}>
          <EmergencyContact userDetails={userDetails} />
        </CustomModal>

        <CustomModal triggerButton={<ProfileMenuItem title={'Notifications'} icon={Ionicons} name={'notifications'} />}>
          <Notifications />
        </CustomModal>

        <CustomModal triggerButton={<ProfileMenuItem title={'Password'} icon={Ionicons} name={'md-lock-closed'} />}>
          <PasswordModal />
        </CustomModal>
        <CustomModal triggerButton={<ProfileMenuItem title={'About app'} icon={Ionicons} name={'document-text'} />}>
          <AboutApp />
        </CustomModal>
        <CustomModal triggerButton={<ProfileMenuItem title={'Contact us'} icon={MaterialCommunityIcons} name={'account-voice'} />}>
          <ContactUs />
        </CustomModal>

        <CustomModal triggerButton={<ProfileMenuItem title={'FAQ'} icon={AntDesign} name={'questioncircle'} />}>
          <FAQ />
        </CustomModal>
        <CustomModal triggerButton={<ProfileMenuItem title={'Logout'} icon={Feather} name={'log-out'} />}>
          <Logout />
        </CustomModal>
      </ScrollView>
    </RNView>
  );
}
