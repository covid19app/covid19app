import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

import { post } from '../utils/Api';
import { generateEventInfo, generatePersonId } from '../utils/Events';

const personId = generatePersonId()

export default function LabScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [testId, setTestId] = useState("Scan a testkit code please!");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setTestId(data);
    Vibration.vibrate(250);
  };

  const submitLabResult = (labResult: string) => {
    const resultEvent = {
      'eventInfo': generateEventInfo(personId),
      'testId': testId,
      'labResult': labResult
    }
    post(`/v1/test/${testId}/result`, resultEvent)
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
        <Text style={styles.lastScannedText}>{testId}</Text>
      </View>
      <View style={styles.resultButtonsView}>
        <TouchableOpacity style={[styles.resultButton, styles.healthyButton]} onPress={() => submitLabResult('NOT_INFECTED')}>
          <Ionicons name="md-thumbs-up" style={styles.resultButtonIcon} size={60} />
          <Text style={styles.resultButtonText}>HEALTHY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.resultButton, styles.sickButton]} onPress={() => submitLabResult('INFECTED')}>
          <Ionicons name="md-thumbs-down" style={styles.resultButtonIcon} size={60} />
          <Text style={styles.resultButtonText}>SICK</Text>
        </TouchableOpacity>
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
  resultButtonsView: {
    padding: 5,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  resultButton: {
    flex: 1,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultButtonIcon: {
    color: '#000',
  },
  resultButtonText: {
    color: '#000',
    fontSize: 20,
  },
  healthyButton: {
    backgroundColor: '#8f8',
  },
  sickButton: {
    backgroundColor: '#f88',
  },
});
