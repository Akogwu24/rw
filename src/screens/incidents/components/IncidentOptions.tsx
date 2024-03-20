import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Center, HStack, Heading, Icon, Image, Modal, Stack, Text, View } from 'native-base';
import { ProfileMenuModalHead } from '../../profile/components/ProfileMenuModalHead';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../globalStyles';
import { scale } from 'react-native-size-matters';
import { PROTECTED_ROUTES } from '../../../app/routes';
import * as RootNavigation from '../../../navigation/RootNavigation';
import { TouchableOpacity } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import http, { API_ENDPOITS } from '../../../services/api';
import { errorToast, successToast } from '../../../components/NotificationHandler';
import { useState } from 'react';

const containerStyles = { px: scale(2), borderRadius: 8, bg: 'red.100', h: scale(100), w: scale(120) };
const iconStyles = { mt: 3, size: scale(30) };

export const IncidentOptions = ({ onClose }: { onClose?: () => void }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleGotoReportIncident = () => {
    RootNavigation.navigate('incidentsStack', '');
    onClose && onClose();
  };

  const handleGotoDSVA = () => {
    RootNavigation.navigate('incidentsStack', { screen: PROTECTED_ROUTES.DSVA_WELCOME });
    onClose && onClose();
  };

  const { mutate } = useMutation({
    mutationFn: async () => {
      const { data } = await http.post(API_ENDPOITS.USER_ALERT_CONATACTS, { type: 'ALL' });
      return data;
    },
    onSuccess: () => {
      onClose && onClose();
      setOpenModal(true);
      successToast('Alert Sent Successfully to Contacts');
    },
    onError: (error) => {
      console.error('alrt error', error);
      errorToast();
      onClose && onClose();
    },
  });
  return (
    <View w='full' p={5}>
      <ProfileMenuModalHead onClose={onClose} title={<View />} />
      <Stack space={8} alignItems={'center'}>
        <HStack space={8}>
          <Center {...containerStyles}>
            <Icon {...iconStyles} color='red.400' as={FontAwesome} name='phone' />
            <Text color='red.400' pt={2}>
              Emergency Call
            </Text>
          </Center>

          <TouchableOpacity onPress={() => mutate()}>
            <Center {...containerStyles} bg='rgba(98, 35, 207, 0.05)'>
              <Icon color={COLORS.primary} size='2xl' as={Ionicons} name='ios-person' />
              <Text color={COLORS.primary} pt={2}>
                Alert Contact
              </Text>
            </Center>
          </TouchableOpacity>
        </HStack>
        <HStack space={8}>
          <TouchableOpacity onPress={handleGotoReportIncident}>
            <Center {...containerStyles} bg='rgba(98, 35, 207, 0.05)'>
              <Icon color={COLORS.primary} size='2xl' as={Ionicons} name='ios-document-text' />
              <Text color={COLORS.primary} pt={2}>
                Report Incident
              </Text>
            </Center>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleGotoDSVA}>
            <Center {...containerStyles} bg='rgba(98, 35, 207, 0.05)'>
              <Image h={30} alt='domestic violence' source={require('../../../../assets/punch-blast.png')} />
              <Text fontSize={13} color={COLORS.primary} pt={2}>
                Domestic Violence
              </Text>
            </Center>
          </TouchableOpacity>
        </HStack>
      </Stack>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Body>
            <Stack space={3} alignItems={'center'} p={5}>
              <Image source={require('../../../../assets/Vector.png')} />
              <Heading size='md'>Alert Sent!</Heading>
              <Text textAlign={'center'}>An alert message has been sent to your emergency contact. </Text>
            </Stack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  );
};
