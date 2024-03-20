import { HStack, Pressable, Text } from 'native-base';
import { ReactNode } from 'react';

export const ProfileMenuModalHead = ({ title, onClose }: { onClose?: () => void; title: string | ReactNode }) => {
  return (
    <HStack mb={5} justifyContent='space-between'>
      <Text fontSize={'lg'} fontWeight={600}>
        {title}
      </Text>
      <Pressable onPress={onClose}>
        <Text>Close</Text>
      </Pressable>
    </HStack>
  );
};
