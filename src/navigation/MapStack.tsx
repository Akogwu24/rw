import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Map from '../screens/map';
import { PROTECTED_ROUTES } from '../app/routes';
import { IncidentMap } from '../screens/map/screens/IncidentMap';
import { Pressable } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const MapStack = createStackNavigator();

export const MapStackNavigation = ({ navigation }: any) => {
  return (
    <MapStack.Navigator initialRouteName={PROTECTED_ROUTES.MAP} screenOptions={{ headerShown: false }}>
      <MapStack.Screen
        name={PROTECTED_ROUTES.MAP}
        component={Map}
        options={{
          headerTitle: 'Incidents Map',
          headerShown: true,
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()} px={4}>
              <MaterialIcons name='arrow-back-ios' size={20} color='black' />
            </Pressable>
          ),
        }}
      />
      <MapStack.Screen
        name={PROTECTED_ROUTES.INCIDENT_MAP}
        component={IncidentMap}
        options={{
          headerShown: true,
          headerTitle: 'Incidents',
          headerLeft: () => (
            <Pressable onPress={() => navigation.navigate(PROTECTED_ROUTES.MAP)} px={4}>
              <MaterialIcons name='arrow-back-ios' size={20} color='black' />
            </Pressable>
          ),
        }}
      />
    </MapStack.Navigator>
  );
};
