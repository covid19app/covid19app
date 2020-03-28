import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { PersonProfileForm } from '../components/PersonProfileForm';
import Color from '../constants/Color';
import Layout from '../constants/Layout';
import { createFreshPersonEntity, loadAllPersonEntities, PersonEntityContext } from '../utils/Device';
import { t, tkeys } from '../utils/i18n';
import { PersonEntity } from '../utils/schema';

export default function FamilyScreen() {
  const [editedPersonEntity, setEditedPersonEntity] = React.useState<PersonEntity>()
  const [personEntities, setPersonEntities] = React.useState<PersonEntity[]>()
  const { personEntity, setPersonEntity } = React.useContext(PersonEntityContext)

  React.useEffect(() => {
    async function loadPeople() {
      const people: PersonEntity[] = await loadAllPersonEntities()
      people.sort((a, b) => (a.name > b.name) ? 1 : -1)
      setPersonEntities(people)
    }
    loadPeople()
  }, [])

  if (editedPersonEntity) {
    const handleProfileSubmit = (form: PersonEntity) => {
      console.log(editedPersonEntity)
      console.log(personEntities.map(
        pe => pe.personId === editedPersonEntity.personId ? `edited ${pe.personId}` : pe.personId))
      setPersonEntities(personEntities.map(pe => pe.personId === form.personId ? form : pe))
      if (!personEntities.find(pe => pe.personId === form.personId)) {
        setPersonEntities([...personEntities, form])
      }
      setEditedPersonEntity(undefined)
    }
    return (
      <View style={styles.container}>
        <PersonProfileForm personEntity={editedPersonEntity}
            onSubmit={handleProfileSubmit} onSkip={() => setEditedPersonEntity(undefined)} />
      </View>
    )
  }

  const renderPersonItem = (item: ListRenderItemInfo<PersonEntity>) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity style={styles.itemContainer} onPress={ () => setPersonEntity(item.item) }>
          { personEntity.personId === item.item.personId &&
            <Ionicons name='md-checkmark-circle' style={styles.selectedIcon} />
          }
          { personEntity.personId !== item.item.personId &&
            <Ionicons name='md-checkmark-circle' style={[styles.selectedIcon, {color: Color.background}]} />
          }
          <Text style={styles.text}>{item.item.name || '???'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsContainer} onPress={ () => setEditedPersonEntity(item.item) }>
          <Ionicons name='md-settings' style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>
    )
  }

  const FlatListItemSeparator = () => <View style={styles.line} />

  return (
    <View style={styles.container}>
      <FlatList data={personEntities} keyExtractor={item => item.personId}
          renderItem={renderPersonItem} ItemSeparatorComponent={FlatListItemSeparator} />
      <TouchableOpacity style={styles.item} onPress={ () => setEditedPersonEntity(createFreshPersonEntity()) }>
        <Ionicons name='md-add-circle' style={styles.selectedIcon} />
        <Text style={styles.text}>{t(tkeys.family_AddNewPerson)}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    height: 3 * Layout.fontSize,
  },
  line: {
    backgroundColor: Color.tabIconDefault,
    height: 0.1 * Layout.fontSize,
  },
  itemContainer: {
    flexDirection: 'row',
  },
  selectedIcon: {
    color: Color.selectedIcon,
    fontSize: Layout.bigFontSize,
    padding: Layout.padding,
  },
  text: {
    fontSize: Layout.bigFontSize,
    padding: Layout.padding,
  },
  settingsContainer: {
    padding: Layout.padding,
  },
  settingsIcon: {
    color: Color.text,
    fontSize: Layout.bigFontSize,
  },
  addIcon: {
    color: Color.defaultAction,
    fontSize: Layout.bigFontSize,
    padding: Layout.padding,
  },
})
