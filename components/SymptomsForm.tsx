import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native';

import FeverSlider from '../components/FeverSlider';
import SubmitButton from '../components/SubmitButton';
import SymptomSwitch from '../components/SymptomSwitch';
import { Symptoms } from '../utils/Symptoms';
import { post } from '../utils/Api';
import { generateEventInfo } from '../utils/Events';
import { NextSteps } from '../utils/NextSteps';

type SymptomsFormProps = {
  personId: string,
  onSubmitResponse?: (nextSteps: NextSteps) => void,
}

export default function SymptomsForm(props: SymptomsFormProps) {
  const [symptoms, setSymptoms] = useState({feverInCelsius: 37.0} as Symptoms)

  const submitSymptoms = () => {
    const eventInfo = generateEventInfo(props.personId)
    var symptomsEvent = {...(symptoms as any), eventInfo: eventInfo}
    post(`/v1/person/${props.personId}/symptoms`, symptomsEvent, props.onSubmitResponse)
    // // Alert.alert(JSON.stringify(symptomsEvent))
    // const labHref = 'https://www.google.com/maps/search/?api=1&query=hospital'
    // const html = `<a style="font-size: 40px;" href="${labHref}">Go to nearest lab please!!!</a>`
    // props.onSubmitResponse({ action: 'GET_TESTED', html: html, externalLink: labHref } as NextSteps)
  };

  return (
    <View style={styles.container}>
      <Text>How do you feel today? Enter your symptoms please!</Text>
      <ScrollView style={styles.symptomContainer}>
        <FeverSlider temperatureScale="F" feverInCelsius={symptoms.feverInCelsius}
            onValueChange={valueInC => setSymptoms({...symptoms, feverInCelsius: valueInC})} />
        <SymptomSwitch title="dry cough" value={symptoms.dryCough}
            onValueChange={value => setSymptoms({...symptoms, dryCough: +value})} />
        <SymptomSwitch title="fatigue" value={symptoms.fatigue} 
            onValueChange={value => setSymptoms({...symptoms, fatigue: +value})} />
        <SymptomSwitch title="sputum production" value={symptoms.sputumProduction}
            onValueChange={value => setSymptoms({...symptoms, sputumProduction: +value})} />
        <SymptomSwitch title="shortness of breath" value={symptoms.shortnessOfBreath} 
            onValueChange={value => setSymptoms({...symptoms, shortnessOfBreath: +value})} />
        <SymptomSwitch title="muscle pain or joint pain" value={symptoms.musclePainOrJointPain} 
            onValueChange={value => setSymptoms({...symptoms, musclePainOrJointPain: +value})} />
        <SymptomSwitch title="sore throat" value={symptoms.soreThroat} 
            onValueChange={value => setSymptoms({...symptoms, soreThroat: +value})} />
        <SymptomSwitch title="headache" value={symptoms.headache} 
            onValueChange={value => setSymptoms({...symptoms, headache: +value})} />
        <SymptomSwitch title="chills" value={symptoms.chills} 
            onValueChange={value => setSymptoms({...symptoms, chills: +value})} />
      </ScrollView>
      <SubmitButton onPress={() => submitSymptoms()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  symptomContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  temperatureChart: {
    width: "90%",
    resizeMode: 'contain',
    margin: 12,
  },
});
