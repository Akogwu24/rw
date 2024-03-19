import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Flex, HStack, Modal, Text, View, ScrollView, Pressable } from 'native-base';
import { scale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../../../globalStyles';
import { useNavigation } from '@react-navigation/native';
import { TDestination } from './MapDirection';

const inactiveMeans = { bg: 'gray.300', space: 1, alignItems: 'center', borderRadius: 5, px: '2', py: '1' };

type TBottomMapSheetProps = {
  travelInfo: TTravelInfo | undefined;
  destination: TDestination;
  startingPoint: TDestination;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};
export type TTravelInfo = {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
};

export const BottomMapSheet = ({ modalVisible, setModalVisible, travelInfo }: TBottomMapSheetProps) => {
  const { width } = useWindowDimensions();

  return (
    <Modal defaultIsOpen={true} isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard justifyContent='flex-end' bottom='4' size='full'>
      <Modal.Content borderTopRadius={20}>
        <Modal.Header h={0} borderBottomWidth={0}>
          <Flex w='full' direction='row' justifyContent='center'>
            <View style={{ width: 40, height: 3, borderRadius: 10, backgroundColor: '#aaa' }} />
          </Flex>
        </Modal.Header>
        <Modal.Body pt={0}>
          <View w={'full' || width - scale(40)}>
            <HStack w='full' space='4'>
              <HStack bg='primary' space={1} alignItems={'center'} borderRadius={5} px='2' py='1'>
                <Ionicons name='car-sport-outline' size={20} color='#fff' />
              </HStack>
              <Text fontSize={scale(18)} color='primary'>
                {travelInfo?.duration.text}
              </Text>
              <Text ml='auto' fontSize={scale(18)} textAlign={'center'} flex={0.7} color='gray.500'>
                {travelInfo?.distance?.text}
              </Text>
            </HStack>
            <Text my={5}>No traffic jams in next 1 hour</Text>
            {/* <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentInset={{ top: 0, bottom: 0, left: 0, right: 0 }}
              contentContainerStyle={{ height: 35, gap: 10 }}
              horizontal={true}
            >
              <HStack bg='primary' space={1} alignItems={'center'} borderRadius={5} px='2' py='1'>
                <Ionicons name='car-sport-outline' size={20} color='#fff' />
                <Text color='white' fontWeight={500}>
                  45mins
                </Text>
              </HStack>
              <HStack {...inactiveMeans}>
                <Fontisto name='bicycle' size={18} color='black' />
                <Text fontWeight={500}>45mins</Text>
              </HStack>
              <HStack {...inactiveMeans}>
                <MaterialIcons name='directions-walk' size={20} color='black' />
                <Text fontWeight={500}>45mins</Text>
              </HStack>
              <HStack {...inactiveMeans}>
                <Ionicons name='train-outline' size={20} color='black' />
                <Text fontWeight={500}>45mins</Text>
              </HStack>
            </ScrollView>  */}

            <Pressable onPress={() => setModalVisible(false)} {...globalStyles.button} mt={5} bg='primary'>
              <Text fontWeight={600} color='white'>
                OK
              </Text>
            </Pressable>
          </View>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
