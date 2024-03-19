import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Incident } from '../screens/incidents';
import Profile from '../screens/profile';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { NewsScreensStack } from './NewsScreensStack';
import { COLORS } from '../globalStyles';
import { Platform } from 'react-native';
import { PROTECTED_ROUTES } from '../app/routes';
import { MapStackNavigation } from './MapStack';
import { IncidentStackNavigator } from './IncidentsStack';
// import { ReportIncident } from '../screens/incidents/screens/ReportIncident';
// import * as RootNavigation from './navigation/RootNavigation';

const BottomTab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: { paddingTop: Platform.OS === 'ios' ? 10 : 5, height: Platform.OS === 'ios' ? 90 : 70, paddingBottom: Platform.OS === 'ios' ? 30 : 10 },
      }}
    >
      <BottomTab.Screen
        component={NewsScreensStack}
        name={PROTECTED_ROUTES.NEWS_STACK}
        options={{
          tabBarLabel: 'News',
          tabBarLabelStyle: { fontSize: 14, fontWeight: '500' },
          tabBarIcon: ({ color, focused, size }) => <Ionicons name='newspaper-outline' size={24} color={focused ? COLORS.primary : '#333'} />,
        }}
      />

      <BottomTab.Screen
        component={IncidentStackNavigator}
        name={'incidentsStack2'}
        options={{
          tabBarLabel: 'Incident',
          tabBarLabelStyle: { fontSize: 14, fontWeight: '500' },
          tabBarIcon: ({ color, focused, size }) => <Ionicons name='warning' size={24} color={focused ? COLORS.primary : '#333'} />,
        }}
      />
      {/* <BottomTab.Screen
        component={IncidentStackNavigator}
        name={'incidentsStack2'}
        options={{
          // tabBarButton: () => <Incident />,
          tabBarIcon: ({ color, focused, size }) => <Ionicons name='warning' size={24} color={focused ? COLORS.primary : '#333'} />,
        }}
      /> */}
      <BottomTab.Screen
        component={IncidentStackNavigator}
        name={'incidentsStack'}
        options={{
          tabBarButton: () => <Incident />,
        }}
      />
      {/* <BottomTab.Screen
        component={SOS}
        name={PROTECTED_ROUTES.SOS}
        options={{
          tabBarButton: () => <Incident />,
        }}
      /> */}
      <BottomTab.Screen
        component={MapStackNavigation}
        name={PROTECTED_ROUTES.MAP_STACK}
        options={{
          tabBarLabel: 'Map',
          tabBarLabelStyle: { fontSize: 14, fontWeight: '500' },
          tabBarIcon: ({ color, focused, size }) => <FontAwesome5 name='map-marked' size={24} color={focused ? COLORS.primary : '#333'} />,
        }}
      />
      <BottomTab.Screen
        component={Profile}
        name={PROTECTED_ROUTES.PROFILE}
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: { fontSize: 14, fontWeight: '500' },
          tabBarIcon: ({ color, focused, size }) => <FontAwesome5 name='user-alt' size={25} color={focused ? COLORS.primary : '#333'} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
