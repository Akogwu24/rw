import { Button, HStack, Text, View } from 'native-base';
import { ProfileMenuModalHead } from './ProfileMenuModalHead';
import { OutlinedButton } from '../../../components/CustomButtons';
import { useAuth } from '../../../context/AuthContext';

export function Logout({ onClose }: { onClose?: () => void }) {
  const { onLogout } = useAuth();
  return (
    <View w='full' p={4}>
      <ProfileMenuModalHead title='Logout' onClose={onClose} />
      <Text>Are you sure you want to log out of the RouteWatche App?</Text>
      <HStack space={6} my={5}>
        <Button onPress={onClose} flex={1} variant={'outline'} color='primary' borderColor={'primary'}>
          <Text color='primary' fontWeight={500}>
            Cancel
          </Text>
        </Button>
        <Button onPress={onLogout} flex={1} bg='primary'>
          <Text color='white' fontWeight={500}>
            Yes
          </Text>
        </Button>
      </HStack>
    </View>
  );
}
