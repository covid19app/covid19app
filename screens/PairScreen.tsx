import { Camera } from 'expo-camera';
import * as React from 'react';
import { StyleSheet, Text, Vibration, View } from 'react-native';
import { Grid, Row } from 'react-native-easy-grid';

import ActionButton from '../components/ActionButton';
import BarcodeCamera from '../components/BarcodeCamera';
import Color from '../constants/Color';
import Config from '../constants/Config';
import Layout from '../constants/Layout';
import { publishEvent } from '../utils/Events';
import { t, tkeys } from '../utils/i18n';
import { TestPairEvent } from '../utils/schema';

const personIdRegExp = new RegExp('.*\/person\/(.*)')
const testIdRegExp = new RegExp('(.*)')

export default function PairScreen() {
  const [personId, setPersonId] = React.useState(t(tkeys.generic_PersonIdPrompt))
  const [testId, setTestId] = React.useState(t(tkeys.generic_PersonIdPrompt))

  const handleBarCodeScanned = ({ type, data }) => {
    if (personIdRegExp.test(data)) {
      setPersonId(personIdRegExp.exec(data)[1])
      Vibration.vibrate(Config.BARCODE_SCAN_VIBRATION_DURATION_IN_MS)
    } else if (testIdRegExp.test(data)) {
      setTestId(testIdRegExp.exec(data)[1])
      Vibration.vibrate(Config.BARCODE_SCAN_VIBRATION_DURATION_IN_MS)
    }
  }

  const submitTestPair = async () => {
    const testPairEvent: TestPairEvent = { personId, testId }
    await publishEvent(`/v1/test/${testId}/pair`, testPairEvent)
    setPersonId(t(tkeys.generic_PersonIdPrompt))
    setTestId(t(tkeys.generic_TestIdPrompt))
  }

  return (
    <View style={styles.container}>
      <BarcodeCamera type={Camera.Constants.Type.back} onBarCodeScanned={handleBarCodeScanned} />
      <Grid style={styles.grid}>
        <Row>
          <Text numberOfLines={1} style={styles.text}>{t(tkeys.generic_Person)}: {personId}</Text>
        </Row>
        <Row>
          <Text numberOfLines={1} style={styles.text}>{t(tkeys.generic_TestKit)}: {testId}</Text>
        </Row>
        <Row>
          <View style={styles.submitButtonView}>
            <ActionButton info title={t(tkeys.generic_Submit)} onPress={submitTestPair} />
          </View>
        </Row>
      </Grid>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
    flex: 1,
  },
  grid: {
    alignItems: 'center',
    backgroundColor: Color.background,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  submitButtonView: {
    width: '100%',
  },
  text: {
    color: Color.text,
    fontSize: Layout.fontSize,
  },
})
