import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import Color from './constants/Color';
import { BottomTabNavigator, useLinking } from './navigation/BottomTabNavigator';
import WelcomeScreen from './screens/WelcomeScreen';
import { createFreshPersonEntity, getDeviceEntity, loadOrCreateDeviceEntity, loadPersonEntity, PersonEntityContext,
    saveDeviceEntity } from './utils/Device';
import { addNotificationListener, registerForPushNotificationsAsync } from './utils/Notifications';
import { DeviceEntity, PersonEntity } from './utils/schema';

const Stack = createStackNavigator()

interface AppProps {
  skipLoadingScreen?: boolean
}

export default function App(props: AppProps) {
  const [isLoadingComplete, setLoadingComplete] = React.useState<boolean>(false)
  const [initialState, setInitialState] = React.useState(undefined)
  const [personEntity, setPersonEntity] = React.useState<PersonEntity>()
  const containerRef = React.useRef<NavigationContainerRef>()
  const { getInitialState } = useLinking(containerRef)

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide()
        const [initialNavigationState, fonts, deviceEntity] = await Promise.all([
          getInitialState(),
          Font.loadAsync({
            ...Ionicons.font,
          }),
          loadOrCreateDeviceEntity(),
        ])
        if (deviceEntity.defaultPersonId) {
          setPersonEntity(await loadPersonEntity(deviceEntity.defaultPersonId))
        }
        setInitialState(initialNavigationState)
        registerForPushNotificationsAsync()
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

  if (!personEntity) {
    const freshPersonEntity = createFreshPersonEntity()
    const handleProfileSubmit = async (form: PersonEntity) => {
      const updatedDeviceEntity: DeviceEntity = {...getDeviceEntity(), defaultPersonId: freshPersonEntity.personId}
      saveDeviceEntity(updatedDeviceEntity)
      setPersonEntity(form)
    }
    return <WelcomeScreen personEntity={freshPersonEntity} onSubmit={handleProfileSubmit} />
  }

  const root = (
    <PersonEntityContext.Provider value={{personEntity, setPersonEntity}}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
        <NavigationContainer ref={containerRef} initialState={initialState}>
          <Stack.Navigator>
            <Stack.Screen name='Root' component={BottomTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </PersonEntityContext.Provider>
  )

  // TODO: Solve the race condition better?
  addNotificationListener(n => {
    containerRef.current?.navigate('NextSteps', { nextSteps: n.data })
  })

  return root
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
    flex: 1,
  },
})
