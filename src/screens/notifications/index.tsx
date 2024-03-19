import React from 'react';
import { HStack, SectionList, Text, View, Center, Stack, Heading } from 'native-base';
import { SafeAreaView, Image } from 'react-native';
import { CustomStatusBar } from '../../components/CustomStatusBar';

type ISingleNotification = {
  section: {
    item: {
      incident: string;
      desc: string;
      location: string;
      time: number;
    };
  };
};

const SingleNotification = ({ section }: ISingleNotification) => {
  return (
    <HStack py={3} space={4} alignItems={'flex-start'} borderTopColor={'gray.200'} borderBottomColor={'gray.200'} borderBottomWidth={1}>
      <Center h='42' w='42' bg={'red.500'} borderRadius={'full'}>
        <Image alt='...' resizeMode='cover' source={require('../../../assets/images/notifications/gun.png')} style={{ height: 20, width: 20 }} />
      </Center>
      <Stack>
        <Heading fontSize={16} fontWeight='500'>
          {section?.item?.incident}
        </Heading>
        <Text fontStyle={'italic'} py='2px'>
          {section.item.location} / {section.item.time}h ago
        </Text>
        <Text>Lorem ipsum dolor sit amet, consectetur adiscing elit. Tempor pellentesque...</Text>
      </Stack>
    </HStack>
  );
};

export const Notifications = () => {
  const sections = [
    {
      sectionTitle: 'General',
      data: [
        {
          incident: 'High way robbery',
          location: 'kaduna',
          time: 5,
          desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus laudantium amet',
        },
        {
          incident: 'Rape',
          location: 'Kano',
          time: 8,
          desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus laudantium amet',
        },
        {
          incident: 'High way robbery',
          location: 'kaduna',
          time: 5,
          desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus laudantium amet',
        },
      ],
    },
    {
      sectionTitle: 'Close to you',
      data: [
        {
          incident: 'Accident',
          location: 'kaduna',
          time: 5,
          desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus laudantium amet',
        },
        {
          incident: 'High way robbery',
          location: 'Lagos',
          time: 4,
          desc: 'autem voluptate, neque ducimus expedita architecto optio officiis error magnam quae eveniet ',
        },
        {
          incident: 'Accident',
          location: 'Kaduna',
          time: 3,
          desc: 'praesentium praesentium praesentium praesentium libero eligendi. Itaque veritatis optio deserunt?',
        },
      ],
    },
  ];

  return (
    <View bg='white'>
      <CustomStatusBar />
      <SafeAreaView>
        <Stack p={5}>
          <SectionList
            sections={sections}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Text>No News</Text>}
            stickySectionHeadersEnabled
            // ItemSeparatorComponent={(props) => <View style={{ height: 5, backgroundColor: props.highlighted ? 'green' : 'gray' }} />}
            renderItem={(data) => <SingleNotification section={data} />}
            renderSectionHeader={({ section }) => (
              <Heading pt={10} pb={2} fontSize={18} fontWeight='600'>
                {section.sectionTitle}
              </Heading>
            )}
          />
        </Stack>
      </SafeAreaView>
    </View>
  );
};
