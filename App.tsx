import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from 'expo';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';

import Color from './constants/Color';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import WelcomeScreen from './screens/WelcomeScreen';
import { DeviceInfo, getDeviceInfo, loadOrCreateDeviceInfo, PersonIdContext, saveDeviceInfo } from './utils/Device';
import { generatePersonId } from './utils/Ids';
import { registerForPushNotificationsAsync } from './utils/Notifications';

const Stack = createStackNavigator()

interface AppProps {
  skipLoadingScreen?: boolean
}

export default function App(props: AppProps) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false)
  const [initialState, setInitialState] = React.useState(undefined)
  const [personId, setPersonId] = React.useState<string>()
  const containerRef = React.useRef<NavigationContainerRef>()
  const { getInitialState } = useLinking(containerRef)

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide()
        const [initialNavigationState, fonts, deviceInfo] = await Promise.all([
          getInitialState(),
          Font.loadAsync({
            ...Ionicons.font,
          }),
          loadOrCreateDeviceInfo(),
        ])
        setInitialState(initialNavigationState)
        setPersonId(deviceInfo?.defaultPersonId)
      } catch (error) {
        // We might want to provide this error information to an error reporting service
        console.warn(error)
      } finally {
        setLoadingComplete(true)
        SplashScreen.hide()
      }
    }

    loadResourcesAndDataAsync()
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null
  }

  if (!personId) {
    const freshPersonId = generatePersonId()
    const handleProfileSubmit = async () => {
      const updatedDeviceInfo: DeviceInfo = {...getDeviceInfo(), defaultPersonId: freshPersonId}
      setPersonId(freshPersonId)
      saveDeviceInfo(updatedDeviceInfo)
    }
    return (
      <WelcomeScreen personId={freshPersonId} onSubmit={handleProfileSubmit} onSkip={handleProfileSubmit} />
    )
  }

  registerForPushNotificationsAsync()

  return (
    <PersonIdContext.Provider value={personId}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
        <NavigationContainer ref={containerRef} initialState={initialState}>
          <Stack.Navigator>
            <Stack.Screen name='Root' component={BottomTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </PersonIdContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: Color.background,
  },
})
