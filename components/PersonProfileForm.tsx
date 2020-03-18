import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import ActionButton from './ActionButton';
import NamedPicker from './NamedPicker';
import NamedTextInput from './NamedTextInput';
import { PersonProfile } from '../utils/PersonProfile';
import { Sex } from '../utils/Sex';
import { generateEventInfo } from '../utils/Events';
import { post } from '../utils/Api';

import { t, tkeys } from '../utils/i18n';
import Color from '../constants/Color';

const SexKeys = Object.keys(Sex).filter(key => !isNaN(Number(Sex[key])))

export interface PersonProfileFormProps {
  personId: string
  onSubmitResponse?: () => void
}

export function PersonProfileForm(props: PersonProfileFormProps) {
  const blankPersonProfile = {personId: props.personId} as PersonProfile
  const [personProfile, setPersonProfile] = React.useState(blankPersonProfile)

  const submitPersonProfile = (personProfile: PersonProfile) => {
    const event = {...(personProfile as any), eventInfo: generateEventInfo()}
    post(`/v1/person/${props.personId}/profile`, event, props.onSubmitResponse)
  };

  return (
    <View style={styles.container}>
      <Text>{t(tkeys.profile_Intro)}</Text>
      <ScrollView style={styles.formContainer}>
        <NamedTextInput
          title={t(tkeys.profile_Name)}
          value={personProfile.name}
          onChangeText={text => setPersonProfile({...personProfile, name: text})}
        />
        <NamedTextInput
          keyboardType='numeric'
          title={t(tkeys.profile_Age)}
          value={personProfile.age && personProfile.age.toString()}
          onChangeText={text => setPersonProfile({...personProfile, age: +text})}
        />
        <NamedPicker
          title={t(tkeys.profile_Sex)}
          items={SexKeys} selectedValue={personProfile.sex}
          onValueChange={item => setPersonProfile({...personProfile, sex: item})} />
      </ScrollView>
      <ActionButton
        color={Color.secondaryAction}
        title={t(tkeys.generic_Skip)}
        onPress={() => submitPersonProfile(blankPersonProfile)}
      />
      <ActionButton
        color={Color.defaultAction}
        title={t(tkeys.generic_Submit)}
        onPress={() => submitPersonProfile(personProfile)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Color.background,
  },
  formContainer: {
    flex: 1,
    flexDirection: 'column',
  },
});
