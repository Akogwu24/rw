import { Pressable } from 'native-base';
import { HStack, KeyboardAvoidingView, ScrollView, Text } from 'native-base';
import { ProfileMenuModalHead } from './ProfileMenuModalHead';

export const AboutApp = ({ onClose }: { onClose?: () => void }) => {
  return (
    <KeyboardAvoidingView style={{ width: '100%' }}>
      <ScrollView w='full' p={4} showsVerticalScrollIndicator={false}>
        <ProfileMenuModalHead title='About App' onClose={onClose} />
        <Text>
        Routewatche is a public safety platform that addresses security issues through digital community policing giving real-time information about what is happening and data about what has happened in the past so users can make informed safety decisions. 
Our mission is to improve the security and safety consciousness of the average Nigerian, and ultimately reduce the crime rate in our country.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
