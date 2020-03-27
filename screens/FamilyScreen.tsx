import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { PersonProfileForm } from '../components/PersonProfileForm';
import Color from '../constants/Color';
import Layout from '../constants/Layout';
import { createFreshPersonEntity, loadAllPersonEntities, PersonEntityContext } from '../utils/Device';
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
    const handleProfileSubmit = () => setEditedPersonEntity(undefined)
    return (
      <View style={styles.container}>
        <PersonProfileForm personEntity={editedPersonEntity}
            onSubmit={handleProfileSubmit} onSkip={handleProfileSubmit} />
      </View>
    )
  }

  const FlatListItemSeparator = () => <View style={styles.line} />

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

  return (
    <View style={styles.container}>
      <FlatList
          data={personEntities}
          keyExtractor={item => item.personId}
          renderItem={renderPersonItem}
          ItemSeparatorComponent={FlatListItemSeparator}
      />
      <TouchableOpacity style={styles.item} onPress={ () => setEditedPersonEntity(createFreshPersonEntity()) }>
        <Ionicons name='md-add-circle' style={styles.selectedIcon} />
        {/* <Text style={styles.text}>{t(tkeys.generic_UnregisteredPersonName)}</Text> */}
        <Text style={styles.text}>Add New Person</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: Color.background,
  },
  item: {
    flexDirection: 'row',
    height: 3 * Layout.fontSize,
  },
  line: {
    height: 0.1 * Layout.fontSize,
    backgroundColor: Color.tabIconDefault,
  },
  itemContainer: {
    // flex: 8,
    flexDirection: 'row',
  },
  selectedIcon: {
    // flex: 1,
    color: Color.selectedIcon,
    fontSize: Layout.bigFontSize,
    padding: Layout.padding,
  },
  text: {
    // flex: 7,
    fontSize: Layout.bigFontSize,
    padding: Layout.padding,
  },
  settingsContainer: {
    // flex: 2,
    padding: Layout.padding,
  },
  settingsIcon: {
    color: Color.text,
    fontSize: Layout.bigFontSize,
  },
  addIcon: {
    // flex: 1,
    color: Color.defaultAction,
    fontSize: Layout.bigFontSize,
    padding: Layout.padding,
  },
})
