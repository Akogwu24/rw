import React from 'react';
import { Image, View } from 'native-base';
import CustomActionSheet from '../../components/CustomActionSheet';
import { IncidentOptions } from './components/IncidentOptions';

export function Incident() {
  return (
    <View>
      <CustomActionSheet triggerButton={<Image alt='sos' source={require('../../../assets/images/sos.png')} />}>
        <IncidentOptions />
      </CustomActionSheet>
    </View>
  );
}
