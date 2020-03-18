import * as React from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import { loadOrCreateDeviceId, generatePersonId } from './utils/Events';
import { loadDefaultPersonId, saveDefaultPersonId, PersonIdContext } from './utils/People';
import WelcomeScreen from './screens/WelcomeScreen';

import Color from './constants/Color';

const Stack = createStackNavigator();

interface AppProps {
  skipLoadingScreen: boolean
}

export default function App(props: AppProps) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState(undefined);
  const [personId, setPersonId] = React.useState<string>();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
        });

        // Load our data
        await loadOrCreateDeviceId()
        setPersonId(await loadDefaultPersonId())
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  }

  if (!personId) {
    const freshPersonId = generatePersonId()
    const handleProfileSubmit = () => {
      saveDefaultPersonId(freshPersonId)
      setPersonId(freshPersonId)
    }
    return (
      <WelcomeScreen personId={freshPersonId} onSubmitResponse={handleProfileSubmit} />
    );
  }

  return (
    <PersonIdContext.Provider value={personId}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </PersonIdContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
});
