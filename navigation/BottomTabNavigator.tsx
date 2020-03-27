import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainerRef, useLinking as useLinkingRN } from '@react-navigation/native';
import { Linking } from 'expo';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import FamilyScreen from '../screens/FamilyScreen';
import HealthScreen from '../screens/HealthScreen';
import LabScreen from '../screens/LabScreen';
import NextStepsScreen from '../screens/NextStepsScreen';
import PairScreen from '../screens/PairScreen';
import QrCodeScreen from '../screens/QrCodeScreen';
import ResourcesScreen from '../screens/ResourcesScreen';
import { PersonEntityContext } from '../utils/Device';
import { t, tkeys } from '../utils/i18n';

const INITIAL_ROUTE_NAME = 'Health'

const BottomTab = createBottomTabNavigator()

function personalize(value: string): string {
  const { personEntity } = React.useContext(PersonEntityContext)
  return value.replace('$PERSON_NAME', personEntity?.name || t(tkeys.generic_DefaultPersonName))
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME

  switch (routeName) {
    case 'Pair':
      return t(tkeys.navigation_PairHeader)
    case 'Lab':
      return t(tkeys.navigation_LabHeader)
    case 'Health':
      return personalize(t(tkeys.navigation_HealthHeader))
    case 'NextSteps':
      return personalize(t(tkeys.navigation_NextStepsHeader))
    case 'QR':
      return personalize(t(tkeys.navigation_QRHeader))
    case 'Family':
      return t(tkeys.navigation_FamilyHeader)
    case 'Resources':
      return t(tkeys.navigation_ResourcesHeader)
  }
}

export function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) })

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name='Pair'
        component={PairScreen}
        options={{
          title: t(tkeys.navigation_PairIcon),
          tabBarIcon: (props) => <TabBarIcon {...props} name='md-link' />,
        }}
      />
      <BottomTab.Screen
        name='Lab'
        component={LabScreen}
        options={{
          title: t(tkeys.navigation_LabIcon),
          tabBarIcon: (props) => <TabBarIcon {...props} name='md-flask' />,
        }}
      />
      <BottomTab.Screen
        name='Health'
        component={HealthScreen}
        options={{
          title: personalize(t(tkeys.navigation_HealthIcon)),
          tabBarIcon: (props) => <TabBarIcon {...props} name='md-person' />,
        }}
      />
      <BottomTab.Screen
        name='NextSteps'
        component={NextStepsScreen}
        options={{
          title: personalize(t(tkeys.navigation_NextStepsIcon)),
          tabBarIcon: (props) => <TabBarIcon {...props} name='md-information-circle' />,
        }}
      />
      <BottomTab.Screen
        name='QR'
        component={QrCodeScreen}
        options={{
          title: personalize(t(tkeys.navigation_QRIcon)),
          tabBarIcon: (props) => <TabBarIcon {...props} name='md-barcode' />,
        }}
      />
      <BottomTab.Screen
        name='Family'
        component={FamilyScreen}
        options={{
          title: t(tkeys.navigation_FamilyIcon),
          tabBarIcon: (props) => <TabBarIcon {...props} name='md-people' />,
        }}
      />
      <BottomTab.Screen
        name='Resources'
        component={ResourcesScreen}
        options={{
          title: t(tkeys.navigation_ResourcesIcon),
          tabBarIcon: (props) => <TabBarIcon {...props} name='md-book' />,
        }}
      />
    </BottomTab.Navigator>
  )
}

export function useLinking(containerRef: React.RefObject<NavigationContainerRef>) {
  return useLinkingRN(containerRef, {
    prefixes: [
      Linking.makeUrl('/'),
      // 'https://covid19app.org',
      // 'covid19app://',
    ],
    config: {
      Root: {
        path: 'Root',
        screens: {
          'Pair': 'pair',
          'Lab': 'lab',
          'Health': 'health',
          'NextSteps': 'nextsteps',
          'QR': 'qr',
          'Family': 'family',
          'Resources': 'resources',
        },
      },
    },
  })
}
