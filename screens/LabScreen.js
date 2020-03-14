import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

export default function LabScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [isScanning, setScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState("Start scanning please!");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanning(true);
    setTimeout(() => setScanning(false), 1000);
    setLastScanned(data);
    setTimeout(() => setLastScanned("N/A"), 5000);
    Vibration.vibrate(250);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        type={cameraType}
        useCamera2Api={true}
        autoFocus={false}
        focusDepth={0.95}
        style={StyleSheet.absoluteFill}
        onBarCodeScanned={isScanning ? undefined : handleBarCodeScanned}
      />

      <View style={styles.lastScannedView}>
        <Text style={styles.lastScannedText}>{lastScanned}</Text>
      </View>
      <View style={styles.resultButtonsView}>
        <TouchableOpacity style={[styles.resultButton, styles.healthyButton]} onPress={() => Alert.alert(':)')}>
          <Ionicons name="md-thumbs-up" style={styles.resultButtonIcon} size={60} />
          <Text style={styles.resultButtonText}>HEALTHY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.resultButton, styles.sickButton]} onPress={() => Alert.alert(':(')}>
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
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    flexDirection: 'row',
  },
});

