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
import { BigImageButton, BigImageButtonProps } from './BigImageButton';

interface SymptomsFormProps {
  onSubmitResponse?: (nextSteps: NextSteps) => void
  personId: string
}

export default function PersonSymptomsForm(props: SymptomsFormProps) {
  const blankPersonSymptomsEvent = {
    personId: props.personId,
    feverInCelsius: Config.TEMERATURE_DEFAULT_IN_C,
  } as PersonSymptomsEvent
  const [symptoms, setSymptoms] = React.useState<PersonSymptomsEvent>(blankPersonSymptomsEvent)

  React.useEffect(() => setSymptoms(blankPersonSymptomsEvent), [props.personId])

  const submitPersonSymptomsEvent = async () => {
    const personSymptomsEvent: PersonSymptomsEvent & ExperimentalEventInfo = {
      ...symptoms,
      locale: getCurrentLocale(),
    }
    const response = await publishEvent(`/v1/person/${props.personId}/symptoms`, personSymptomsEvent)
    setSymptoms(blankPersonSymptomsEvent)
    props.onSubmitResponse(response as NextSteps)
  }

  const toggle = (value?: number) => !value && 1.0 || undefined

  return (
    <Grid>
      {/* <Row style={styles.row} size={0.25}>
        <Text style={{fontSize: Layout.smallFontSize}}>{t(tkeys.symptoms_Tip)}</Text>
      </Row> */}
      <Row style={styles.row} size={0.8}>
        <Col style={styles.col}>
          <SymptomButton
              active={symptoms.feverInCelsius > Config.TEMERATURE_FEVER_IN_C}
              imageSource={require('../assets/symptoms/fever.png')}
              tip={t(tkeys.symptoms_TemperatureTip)}
          />
        </Col>
        <Col style={styles.col}>
          <Row size={0.4} />
          <Row style={styles.row}>
            <Text numberOfLines={1} ellipsizeMode='head' style={styles.text}>
              {t(tkeys.symptoms_Temperature)} {temperatureToString(symptoms.feverInCelsius)}
            </Text>
            {/* <TextInput keyboardType='numeric' style={styles.temperatureInput}
                value={symptoms.feverInCelsius.toFixed(1)} onEndEditing={value => setFeverInCelsius(+value)} />
            <Text style={styles.temperatureText}> C</Text> */}
          </Row>
          <Row style={styles.row}>
            <Slider style={styles.temperatureSlider}
              minimumValue={Config.TEMERATURE_MIN_IN_C} maximumValue={Config.TEMERATURE_MAX_IN_C}
              minimumTrackTintColor={Color.infected} maximumTrackTintColor={Color.notInfected}
              value={symptoms.feverInCelsius}
              onValueChange={value => setSymptoms({...symptoms, feverInCelsius: value})} />
          </Row>
          <Row size={0.4} />
        </Col>
      </Row>
      <Row style={styles.row}>
        <Col style={styles.col}>
          <SymptomButton
              active={!!symptoms.dryCough}
              imageSource={require('../assets/symptoms/cough.png')}
              onPress={() => setSymptoms({...symptoms, dryCough: toggle(symptoms.dryCough)})}
              tip={t(tkeys.symptoms_CoughTip)}
              title={t(tkeys.symptoms_Cough)}
          />
        </Col>
        <Col style={styles.col}>
          <SymptomButton
              active={!!symptoms.fatigue}
              imageSource={require('../assets/symptoms/fatigue.png')}
              onPress={() => setSymptoms({...symptoms, fatigue: toggle(symptoms.fatigue)})}
              tip={t(tkeys.symptoms_FatigueTip)}
              title={t(tkeys.symptoms_Fatigue)}
          />
        </Col>
      </Row>
      <Row style={styles.row}>
        <Col style={styles.col}>
          <SymptomButton
              active={!!symptoms.shortnessOfBreath}
              imageSource={require('../assets/symptoms/shortness_of_breath.png')}
              onPress={() => setSymptoms({...symptoms, shortnessOfBreath: toggle(symptoms.shortnessOfBreath)})}
              title={t(tkeys.symptoms_ShortnessOfBreath)}
          />
        </Col>
        <Col style={styles.col}>
          <SymptomButton
              active={!!symptoms.musclePainOrJointPain}
              imageSource={require('../assets/symptoms/muscle_pain.png')}
              onPress={() => setSymptoms(
                {...symptoms, musclePainOrJointPain: toggle(symptoms.musclePainOrJointPain)})}
              title={t(tkeys.symptoms_MusclePain)}
            />
        </Col>
      </Row>
      <Row style={styles.row}>
        <Col style={styles.col}>
          <SymptomButton
              active={!!symptoms.soreThroat}
              imageSource={require('../assets/symptoms/sore_throat.png')}
              onPress={() => setSymptoms({...symptoms, soreThroat: toggle(symptoms.soreThroat)})}
              title={t(tkeys.symptoms_SoreThroat)}
          />
        </Col>
        <Col style={styles.col}>
          <SymptomButton
              active={!!symptoms.headache}
              imageSource={require('../assets/symptoms/headache.png')}
              onPress={() => setSymptoms({...symptoms, headache: toggle(symptoms.headache)})}
              title={t(tkeys.symptoms_Headache)}
          />
        </Col>
      </Row>
      <Row style={styles.row} size={0.7}>
        <View style={StyleSheet.absoluteFill}>
          <ActionButton info title={t(tkeys.generic_Submit)} onPress={submitPersonSymptomsEvent} />
        </View>
      </Row>
    </Grid>
  )
}

interface SymptomButtonProps extends BigImageButtonProps {
  active: boolean
  tip?: string
}

function SymptomButton(props: SymptomButtonProps) {
  const backgroundColor = props.active ? Color.infected : Color.iconHidden // || Color.notInfected
  return <BigImageButton backgroundColor={backgroundColor} {...props} />
}

const styles = StyleSheet.create({
  col: {
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
  },
  temperatureSlider: {
    transform: [{ scaleX: 2.0 }, { scaleY: 2.0 }],
    width: 1.2 * Layout.columnWidth / 2.0,
  },
  text: {
    fontSize: Layout.fontSize,
  },
  tipTitleText: {
    fontSize: Layout.bigFontSize,
  },
})
