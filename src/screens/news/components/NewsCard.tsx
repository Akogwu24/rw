import React from 'react';
import { Box, HStack, Icon, Image, Pressable, Stack, Text } from 'native-base';
import { COLORS, globalStyles } from '../../../globalStyles';
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getRandomColor } from '../../../utils/utils';
import { useNavigation } from '@react-navigation/native';
import { PROTECTED_ROUTES } from '../../../app/routes';
import { TouchableOpacity } from 'react-native-gesture-handler';

export type TNewsCardProps = {
  Category: string;
  Date: string;
  date: string;
  ID: number;
  Location: string;
  location: string;
  NewsSource: string;
  SourceURL: string;
  Summary: string;
  summary: string;
  Title: string;
  title: string;
};
export const NewsCard = ({ data }: { data: TNewsCardProps }) => {
  const navigation = useNavigation<any>();
  const { newColorAplha } = getRandomColor();

  return (
    <Pressable onPress={() => navigation.navigate(PROTECTED_ROUTES.FULL_NEWS_DETAILS, { data })}>
      <Box position={'relative'} bg='white' my={3} shadow={0.5} p='4' rounded='lg'>
        <Stack zIndex={2} maxW='92%' space={2}>
          <Text color={COLORS.primary} fontSize={15} fontWeight={500}>
            {data?.Title || data?.title || 'High way robbery near Yaba bus stop at midnight'}
          </Text>
          <HStack space={5}>
            <HStack space={1} alignItems={'center'}>
              <Icon as={Foundation} name='megaphone' color={COLORS.primary} />
              <Text fontSize={12}>{data?.Location || data?.location}</Text>
            </HStack>
            <HStack>
              <Icon as={MaterialCommunityIcons} name='clock-time-eight' color={COLORS.primary} />
              <Text fontSize={12}>{data?.Date || data?.date}</Text>
            </HStack>
          </HStack>
          <Text numberOfLines={2} ellipsizeMode='tail'>
            {data?.Summary || data?.summary}
          </Text>
          <TouchableOpacity>
            <Text color='primary'>click to read more</Text>
          </TouchableOpacity>
        </Stack>
        <Box w={'70px'} h={'70px'} bg={newColorAplha} position={'absolute'} right={0} borderRadius={6} borderBottomLeftRadius={'146px'}></Box>
      </Box>
    </Pressable>
  );
};
