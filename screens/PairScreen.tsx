import { Camera } from 'expo-camera';
import * as React from 'react';
import { StyleSheet, Text, Vibration, View } from 'react-native';

import ActionButton from '../components/ActionButton';
import BarcodeCamera from '../components/BarcodeCamera';
import Color from '../constants/Color';
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
      Vibration.vibrate(250)
    }
    if (testIdRegExp.test(data)) {
      setTestId(testIdRegExp.exec(data)[1])
      Vibration.vibrate(250)
    }
  }

  const submitTestPair = async () => {
    const testPairEvent: TestPairEvent = { personId, testId }
    setPersonId(t(tkeys.generic_PersonIdPrompt))
    setTestId(t(tkeys.generic_TestIdPrompt))
    await publishEvent(`/v1/test/${testId}/pair`, testPairEvent)
  }

  return (
    <View style={styles.container}>
      <BarcodeCamera type={Camera.Constants.Type.back} onBarCodeScanned={handleBarCodeScanned} />
      <View style={styles.formView}>
        <Text style={styles.formDataText}>{t(tkeys.generic_Person)}: {personId}</Text>
        <Text style={styles.formDataText}>{t(tkeys.generic_TestKit)}: {testId}</Text>
        <View style={styles.submitButtonView}>
          <ActionButton title={t(tkeys.generic_Submit)} onPress={submitTestPair} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  formView: {
    alignItems: 'center',
    backgroundColor: Color.background,
  },
  formDataText: {
    color: Color.text,
    fontSize: Layout.fontSize,
  },
  submitButtonView: {
    width: '100%',
  }
})
