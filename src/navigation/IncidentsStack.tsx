import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PROTECTED_ROUTES } from '../app/routes';
import { ReportIncident } from '../screens/incidents/screens/ReportIncident';
import { DetailedIncidentReport } from '../screens/incidents/screens/DetailedIncidentReport';
import { CaptureLiveIncident } from '../screens/incidents/screens/CaptureLiveIncident';
import { WelcomeDsva } from '../screens/dsva/WelcomeDsva';
import { QuestionOne } from '../screens/dsva/QuestionOne';
import { QuestionsTwo } from '../screens/dsva/QuestionTwo';
import { QuestionsThree } from '../screens/dsva/QuestionThree';
import { QuestionsFour } from '../screens/dsva/QuestionFour';
import { QuestionsFive } from '../screens/dsva/QuestionFive';

const IncidentStack = createStackNavigator();

export function IncidentStackNavigator() {
  return (
    <IncidentStack.Navigator screenOptions={{ headerShown: false }}>
      <IncidentStack.Screen options={{ headerShown: false }} name={PROTECTED_ROUTES.REPORT_INCIDENT} component={ReportIncident} />
      <IncidentStack.Screen options={{ headerShown: false }} name={PROTECTED_ROUTES.DETAILED_INCICENT_REPORT} component={DetailedIncidentReport} />
      <IncidentStack.Screen options={{ headerShown: false }} component={CaptureLiveIncident} name={PROTECTED_ROUTES.CAPTURE_LIVE_INCIDENT} />
      <IncidentStack.Screen options={{ headerShown: false }} name={PROTECTED_ROUTES.DSVA_WELCOME} component={WelcomeDsva} />
      {/* <IncidentStack.Screen options={{ headerShown: false }} name={PROTECTED_ROUTES.VIOLENCE_DETAILS} component={ViolenceDetails} /> */}
      <IncidentStack.Screen name={PROTECTED_ROUTES.QUESTION_ONE} component={QuestionOne} />
      <IncidentStack.Screen name={PROTECTED_ROUTES.QUESTION_TWO} component={QuestionsTwo} />
      <IncidentStack.Screen name={PROTECTED_ROUTES.QUESTION_THREE} component={QuestionsThree} />
      <IncidentStack.Screen name={PROTECTED_ROUTES.QUESTION_FOUR} component={QuestionsFour} />
      <IncidentStack.Screen name={PROTECTED_ROUTES.QUESTION_FIVE} component={QuestionsFive} />
      {/* <IncidentStack.Screen name={PROTECTED_ROUTES.QUESTION_SIX} component={QuestionsSix} /> */}
    </IncidentStack.Navigator>
  );
}
