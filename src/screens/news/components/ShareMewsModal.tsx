import React from 'react';
import { Circle, HStack, Heading, Icon, View } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';

const iconsStyles = { size: '23px', color: 'white' };
const circlePadding = '3';

export const ShareMewsModal = ({ onClose }: { onClose?: () => void }) => {
  return (
    <View w='full' pb={Platform.OS === 'android' ? 10 : 0}>
      <HStack mt={2} mb={5} bg='red' justifyContent={'space-between'}>
        <Heading fontSize={18}>Share incident with others</Heading>
        <MaterialIcons onPress={onClose} name='cancel' size={24} color='black' />
      </HStack>
      <HStack space='4' justifyContent={'center'}>
        <Circle bg='green.500' p={circlePadding}>
          <Icon {...iconsStyles} as={Ionicons} name='md-logo-whatsapp' />
        </Circle>
        <Circle bg='rgba(0, 148, 255, 1)' p={circlePadding}>
          <Icon {...iconsStyles} as={Ionicons} name='ios-logo-twitter' />
        </Circle>
        <Circle bg='purple.500' p={circlePadding}>
          <Icon {...iconsStyles} as={MaterialCommunityIcons} name='message-reply-text' />
        </Circle>
        <Circle bg='red.500' p={circlePadding}>
          <Icon {...iconsStyles} as={Ionicons} name='ios-logo-instagram' />
        </Circle>
        <Circle justifyContent={'center'} alignItems={'center'} bg='rgba(10, 148, 255, 1)' p={circlePadding}>
          <Icon {...iconsStyles} pl={1} as={FontAwesome5} name='facebook-f' />
        </Circle>
        <Circle justifyContent={'center'} alignItems={'center'} bg='rgba(10, 148, 255, 1)' p={circlePadding}>
          <Icon {...iconsStyles} as={EvilIcons} pr={'2px'} name='sc-telegram' />
        </Circle>
      </HStack>
    </View>
  );
};
