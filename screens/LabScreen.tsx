import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, Vibration, View, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

import BarcodeCamera from '../components/BarcodeCamera';
import { LabResult } from '../utils/LabResult';
import { post } from '../utils/Api';
import { generateEventInfo } from '../utils/Events';
import { t, tkeys } from '../utils/i18n';
import Layout from '../constants/Layout';
import Color from '../constants/Color';

export default function LabScreen() {
  const [testId, setTestId] = React.useState(t(tkeys.generic_TestIdPrompt));
  const [submittingLabResult, setSubmittingLabResult] = React.useState(LabResult.UNKNOWN)

  const handleBarCodeScanned = ({ type, data }) => {
    setTestId(data);
    Vibration.vibrate(250);
  };

  const submitResult = (labResult: LabResult) => {
    const resultEvent = {
      'eventInfo': generateEventInfo(),
      'testId': testId,
      'labResult': LabResult[labResult],
    }
    setSubmittingLabResult(labResult)
    setTestId(t(tkeys.generic_TestIdPrompt))
    post(`/v1/test/${testId}/result`, resultEvent, () => setSubmittingLabResult(LabResult.UNKNOWN))
  };

  return (
    <View style={styles.container}>
      <BarcodeCamera type={Camera.Constants.Type.front} onBarCodeScanned={handleBarCodeScanned} />
      <View style={styles.formView}>
        <Text style={styles.formDataText}>{t(tkeys.generic_TestKit)}: {testId}</Text>
        <View style={styles.resultButtonsView}>
          <TouchableOpacity style={[styles.resultButton, { backgroundColor: Color.notInfected }]}
              onPress={ () => submitResult(LabResult.NOT_INFECTED) }>
            <LabResultButtonIcon iconName='md-thumbs-up' isSubmitting={submittingLabResult === LabResult.NOT_INFECTED} />
            <Text style={styles.resultButtonText}>{t(tkeys.lab_NotInfected)}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.resultButton, { backgroundColor: Color.infected }]}
              onPress={ () => submitResult(LabResult.INFECTED) }>
            <LabResultButtonIcon iconName='md-thumbs-down' isSubmitting={submittingLabResult === LabResult.INFECTED} />
            <Text style={styles.resultButtonText}>{t(tkeys.lab_Infected)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function LabResultButtonIcon(props: { iconName: string, isSubmitting: boolean }) {
  if (props.isSubmitting) {
    return <ActivityIndicator color={Color.text} size='large' />;
  } else {
    return <Ionicons name={props.iconName} style={styles.resultButtonIcon} />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: Color.background,
  },
  formView: {
    alignItems: 'center',
    backgroundColor: Color.background,
  },
  formDataText: {
    color: Color.text,
    fontSize: Layout.fontSize,
  },
  resultButtonsView: {
    flexDirection: 'row',
  },
  resultButton: {
    flex: 1,
    padding: Layout.padding,
    margin: Layout.margin,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultButtonIcon: {
    color: Color.text,
    fontSize: Layout.largeIconSize,
  },
  resultButtonText: {
    color: Color.text,
    fontSize: Layout.fontSize,
  },
});
