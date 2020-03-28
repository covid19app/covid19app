import * as React from 'react';
import { Slider, StyleSheet, Text, View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';

import Color from '../constants/Color';
import Config from '../constants/Config';
import Layout from '../constants/Layout';
import { publishEvent } from '../utils/Events';
import { getCurrentLocale, t, temperatureToString, tkeys } from '../utils/i18n';
import { ExperimentalEventInfo, NextSteps, PersonSymptomsEvent } from '../utils/schema';
import ActionButton from './ActionButton';
import SymptomButton from './SymptomButton';

interface SymptomsFormProps {
  onSubmitResponse?: (nextSteps: NextSteps) => void
  personId: string
}

export default function PersonSymptomsForm(props: SymptomsFormProps) {
  const blankPersonSymptomsEvent = {
    personId: props.personId,
    feverInCelsius: Config.TEMERATURE_DEFAULT_IN_C,
  } as PersonSymptomsEvent
  const [symptoms, setSymptoms] = React.useState(blankPersonSymptomsEvent)

  const submitPersonSymptomsEvent = async () => {
    const personSymptomsEvent: PersonSymptomsEvent & ExperimentalEventInfo = {
      ...symptoms,
      locale: getCurrentLocale(),
    }
    const response = await publishEvent(`/v1/person/${props.personId}/symptoms`, personSymptomsEvent)
    props.onSubmitResponse(response as NextSteps)
  }

  const toggle = (value?: number) => !value && 1.0 || undefined

  return (
    <Grid>
      {/* <Row style={styles.col} size={0.25}>
        <Text style={{fontSize: Layout.smallFontSize}}>{t(tkeys.symptoms_Tip)}</Text>
      </Row> */}
      <Row style={styles.row} size={0.8}>
        <Col style={styles.col}>
          <SymptomButton imageSource={require('../assets/symptoms/fever.png')}
              active={symptoms.feverInCelsius > Config.TEMERATURE_FEVER_IN_C} />
        </Col>
        <Col style={styles.col}>
          <Row size={0.5} />
          <Row style={styles.row}>
            <Text style={styles.feverText}>
              {t(tkeys.symptoms_Fever)} {temperatureToString(symptoms.feverInCelsius)}
            </Text>
            {/* <TextInput keyboardType='numeric' style={styles.feverInput}
                value={symptoms.feverInCelsius.toFixed(1)} onEndEditing={value => setFeverInCelsius(+value)} />
            <Text style={styles.feverText}> C</Text> */}
          </Row>
          <Row style={styles.row}>
            <Slider style={styles.feverSlider}
              minimumValue={Config.TEMERATURE_MIN_IN_C} maximumValue={Config.TEMERATURE_MAX_IN_C}
              minimumTrackTintColor={Color.infected} maximumTrackTintColor={Color.notInfected}
              value={symptoms.feverInCelsius}
              onValueChange={value => setSymptoms({...symptoms, feverInCelsius: value})} />
          </Row>
          <Row size={0.5} />
        </Col>
      </Row>
      <Row style={styles.row}>
        <Col style={styles.col}>
          <SymptomButton imageSource={require('../assets/symptoms/cough.png')}
              title={t(tkeys.symptoms_DryCough)} active={!!symptoms.dryCough}
              onPress={() => setSymptoms({...symptoms, dryCough: toggle(symptoms.dryCough)})} />
        </Col>
        <Col style={styles.col}>
          <SymptomButton imageSource={require('../assets/symptoms/fatigue.png')}
              title={t(tkeys.symptoms_Fatigue)}  active={!!symptoms.fatigue}
              onPress={() => setSymptoms({...symptoms, fatigue: toggle(symptoms.fatigue)})} />
        </Col>
      </Row>
      <Row style={styles.row}>
        <Col style={styles.col}>
          <SymptomButton imageSource={require('../assets/symptoms/shortness_of_breath.png')}
              title={t(tkeys.symptoms_ShortnessOfBreath)} active={!!symptoms.shortnessOfBreath}
              onPress={() => setSymptoms({...symptoms, shortnessOfBreath: toggle(symptoms.shortnessOfBreath)})} />
        </Col>
        <Col style={styles.col}>
          <SymptomButton imageSource={require('../assets/symptoms/muscle_pain.png')}
              title={t(tkeys.symptoms_MusclePainOrJointPain)} active={!!symptoms.musclePainOrJointPain}
              onPress={() => setSymptoms(
                {...symptoms, musclePainOrJointPain: toggle(symptoms.musclePainOrJointPain)})} />
        </Col>
      </Row>
      <Row style={styles.row}>
        <Col style={styles.col}>
          <SymptomButton imageSource={require('../assets/symptoms/sore_throat.png')}
              title={t(tkeys.symptoms_SoreThroat)} active={!!symptoms.soreThroat}
              onPress={() => setSymptoms({...symptoms, soreThroat: toggle(symptoms.soreThroat)})} />
        </Col>
        <Col style={styles.col}>
          <SymptomButton imageSource={require('../assets/symptoms/headache.png')}
              title={t(tkeys.symptoms_Headache)} active={!!symptoms.headache}
              onPress={() => setSymptoms({...symptoms, headache: toggle(symptoms.headache)})} />
        </Col>
      </Row>
      <Row style={styles.col} size={0.7}>
        <View style={StyleSheet.absoluteFill}>
          <ActionButton title={t(tkeys.generic_Submit)} onPress={submitPersonSymptomsEvent} />
        </View>
      </Row>
    </Grid>
  )
}

const styles = StyleSheet.create({
  col: {
    alignItems: 'center',
  },
  feverSlider: {
    transform: [{ scaleX: 2.0 }, { scaleY: 2.0 }],
    width: 1.2 * Layout.columnWidth / 2.0,
  },
  feverText: {
    fontSize: Layout.fontSize,
  },
  row: {
    alignItems: 'center',
  },
})
