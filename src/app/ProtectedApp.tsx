import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigation from '../navigation/BottomNavigation';
import { SingleNewsFullDetails } from '../screens/news/components/SingleNewsFullDetails';
import { Notifications } from '../screens/notifications';
import { Pressable, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { MapDirection } from '../screens/map/screens/MapDirection';
import { PROTECTED_ROUTES } from './routes';
import { ProfileView } from '../screens/profile/components/ProfileView';
import { PreviewIncident } from '../screens/incidents/screens/PreviewIncident';
import { IncidentSummary } from '../screens/incidents/screens/IncidentSummary';

const ProtectedAppStack = createStackNavigator();

export default function ProtectedApp() {
  const navigation = useNavigation();

  return (
    <ProtectedAppStack.Navigator initialRouteName='bottomTabs' screenOptions={{ headerShown: false }}>
      <ProtectedAppStack.Screen component={BottomNavigation} name='bottomTabs' />
      <ProtectedAppStack.Screen component={ProfileView} name={PROTECTED_ROUTES.PROFILEVIEW} />
      <ProtectedAppStack.Screen component={SingleNewsFullDetails} name={PROTECTED_ROUTES.FULL_NEWS_DETAILS} />
      <ProtectedAppStack.Screen component={PreviewIncident} name={PROTECTED_ROUTES.PREVIEW_INCIDENT} />
      <ProtectedAppStack.Screen component={IncidentSummary} name={PROTECTED_ROUTES.INCIDENT_SUMMARY} />

      <ProtectedAppStack.Screen
        component={Notifications}
        name={PROTECTED_ROUTES.NOTIFICATIONS}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerBackTitleVisible: false,
          headerBackTitleStyle: { color: 'red', fontSize: 10 },
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()} px={4}>
              <MaterialIcons name='arrow-back-ios' size={24} color='black' />
            </Pressable>
          ),
          headerRight: () => <Text px={4}>Clear</Text>,
        }}
      />
      <ProtectedAppStack.Screen
        component={MapDirection}
        name={PROTECTED_ROUTES.MAP_DIRECTION}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: 'Directions Map',
          headerBackTitleVisible: false,
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()} px={4}>
              <MaterialIcons name='arrow-back-ios' size={24} color='black' />
            </Pressable>
          ),
        }}
      />
    </ProtectedAppStack.Navigator>
  );
}
