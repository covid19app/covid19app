import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Color from '../constants/Color';
import Layout from '../constants/Layout';
import { getDeviceEntity, savePersonEntity } from '../utils/Device';
import { publishEvent } from '../utils/Events';
import { t, tkeys } from '../utils/i18n';
import { PersonEntity, PersonProfileEvent, Sex } from '../utils/schema';
import ActionButton from './ActionButton';
import NamedPicker from './NamedPicker';
import NamedTextInput from './NamedTextInput';

const SexKeys = Object.keys(Sex).filter(key => !isNaN(Number(Sex[key])))

export interface PersonProfileFormProps {
  personEntity: PersonEntity
  onSubmit: (form: PersonEntity) => void
  onSkip?: () => void
}

export function PersonProfileForm(props: PersonProfileFormProps) {
  const [personProfile, setPersonProfile] = React.useState<PersonProfileEvent>(props.personEntity)

  const submitPersonProfile = async () => {
    const personEntity: PersonEntity = {...personProfile, deviceId: getDeviceEntity().deviceId}
    await Promise.all([
      savePersonEntity(personEntity),
      publishEvent(`/v1/person/${personProfile.personId}/profile`, personProfile),
    ])
    props.onSubmit(personEntity)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.intro}>{t(tkeys.profile_Intro)}</Text>
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
      { props.onSkip &&
        <ActionButton
          color={Color.secondaryAction}
          title={t(tkeys.generic_Skip)}
          onPress={props.onSkip}
        />
      }
      <ActionButton
        color={Color.defaultAction}
        title={t(tkeys.generic_Submit)}
        onPress={submitPersonProfile}
      />
    </View>
  )
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
  intro: {
    color: Color.text,
    fontSize: Layout.fontSize,
    padding: Layout.padding,
  },
})
