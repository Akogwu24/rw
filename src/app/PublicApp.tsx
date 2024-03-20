import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen, RegisterScreen, WelcomeScreen } from '../screens/auth';
import { ForgotPassword } from '../screens/auth/forgotPassword';
import { OnbordingScreens } from '../screens/auth/onboarding';
import { SuccessfulPasswordReset } from '../screens/auth/forgotPassword/SuccessfulPasswordReset';
import { PUBLIC_ROUTES } from './routes';

const Stack = createStackNavigator();

export function PublicApp() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={PUBLIC_ROUTES.WELCOME} component={WelcomeScreen} />
      <Stack.Screen name={PUBLIC_ROUTES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={PUBLIC_ROUTES.REGISTER} component={RegisterScreen} />
      <Stack.Screen name={PUBLIC_ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
      <Stack.Screen name={PUBLIC_ROUTES.ONBOARDING} component={OnbordingScreens} />
      <Stack.Screen name={PUBLIC_ROUTES.SUCCESSFULL_PASSWORD_RESET} component={SuccessfulPasswordReset} />
    </Stack.Navigator>
  );
}
