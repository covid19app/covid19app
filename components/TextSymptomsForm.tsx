import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Color from '../constants/Color';
import Layout from '../constants/Layout';
import { publishEvent } from '../utils/Events';
import { getCurrentLocale, t, tkeys } from '../utils/i18n';
import { ExperimentalEventInfo, NextSteps, PersonSymptomsEvent } from '../utils/schema';
import ActionButton from './ActionButton';
import FeverSlider from './FeverSlider';
import SymptomSwitch from './SymptomSwitch';

interface TextSymptomsFormProps {
  personId: string
  onSubmitResponse?: (nextSteps: NextSteps) => void
}

export default function TextSymptomsForm(props: TextSymptomsFormProps) {
  const blankPersonSymptomsEvent = {personId: props.personId, feverInCelsius: 37.0} as PersonSymptomsEvent
  const [symptoms, setSymptoms] = React.useState(blankPersonSymptomsEvent)

  const submitPersonSymptomsEvent = async () => {
    const personSymptomsEvent: PersonSymptomsEvent & ExperimentalEventInfo = {
      ...symptoms,
      locale: getCurrentLocale(),
    }
    const response = await publishEvent(`/v1/person/${props.personId}/symptoms`, personSymptomsEvent)
    props.onSubmitResponse(response as NextSteps)
  }

  return (
    <View style={styles.container}>
      <Text>{t(tkeys.symptoms_Tip)}</Text>
      <ScrollView style={styles.symptomContainer}>
        <FeverSlider feverInCelsius={symptoms.feverInCelsius}
            onValueChange={valueInC => setSymptoms({...symptoms, feverInCelsius: valueInC})} />
        <SymptomSwitch title={t(tkeys.symptoms_DryCough)} tip={t(tkeys.symptoms_DryCoughTip)}
            value={!!symptoms.dryCough} onValueChange={value => setSymptoms({...symptoms, dryCough: +value})} />
        <SymptomSwitch title={t(tkeys.symptoms_Fatigue)} tip={t(tkeys.symptoms_FatigueTip)}
            value={!!symptoms.fatigue} onValueChange={value => setSymptoms({...symptoms, fatigue: +value})} />
        <SymptomSwitch title={t(tkeys.symptoms_SputumProduction)} tip={t(tkeys.symptoms_SputumProductionTip)}
            value={!!symptoms.sputumProduction}
            onValueChange={value => setSymptoms({...symptoms, sputumProduction: +value})} />
        <SymptomSwitch title={t(tkeys.symptoms_ShortnessOfBreath)} tip={t(tkeys.symptoms_ShortnessOfBreathTip)}
            value={!!symptoms.shortnessOfBreath}
            onValueChange={value => setSymptoms({...symptoms, shortnessOfBreath: +value})} />
        <SymptomSwitch title={t(tkeys.symptoms_MusclePainOrJointPain)} tip={t(tkeys.symptoms_MusclePainOrJointPainTip)}
            value={!!symptoms.musclePainOrJointPain}
            onValueChange={value => setSymptoms({...symptoms, musclePainOrJointPain: +value})} />
        <SymptomSwitch title={t(tkeys.symptoms_SoreThroat)} tip={t(tkeys.symptoms_SoreThroatTip)}
            value={!!symptoms.soreThroat} onValueChange={value => setSymptoms({...symptoms, soreThroat: +value})} />
        <SymptomSwitch title={t(tkeys.symptoms_Headache)} tip={t(tkeys.symptoms_HeadacheTip)}
            value={!!symptoms.headache} onValueChange={value => setSymptoms({...symptoms, headache: +value})} />
        <SymptomSwitch title={t(tkeys.symptoms_Chills)} tip={t(tkeys.symptoms_ChillsTip)}
            value={!!symptoms.chills} onValueChange={value => setSymptoms({...symptoms, chills: +value})} />
      </ScrollView>
      <ActionButton title={t(tkeys.generic_Submit)} onPress={submitPersonSymptomsEvent} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Color.background,
  },
  symptomContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  temperatureChart: {
    width: '90%',
    resizeMode: 'contain',
    margin: Layout.margin,
  },
})
