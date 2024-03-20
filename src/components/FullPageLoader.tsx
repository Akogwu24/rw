import { Spinner } from 'native-base';
import { View } from 'native-base';
import React from 'react';

export const FullPageLoader = () => {
  return (
    <View flex={1} justifyContent={'center'}>
      <Spinner size='large' color='primary' />
    </View>
  );
};
