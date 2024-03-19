import React, { useEffect } from 'react';
import { Avatar, Badge, Box, Pressable, HStack, Heading, Icon, ScrollView, Text, Stack, View, FlatList, Spinner, Center } from 'native-base';
import { Dimensions, Platform, SafeAreaView, TouchableOpacity } from 'react-native';
import { COLORS } from '../../globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { incidentCategories } from './components/extras';
import { getRandomColor } from '../../utils/utils';
import { NewsCard } from './components/NewsCard';
import { CustomStatusBar } from '../../components/CustomStatusBar';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { PROTECTED_ROUTES } from '../../app/routes';
import { ImageBackground } from 'react-native';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import axiosInstance, { API_ENDPOITS } from '../../services/api';
import { useState } from 'react';
import { FullPageLoader } from '../../components/FullPageLoader';
import { wariningToast } from '../../components/NotificationHandler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getNews } from './service';

export default function News() {
  const navigation = useNavigation<any>();
  const { height } = Dimensions.get('window');
  const [newsCategory, setNewsCategory] = useState('');

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['NEWS', newsCategory],
    queryFn: ({ pageParam = 1 }) => getNews(pageParam, newsCategory),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });

  const { data: userDetails } = useQuery({
    queryKey: ['PROFILE'],
    queryFn: async () => {
      const { data } = await axiosInstance.get(API_ENDPOITS.GET_USER);
      return data;
    },
  });

  const NoNews = () => {
    return (
      <View flex={1} justifyContent={'center'} alignItems={'center'} h={height / 2}>
        <MaterialCommunityIcons name='cancel' size={52} color='black' />
        <Text fontWeight={600} my={3}>
          Opps! No News
        </Text>
      </View>
    );
  };

  const NewsFooter = () => {
    return (
      <>
        {isFetchingNextPage ? (
          <Center h={100}>
            <Spinner color='primary' />
          </Center>
        ) : null}
      </>
    );
  };

  if (isLoading) return <FullPageLoader />;

  return (
    <View flex={1}>
      <CustomStatusBar color='light-content' />
      <ImageBackground alt='...' imageStyle={{ borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }} source={require('../../../assets/ellipse.png')}>
        <View h={Platform.OS === 'ios' ? 170 : 130} borderBottomRadius='16px'>
          <SafeAreaView style={{ flex: 1 }}>
            <HStack mt={10} space={3} px={'7'} justifyContent={'space-between'} alignItems='center'>
              <Avatar
                h={55}
                w={55}
                borderWidth={1}
                borderColor={'white'}
                source={{
                  uri: userDetails?.photo,
                }}
              >
                TE
              </Avatar>
              <Box mr={'auto'}>
                <HStack space='1'>
                  <Heading fontSize={scale(18)} color='white' onPress={() => wariningToast()}>
                    Hi, {userDetails?.firstName}
                  </Heading>

                  <Text>👋</Text>
                </HStack>
                <Text color='white'>Welcome back to RouteWatche</Text>
              </Box>

              <Pressable position={'relative'} isDisabled={true} onPress={() => navigation.navigate(PROTECTED_ROUTES.NOTIFICATIONS)}>
                <Icon name='dot-single' size='10' top='-15' left={-2} zIndex={2} position='absolute' color='#D09F22' as={Entypo} />
                <Ionicons name='notifications-outline' size={24} color='white' />
              </Pressable>
            </HStack>
          </SafeAreaView>
        </View>
      </ImageBackground>

      <View my={3} px={Platform.OS === 'android' ? 3 : null}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentInset={{ top: 0, bottom: 0, left: 2, right: 2 }}
          contentContainerStyle={{ height: 35, gap: 10 }}
          horizontal={true}
        >
          {incidentCategories.map((categoty, i) => {
            const { color, newColorAplha } = getRandomColor();

            return (
              <TouchableOpacity key={i} onPress={() => setNewsCategory(categoty.title === 'All' ? '' : categoty.title)}>
                <Badge borderRadius={10} bg={newColorAplha}>
                  <Text fontSize={14} color={color}>
                    {categoty.title}
                  </Text>
                </Badge>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <Stack p={3} flex={1}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Heading mb={3} color={COLORS.primary} size={'sm'}>
              Recent News
            </Heading>
          }
          // onEndReached={loadMore}
          onEndReached={() => hasNextPage && fetchNextPage()}
          onEndReachedThreshold={0}
          ListEmptyComponent={() => <NoNews />}
          data={data?.pages?.flat() || []}
          renderItem={({ item }) => <NewsCard data={item as any} />}
          keyExtractor={(item: { ID: number }) => item?.ID?.toString()}
          ListFooterComponent={() => <NewsFooter />}
          // ItemSeparatorComponent={() => <View h={20}></View>}
        />
      </Stack>
    </View>
  );
}
