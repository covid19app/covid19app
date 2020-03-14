import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import CdcScreen from '../screens/CdcScreen';
import FamilyScreen from '../screens/FamilyScreen';
import LabScreen from '../screens/LabScreen';
import MeScreen from '../screens/MeScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Me';

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Lab"
        component={LabScreen}
        options={{
          title: 'Lab',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-flask" />,
        }}
      />
      <BottomTab.Screen
        name="Me"
        component={MeScreen}
        options={{
          title: 'My Health',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />,
        }}
      />
      <BottomTab.Screen
        name="Family"
        component={FamilyScreen}
        options={{
          title: 'My Family',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-people" />,
        }}
      />
      <BottomTab.Screen
        name="CDC"
        component={CdcScreen}
        options={{
          title: 'CDC',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Lab':
      return 'Lab Results';
    case 'Me':
      return 'My Health';
    case 'Family':
      return 'My Family Health';
    case 'CDC':
      return 'CDC (Disease Experts)';
  }
}
