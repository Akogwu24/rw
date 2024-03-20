import { Accordion, HStack, Heading, Pressable, ScrollView, Text, View } from 'native-base';
import { faqs } from './extras';
import { ProfileMenuModalHead } from './ProfileMenuModalHead';

export function FAQ({ onClose }: { onClose?: () => void }) {
  return (
    <View w='full' p={4}>
 <ProfileMenuModalHead title='FAQ' onClose={onClose} />
      <ScrollView>
        <Accordion borderWidth={0}>
          {faqs.map((faq, i) => (
            <Accordion.Item key={i}>
              <Accordion.Summary>
                <Heading size='sm'>{faq.question}</Heading>
              </Accordion.Summary>
              <Accordion.Details pt={0}>{faq.answer}</Accordion.Details>
            </Accordion.Item>
          ))}
        </Accordion>
      </ScrollView>
    </View>
  );
}
