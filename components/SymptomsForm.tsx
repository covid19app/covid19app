import * as React from 'react';
import { Image, ImageSourcePropType, ScrollView, Slider, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Color from '../constants/Color';
import Config from '../constants/Config';
import Layout from '../constants/Layout';
import { publishEvent } from '../utils/Events';
import { getCurrentLocale, t, temperatureToString, tkeys } from '../utils/i18n';
import { ExperimentalEventInfo, NextSteps, PersonSymptomsEvent } from '../utils/schema';
import ActionButton from './ActionButton';

interface SymptomsFormProps {
  personId: string
  onSubmitResponse?: (nextSteps: NextSteps) => void
}

export default function SymptomsForm(props: SymptomsFormProps) {
  const blankPersonSymptomsEvent = {
    personId: props.personId,
    feverInCelsius: Config.DEFAULT_TEMERATURE_IN_C
  } as PersonSymptomsEvent
  const [symptoms, setSymptoms] = React.useState(blankPersonSymptomsEvent)

  const submitPersonSymptomsEvent = async () => {
    const personSymptomsEvent: PersonSymptomsEvent & ExperimentalEventInfo = {
      ...symptoms,
      locale: getCurrentLocale(),
    }
    console.warn(personSymptomsEvent)
    const response = await publishEvent(`/v1/person/${props.personId}/symptoms`, personSymptomsEvent)
    console.warn(response)
    props.onSubmitResponse(response as NextSteps)
  }

  const toggle = (value?: number) => !value && 1.0 || undefined

  return (
    <View style={styles.container}>
      {/* <Text>{t(tkeys.symptoms_Tip)}</Text> */}
      <FeverInput feverInCelsius={symptoms.feverInCelsius}
              onChange={value => setSymptoms({...symptoms, feverInCelsius: value})} />
      <ScrollView style={styles.symptomScrollView}>
        <View style={styles.symptomContainer}>
          <SymptomButton iconSource={require('../assets/symptoms/cough.png')}
              titleTKey={tkeys.symptoms_DryCough} active={!!symptoms.dryCough}
              onPress={() => setSymptoms({...symptoms, dryCough: toggle(symptoms.dryCough)})} />
          <SymptomButton iconSource={require('../assets/symptoms/fatigue.png')}
              titleTKey={tkeys.symptoms_Fatigue}  active={!!symptoms.fatigue}
              onPress={() => setSymptoms({...symptoms, fatigue: toggle(symptoms.fatigue)})} />
          {/* <SymptomButton iconSource={require('../assets/symptoms/sputum_productiom.png')}
              titleTKey={tkeys.symptoms_SputumProduction} active={!!symptoms.sputumProduction}
              onPress={() => setSymptoms({...symptoms, sputumProduction: toggle(symptoms.sputumProduction)})} /> */}
          <SymptomButton iconSource={require('../assets/symptoms/shortness_of_breath.png')}
              titleTKey={tkeys.symptoms_ShortnessOfBreath} active={!!symptoms.shortnessOfBreath}
              onPress={() => setSymptoms({...symptoms, shortnessOfBreath: toggle(symptoms.shortnessOfBreath)})} />
          <SymptomButton iconSource={require('../assets/symptoms/muscle_pain.png')}
              titleTKey={tkeys.symptoms_MusclePainOrJointPain} active={!!symptoms.musclePainOrJointPain}
              onPress={() => setSymptoms(
                {...symptoms, musclePainOrJointPain: toggle(symptoms.musclePainOrJointPain)})} />
          <SymptomButton iconSource={require('../assets/symptoms/sore_throat.png')}
              titleTKey={tkeys.symptoms_SoreThroat} active={!!symptoms.soreThroat}
              onPress={() => setSymptoms({...symptoms, soreThroat: toggle(symptoms.soreThroat)})} />
          <SymptomButton iconSource={require('../assets/symptoms/headache.png')}
              titleTKey={tkeys.symptoms_Headache} active={!!symptoms.headache}
              onPress={() => setSymptoms({...symptoms, headache: toggle(symptoms.headache)})} />
          {/* <SymptomButton iconSource={require('../assets/symptoms/chills.png')}
              titleTKey={tkeys.symptoms_Chills} active={!!symptoms.chills}
              onPress={() => setSymptoms({...symptoms, chills: toggle(symptoms.chills)})} /> */}
        </View>
      </ScrollView>
      <ActionButton title={t(tkeys.generic_Submit)} onPress={submitPersonSymptomsEvent} />
    </View>
  )
}

interface SymptomButtonProps {
  iconSource: ImageSourcePropType
  titleTKey?: tkeys
  active: boolean
  onPress: () => void
}

function SymptomButton(props: SymptomButtonProps) {
  const activeBasedStyle = props.active && {backgroundColor: Color.infected} // || {backgroundColor: Color.notInfected}
  return (
    <TouchableOpacity style={[styles.symptomButton, activeBasedStyle]} onPress={props.onPress}>
      <Image source={props.iconSource} style={styles.symptomIcon} resizeMode='contain' />
      {props.titleTKey && <Text style={styles.symptomText}>{t(props.titleTKey)}</Text>}
    </TouchableOpacity>
  )
}

interface FeverInputProps {
  feverInCelsius: number
  onChange: (feverInCelsius: number) => void
}

function FeverInput(props: FeverInputProps) {
  // const [feverInCelsius, setFeverInCelsius] = React.useState(props.feverInCelsius)
  return (
    <View style={styles.feverContainer}>
      <SymptomButton iconSource={require('../assets/symptoms/fever.png')}
          active={props.feverInCelsius > Config.FEVER_THRESHOLD_IN_C} onPress={() => undefined} />
      <View style={styles.feverValueContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.feverText}>{t(tkeys.symptoms_Fever)} {temperatureToString(props.feverInCelsius)}</Text>
          {/* <TextInput keyboardType='numeric' style={styles.feverInput}
              value={feverInCelsius.toFixed(1)} onEndEditing={value => setFeverInCelsius(+value)} />
          <Text style={styles.feverText}> C</Text> */}
        </View>
        <Slider style={styles.feverSlider}
          minimumValue={Config.MIN_TEMERATURE_IN_C} maximumValue={Config.MAX_TEMPERATURE_IN_C}
          minimumTrackTintColor={Color.infected} maximumTrackTintColor={Color.notInfected}
          value={props.feverInCelsius} onValueChange={props.onChange} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
    flex: 1,
    flexDirection: 'column',
  },
  symptomScrollView: {
    flex: 1,
    flexGrow: 3,
  },
  symptomContainer: {
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  // SymtomButton
  symptomButton: {
    alignItems: 'center',
    flexDirection: 'column',
    height: 0.25 * Layout.innerSize,
    margin: Layout.margin,
    resizeMode: 'contain',
    width: Layout.columnWidth,
  },
  symptomIcon: {
    flex: 1,
    flexGrow: 3,
  },
  symptomText: {
    flex: 1,
    fontSize: Layout.fontSize,
  },

  // FeverInput
  feverContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    flexGrow: 1,
  },
  feverValueContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    margin: Layout.margin,
  },
  feverSlider: {
    marginTop: 2.0 * Layout.margin,
    transform: [{ scaleX: 2.0 }, { scaleY: 2.0 }],
    width: Layout.columnWidth / 2.0,
  },
  feverInput: {
    backgroundColor: Color.inputBackground,
    fontSize: Layout.fontSize,
  },
  feverText: {
    fontSize: Layout.fontSize,
  },
})
