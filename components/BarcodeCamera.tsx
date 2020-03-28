import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import { Props as CameraProps } from 'expo-camera/build/Camera.types';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Layout from '../constants/Layout';
import { t, tkeys } from '../utils/i18n';

interface BarcodeCameraProps extends CameraProps {
}

export default function BarcodeCamera(props: BarcodeCameraProps) {
  const [hasPermission, setHasPermission] = React.useState(null)
  const [cameraType, setCameraType] = React.useState(props.type)
  const isFocused = useIsFocused()

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const reverseCameraHandler = () => {
    if (cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front)
    }
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back)
    }
  }

  if (hasPermission === null) {
    return <Text>{t(tkeys.generic_CameraRequestingPermissions)}</Text>
  }
  if (hasPermission === false) {
    return <Text>{t(tkeys.generic_CameraMissingPermissions)}</Text>
  }

  if (isFocused) {
    return (
      <View style={StyleSheet.absoluteFill}>
        <Camera
          {...props}
          useCamera2Api={true}
          autoFocus={false}
          focusDepth={0.95}
          style={StyleSheet.absoluteFill}
          type={cameraType}
        />
        <TouchableOpacity style={styles.reverseButton} onPress={reverseCameraHandler}>
          <Ionicons name='md-reverse-camera' style={styles.reverseIcon} />
        </TouchableOpacity>
      </View>
    )
  } else {
    return <View />
  }
}

const styles = StyleSheet.create({
  reverseButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  reverseIcon: {
    color: '#fff',
    fontSize: Layout.hugeFontSize,
    margin: Layout.margin,
    padding: Layout.padding,
  },
})
