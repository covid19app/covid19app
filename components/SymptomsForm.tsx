import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import FeverSlider from './FeverSlider';
import ActionButton from './ActionButton';
import SymptomSwitch from './SymptomSwitch';
import { NextSteps } from '../utils/NextSteps';
import { Symptoms } from '../utils/Symptoms';
import { generateEventInfo } from '../utils/Events';
import { post } from '../utils/Api';

import { t, tkeys } from '../utils/i18n';
import Layout from '../constants/Layout';
import Color from '../constants/Color';

interface SymptomsFormProps {
  personId: string
  onSubmitResponse?: (nextSteps: NextSteps) => void
}

export default function SymptomsForm(props: SymptomsFormProps) {
  const [symptoms, setSymptoms] = React.useState({personId: props.personId, feverInCelsius: 37.0} as Symptoms)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const submitSymptoms = () => {
    const event = {...(symptoms as any), eventInfo: generateEventInfo()}
    setIsSubmitting(true)
    post(`/v1/person/${props.personId}/symptoms`, event, ns => { setIsSubmitting(false); props.onSubmitResponse(ns) })
    // const labHref = 'https://www.google.com/maps/search/?api=1&query=hospital'
    // const html = `<a style="font-size: 40px;" href="${labHref}">Go to nearest lab please!!!</a>`
    // props.onSubmitResponse({ action: 'GET_TESTED', html: html, externalLink: labHref } as NextSteps)
  };

  return (
    <View style={styles.container}>
      <Text>How do you feel today? Enter your symptoms please!</Text>
      <ScrollView style={styles.symptomContainer}>
        <FeverSlider feverInCelsius={symptoms.feverInCelsius}
            onValueChange={valueInC => setSymptoms({...symptoms, feverInCelsius: valueInC})} />
        <SymptomSwitch title={t(tkeys.symptoms_DryCough)} tip={t(tkeys.symptoms_DryCoughTip)}
            value={!!symptoms.dryCough} onValueChange={value => setSymptoms({...symptoms, dryCough: +value})} />
        <SymptomSwitch title={t(tkeys.symptoms_Fatigue)} tip={t(tkeys.symptoms_FatigueTip)}
            value={!!symptoms.fatigue} onValueChange={value => setSymptoms({...symptoms, fatigue: +value})} />
        <SymptomSwitch title="Sputum production" value={!!symptoms.sputumProduction}
            onValueChange={value => setSymptoms({...symptoms, sputumProduction: +value})} />
        <SymptomSwitch title="Shortness of breath" value={!!symptoms.shortnessOfBreath} 
            onValueChange={value => setSymptoms({...symptoms, shortnessOfBreath: +value})} />
        <SymptomSwitch title="Muscle pain or joint pain" value={!!symptoms.musclePainOrJointPain} 
            onValueChange={value => setSymptoms({...symptoms, musclePainOrJointPain: +value})} />
        <SymptomSwitch title="Sore throat" value={!!symptoms.soreThroat} 
            onValueChange={value => setSymptoms({...symptoms, soreThroat: +value})} />
        <SymptomSwitch title="Headache" value={!!symptoms.headache} 
            onValueChange={value => setSymptoms({...symptoms, headache: +value})} />
        <SymptomSwitch title="Chills" value={!!symptoms.chills} 
            onValueChange={value => setSymptoms({...symptoms, chills: +value})} />
      </ScrollView>
      <ActionButton title={t(tkeys.generic_Submit)} inProgress={isSubmitting} onPress={ () => submitSymptoms() } />
    </View>
  );
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
});
