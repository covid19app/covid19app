import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBarIcon from '../components/TabBarIcon';
import PairScreen from '../screens/PairScreen';
import LabScreen from '../screens/LabScreen';
import PersonScreen from '../screens/PersonScreen';
import QrCodeScreen from '../screens/QrCodeScreen';
import FamilyScreen from '../screens/FamilyScreen';
import CdcScreen from '../screens/CdcScreen';

const INITIAL_ROUTE_NAME = 'Person';

const BottomTab = createBottomTabNavigator();

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME

  switch (routeName) {
    case 'Pair':
      return "Pair Person to a TestKit"
    case 'Lab':
      return "Lab Results"
    case 'Person':
      return "My Health"
    case 'QR':
      return "My QR Code"
    case 'Family':
      return "My Family Health"
    case 'CDC':
      return "CDC (Disease Experts)"
  }
}

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name='Pair'
        component={PairScreen}
        options={{
          title: "Pair",
          tabBarIcon: (props) => <TabBarIcon {...props} name='md-link' />,
        }}
      />
      <BottomTab.Screen
        name='Lab'
        component={LabScreen}
        options={{
          title: "Lab",
          tabBarIcon: (props) => <TabBarIcon {...props} name='md-flask' />,
        }}
      />
      <BottomTab.Screen
        name='Person'
        component={PersonScreen}
        options={{
          title: "Myself",
          tabBarIcon: (props) => <TabBarIcon {...props} name='md-person' />,
        }}
      />
      <BottomTab.Screen
        name='QR'
        component={QrCodeScreen}
        options={{
          title: "QR Code",
          tabBarIcon: (props) => <TabBarIcon {...props} name='md-barcode' />,
        }}
      />
      <BottomTab.Screen
        name='Family'
        component={FamilyScreen}
        options={{
          title: "Family",
          tabBarIcon: (props) => <TabBarIcon {...props} name='md-people' />,
        }}
      />
      <BottomTab.Screen
        name='CDC'
        component={CdcScreen}
        options={{
          title: "CDC",
          tabBarIcon: (props) => <TabBarIcon {...props} name='md-book' />,
        }}
      />
    </BottomTab.Navigator>
  );
}
