import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

import { post } from '../utils/Api';
import { generateEventInfo } from '../utils/Events';
import SubmitButton from '../components/SubmitButton';

const personIdRegExp = new RegExp('.*\/v1\/person\/(.*)')
const testIdRegExp = new RegExp('(.*)')

const defaultPersonIdText = "Scan the code please!"
const defaultTestIdText = "Scan the code please!"

export default function SampleScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [personId, setPersonId] = useState(defaultPersonIdText);
  const [testId, setTestId] = useState(defaultTestIdText);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (personIdRegExp.test(data)) {
      setPersonId(personIdRegExp.exec(data)[1]);
      Vibration.vibrate(250);
    }
    if (testIdRegExp.test(data)) {
      setTestId(testIdRegExp.exec(data)[1]);
      Vibration.vibrate(250);
    }
  };

  const submitTestPair = () => {
    const testPairEvent = {
      'eventInfo': generateEventInfo(personId),
      'testId': testId,
      'personId': personId
    }
    setPersonId(defaultPersonIdText)
    setTestId(defaultTestIdText)
    post(`/v1/test/${testId}/pair`, testPairEvent)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera! Please allow it!</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        type={cameraType}
        useCamera2Api={true}
        autoFocus={false}
        focusDepth={0.95}
        style={StyleSheet.absoluteFill}
        onBarCodeScanned={handleBarCodeScanned}
      />

      <View style={styles.lastScannedView}>
        <Text style={styles.lastScannedText}>Person: {personId}</Text>
        <Text style={styles.lastScannedText}>TestKit: {testId}</Text>
        <SubmitButton onPress={() => submitTestPair()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  lastScannedView: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  lastScannedText: {
    color: '#000',
    fontSize: 20,
  },
});
