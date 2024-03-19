import { HStack, Pressable, Stack, Text, View } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { ProfileMenuModalHead } from './ProfileMenuModalHead';

export function ContactUs({ onClose }: { onClose?: () => void }) {
  return (
    <View w='full' p={4}>
      <ProfileMenuModalHead title='Contact us' onClose={onClose} />
      <Text>Feel free to reach out to us if you have any questions, suggestions, or feedback. We value your input and are here to assist you.</Text>
      <Stack my={5} space={5}>
        <HStack space={3} alignItems={'center'}>
          <Ionicons name='logo-twitter' size={25} color='rgba(29, 155, 240, 1)' />
          <Text>@routewatche</Text>
        </HStack>
        <HStack space={3} alignItems={'center'}>
          <Ionicons name='mail' size={25} color='crimson' />
          <Text>info@routewatche.com</Text>
        </HStack>
        {/* <HStack space={3} alignItems={'center'}>
          <Ionicons name='ios-logo-facebook' size={25} color='rgba(25, 119, 243, 1)' />
          <Text>watchapp nigeria</Text>
        </HStack> */}
        <HStack space={3} alignItems={'center'}>
          <Ionicons name='ios-logo-linkedin' size={24} color='blue' />
          <Text>RouteWatche</Text>
        </HStack>
        <HStack space={3} alignItems={'center'}>
          <Ionicons name='ios-logo-instagram' size={24} color='blue' />
          <Text>@routewatche</Text>
        </HStack>
      </Stack>
    </View>
  );
}
