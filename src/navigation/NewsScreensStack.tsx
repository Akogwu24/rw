import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import News from '../screens/news';
import { SingleNewsFullDetails } from '../screens/news/components/SingleNewsFullDetails';
import BottomNavigation from './BottomNavigation';
import { PROTECTED_ROUTES } from '../app/routes';

const NewStack = createStackNavigator();

export const NewsScreensStack = () => {
  return (
    <NewStack.Navigator screenOptions={{ headerShown: false }}>
      <NewStack.Screen name={PROTECTED_ROUTES.NEWS} component={News} />
      {/* <NewStack.Screen name={'FullNewsDetails'} component={SingleNewsFullDetails} /> */}
    </NewStack.Navigator>
  );
};
