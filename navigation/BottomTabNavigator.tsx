import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import CdcScreen from '../screens/CdcScreen';
import FamilyScreen from '../screens/FamilyScreen';
import LabScreen from '../screens/LabScreen';
import PersonScreen from '../screens/PersonScreen';
import QrCodeScreen from '../screens/QrCodeScreen';
import SampleScreen from '../screens/SampleScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Person';

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Sample"
        component={SampleScreen}
        options={{
          title: 'Pair',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-link" />,
        }}
      />
      <BottomTab.Screen
        name="Lab"
        component={LabScreen}
        options={{
          title: 'Lab',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-flask" />,
        }}
      />
      <BottomTab.Screen
        name="Person"
        component={PersonScreen}
        options={{
          title: 'Myself',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />,
        }}
      />
      <BottomTab.Screen
        name="QR"
        component={QrCodeScreen}
        options={{
          title: 'QR Code',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-barcode" />,
        }}
      />
      <BottomTab.Screen
        name="Family"
        component={FamilyScreen}
        options={{
          title: 'Family',
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
    case 'Sample':
      return 'Pair Person to a TestKit';
    case 'Lab':
      return 'Lab Results';
    case 'Person':
      return 'My Health';
    case 'QR':
      return 'My QR Code';
    case 'Family':
      return 'My Family Health';
    case 'CDC':
      return 'CDC (Disease Experts)';
  }
}
