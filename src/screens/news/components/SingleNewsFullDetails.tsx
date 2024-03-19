import React from 'react';
import { AspectRatio, Flex, HStack, Heading, Icon, ScrollView, Text, View } from 'native-base';
import { Dimensions, Image, SafeAreaView } from 'react-native';
import { Foundation, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { COLORS, globalStyles, headingStyles } from '../../../globalStyles';
import { useNavigation } from '@react-navigation/native';
import { CustomStatusBar } from '../../../components/CustomStatusBar';
import { CustomBadge } from '../../../components/CustomBadge';
import ShareNewsOptions from '../../../components/CustomActionSheet';
import { ShareMewsModal } from './ShareMewsModal';
import { PROTECTED_ROUTES } from '../../../app/routes';
import { useRoute } from '@react-navigation/native';

export const SingleNewsFullDetails = () => {
  const navigation = useNavigation<any>();
  const { params } = useRoute<any>();

  return (
    <SafeAreaView>
      <CustomStatusBar color='dark-content' />
      <View p='5'>
        <HStack justifyContent={'space-between'}>
          <Icon onPress={() => navigation.navigate(PROTECTED_ROUTES.NEWS)} as={MaterialIcons} name='arrow-back-ios' size={'25px'} color='black' />
          <ShareNewsOptions triggerButton={<Icon as={Fontisto} name='share' size={'24px'} color='black' />}>
            <ShareMewsModal />
          </ShareNewsOptions>
        </HStack>
        <Flex direction='row' justifyContent={'space-between'} pt={4}>
          <View>
            <Heading {...headingStyles} maxW={250}>
              {params?.data?.Title || params?.data?.title}
            </Heading>
            <HStack space={5}>
              <HStack space={1} alignItems={'center'}>
                <Icon as={Foundation} name='megaphone' color={COLORS.primary} />
                <Text fontSize={12}>{params?.data?.Location || params?.data?.location}</Text>
              </HStack>
              <HStack>
                <Icon as={MaterialCommunityIcons} name='clock-time-eight' color={COLORS.primary} />
                <Text fontSize={12}>{params?.data?.Date || params?.data?.date}</Text>
              </HStack>
            </HStack>
          </View>
          <CustomBadge bg='rgba(219, 112, 5, 0.08)' color={'#DB7080'} text={params.data.Category || params.data.category} />
        </Flex>
        <ScrollView maxHeight={'80%'} my={5} mb={10} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <AspectRatio>
            <Image
              style={{ marginVertical: 10, resizeMode: 'cover' }}
              alt='news image'
              source={{ uri: params?.data?.ImageURL || params?.data?.imageURL || require('../../../../assets/images/news-image.png') }}
            />
          </AspectRatio>

          <Text my={5}>{params?.data?.Summary || params?.data?.summary}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
