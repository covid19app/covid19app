import { Form, Input, Item, Label, Picker } from 'native-base';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Color from '../constants/Color';
import Layout from '../constants/Layout';
import { getDeviceEntity, savePersonEntity } from '../utils/Device';
import { publishEvent } from '../utils/Events';
import { t, tkeys } from '../utils/i18n';
import { PersonEntity, PersonProfileEvent, Sex } from '../utils/schema';
import ActionButton from './ActionButton';

export interface PersonProfileFormProps {
  onCancel?: () => void
  onSubmit: (form: PersonEntity) => void
  personEntity: PersonEntity
}

export function PersonProfileForm(props: PersonProfileFormProps) {
  const [personProfile, setPersonProfile] = React.useState<PersonProfileEvent>(props.personEntity)
  const [nameErrorHint, setNameErrorHint] = React.useState<string>(undefined)

  const checkName = (name: string) => {
    setNameErrorHint(name ? undefined : t(tkeys.profile_NameRequiredHint))
    return !!name
  }

  const submitPersonProfile = async () => {
    if (!checkName(personProfile.name)) return
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
      <Form>
        { nameErrorHint && <Text style={styles.errorHintText}>* {nameErrorHint}</Text> }
        <Item stackedLabel {...(!nameErrorHint ? {} : {error: true})}>
          <Label>{t(tkeys.profile_Name)}</Label>
          <Input value={personProfile.name}
              onChangeText={text => {checkName(text), setPersonProfile({...personProfile, name: text})}} />
        </Item>
        <Item stackedLabel>
          <Label>{t(tkeys.profile_Age)}</Label>
          <Input keyboardType='numeric' value={personProfile.age && personProfile.age.toString()}
              onChangeText={text => setPersonProfile({...personProfile, age: +text})} />
        </Item>
        <Item picker>
          <Picker mode='dropdown' placeholder={t(tkeys.profile_Sex)}
            selectedValue={personProfile.sex} onValueChange={item => setPersonProfile({...personProfile, sex: item})}>
            <Picker.Item label={t(tkeys.profile_Female)} value={Sex.FEMALE} />
            <Picker.Item label={t(tkeys.profile_Male)} value={Sex.MALE} />
            <Picker.Item label={t(tkeys.profile_NonBinary)} value={Sex.NON_BINARY} />
          </Picker>
        </Item>
      </Form>
      <ActionButton color={Color.defaultAction} title={t(tkeys.generic_Submit)} onPress={submitPersonProfile} />
      { props.onCancel &&
        <ActionButton color={Color.secondaryAction} title={t(tkeys.generic_Cancel)} onPress={props.onCancel} />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
    flex: 1,
    flexDirection: 'column',
  },
  errorHintText: {
    color: Color.infected,
    fontSize: Layout.fontSize,
    paddingLeft: Layout.padding,
    paddingRight: Layout.padding,
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
