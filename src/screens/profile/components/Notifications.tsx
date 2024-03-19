import { HStack, Pressable, ScrollView, Stack, Switch, Text } from 'native-base';
import React from 'react';
import { ProfileMenuModalHead } from './ProfileMenuModalHead';

export const Notifications = ({ onClose }: { onClose?: () => void }) => {
  return (
    <ScrollView w='full' p={4} showsVerticalScrollIndicator={false}>
      <ProfileMenuModalHead title='Notifications' onClose={onClose} />
      <Text mb={8} fontSize={15}>
        Choose the preferred notification options(s) you would like alerts in.{' '}
      </Text>
      <Stack space={5}>
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <Text fontSize={15}>Email alerts</Text>
          <Switch size={'sm'} offTrackColor='gray.300' onTrackColor='rgba(26, 151, 61, 1)' />
        </HStack>
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <Text fontSize={15}>Push Notifications</Text>
          <Switch size={'sm'} offTrackColor='gray.300' onTrackColor='rgba(26, 151, 61, 1)' />
        </HStack>
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <Text fontSize={15}>SMS alerts</Text>
          <Switch size={'sm'} offTrackColor='gray.300' onTrackColor='rgba(26, 151, 61, 1)' />
        </HStack>
      </Stack>
    </ScrollView>
  );
};
