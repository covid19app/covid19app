import { Camera } from 'expo-camera';
import * as React from 'react';
import { StyleSheet, Text, Vibration, View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';

import BarcodeCamera from '../components/BarcodeCamera';
import { BigImageButton } from '../components/BigImageButton';
import Color from '../constants/Color';
import Config from '../constants/Config';
import Layout from '../constants/Layout';
import { publishEvent } from '../utils/Events';
import { t, tkeys } from '../utils/i18n';
import { LabResult, TestResultEvent } from '../utils/schema';

export default function LabScreen() {
  const [testId, setTestId] = React.useState(t(tkeys.generic_TestIdPrompt));
  const [submittingLabResult, setSubmittingLabResult] = React.useState(LabResult.UNKNOWN)

  const handleBarCodeScanned = ({ type, data }) => {
    setTestId(data)
    Vibration.vibrate(Config.BARCODE_SCAN_VIBRATION_DURATION_IN_MS)
  }

  const submitTestResult = async (labResult: LabResult) => {
    const testResultEvent: TestResultEvent = { testId, labResult }
    setSubmittingLabResult(labResult)
    const response = await publishEvent(`/v1/test/${testId}/result`, testResultEvent)
    // TODO: Better error handling!
    if ((response as string).match(/OK/)) {
      setTestId(t(tkeys.generic_TestIdPrompt))
    } else {
      setTestId(response as string)
    }
    setSubmittingLabResult(LabResult.UNKNOWN)
  }

  return (
    <View style={styles.container}>
      <BarcodeCamera type={Camera.Constants.Type.front} onBarCodeScanned={handleBarCodeScanned} />
      <Grid style={styles.grid}>
        <Row>
          <Text style={styles.text}>{t(tkeys.generic_TestKit)}: {testId}</Text>
        </Row>
        <Row>
          <Col>
            <BigImageButton
                backgroundColor={Color.notInfected}
                imageSource={require('../assets/virus_blocked.png')}
                isInProgress={submittingLabResult === LabResult.NOT_INFECTED}
                onPress={() => submitTestResult(LabResult.NOT_INFECTED)}
                title={t(tkeys.lab_NotInfected)}
            />
          </Col>
          <Col>
            <BigImageButton
                backgroundColor={Color.infected}
                imageSource={require('../assets/virus.png')}
                isInProgress={submittingLabResult === LabResult.INFECTED}
                onPress={() => submitTestResult(LabResult.INFECTED)}
                title={t(tkeys.lab_Infected)}
            />
          </Col>
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
  text: {
    color: Color.text,
    fontSize: Layout.fontSize,
  },
})
