import { useRoute } from '@react-navigation/native';
import { Box, Flex, HStack, Heading, Icon, Spinner, Stack, Text, View } from 'native-base';
import React, { useEffect } from 'react';
import { ImageBackground, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TIncident } from '../../profile/components/types';
import { useGetAddressFromCoordinates } from '../../../hooks/useGetAddressFromCoordinates';
import dayjs from 'dayjs';
import { calculateDistanceApart, capitalizeFirstLetter } from '../../../utils/utils';
import { useGetUserCurrentLocation } from '../../../hooks/useGetUserCurrentLocation';
import { Image } from 'native-base';
import { styles } from './Styles';
import { ShareMewsModal } from '../../news/components/ShareMewsModal';
import CustomActionSheet from '../../../components/CustomActionSheet';
import { Fontisto } from '@expo/vector-icons';

export const IncidentSummary = () => {
  const { params: incident } = useRoute<TIncident | any>();
  const { address, getAddressFromCoordinates } = useGetAddressFromCoordinates();
  const { currentRegion } = useGetUserCurrentLocation();

  useEffect(() => {
    getAddressFromCoordinates(Number(incident.location.coordinates[1]), Number(incident.location.coordinates[0]));
  }, []);

  return (
    <View flex={1} bg='white'>
      <ImageBackground source={require('../../../../assets/ellipse.png')} imageStyle={{ borderBottomRightRadius: 40 }}>
        <View h={Platform.OS === 'ios' ? 200 : 160} borderBottomRadius='16px'>
          <SafeAreaView>
            <Stack p={5} mt={5}>
              <Heading fontSize={28} color='white' mb={3}>
                {capitalizeFirstLetter(incident?.title)}
              </Heading>
              <HStack alignItems={'center'} justifyContent='space-between'>
                <Flex direction='row'>
                  {address && (
                    <Text color='white' fontSize={19}>
                      {`${address?.city || address?.name}`} /{' '}
                    </Text>
                  )}
                  <Text color='white' fontSize={19}>
                    {/* @ts-ignore */}
                    {dayjs().to(dayjs(incident?.createdAt))}
                  </Text>
                </Flex>
                <Box borderRadius={20} bg='#fff'>
                  <Text fontSize={16} fontWeight={600} color='#333' py={2} px={3}>
                    {calculateDistanceApart(currentRegion.longitude, currentRegion.latitude, incident.location.coordinates[0], incident.location.coordinates[1])} miles
                  </Text>
                </Box>
              </HStack>
            </Stack>
          </SafeAreaView>
        </View>
      </ImageBackground>

      <Stack my={3} p={5} space={10} position={'relative'}>
        <Stack space={2}>
          <Text w={200} fontSize={18} px={2} py={1} bg='primary' color='white'>
            Location of Incident
          </Text>
          {address && (
            <Text fontSize={17}>
              {`${address?.streetNumber ? address?.streetNumber : ''} ${address?.street ? address?.street : ''} ${address?.city ? address?.city : ''} ${
                address?.region ? address?.region : ''
              } ${address?.country ? address?.country : ''}`}
            </Text>
          )}
        </Stack>

        <Stack space={2}>
          <Text w={200} fontSize={18} px={2} py={1} bg='primary' color='white'>
            Nature of Incident
          </Text>
          <Text fontSize={17}>{incident?.natureOfIncident}</Text>
        </Stack>

        <Stack space={2}>
          <Text w={200} fontSize={18} px={2} py={1} bg='primary' color='white'>
            Details of the Incident
          </Text>
          <Text fontSize={17}>{incident?.description}</Text>
        </Stack>

        <Stack space={2}>
          <Text w={200} fontSize={18} px={2} py={1} bg='primary' color='white'>
            Media
          </Text>
          {incident?.media ? (
            <HStack>
              {incident?.media?.map((media: string, i: number) => (
                <Image borderRadius={5} key={i} h={120} w={120} source={{ uri: media }} alt={'image media'} />
              ))}
            </HStack>
          ) : (
            <Spinner />
          )}
        </Stack>

        <CustomActionSheet
          triggerButton={
            <View style={styles.floatingButton}>
              <Icon as={Fontisto} name='share' size={'20px'} color='#fff' />
            </View>
          }
        >
          <ShareMewsModal />
        </CustomActionSheet>
      </Stack>
    </View>
  );
};
