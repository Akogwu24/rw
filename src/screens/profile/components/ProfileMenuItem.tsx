import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { IconProps } from '@expo/vector-icons/build/createIconSet';
import { HStack, Text, Icon } from 'native-base';

type TProfileMewnuItem = {
  title: string;
  name: string;
  icon: IconProps<string>;
};
export const ProfileMenuItem = ({ title, name, icon }: TProfileMewnuItem) => {
  return (
    <HStack justifyContent={'space-between'} borderBottomWidth={1} borderBottomColor={'gray.200'} my={4} pt={2} pb={4}>
      <HStack space={3}>
        <Icon as={icon} name={name} size={6} color='#333' />
        <Text fontSize={'md'}>{title}</Text>
      </HStack>
      <MaterialIcons name='keyboard-arrow-right' size={24} color='black' />
    </HStack>
  );
};
