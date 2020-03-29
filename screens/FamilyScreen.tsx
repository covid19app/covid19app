import { Ionicons } from '@expo/vector-icons';
import { Body, Left, ListItem, Right, Text } from 'native-base';
import * as React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import ActionButton from '../components/ActionButton';
import { PersonProfileForm } from '../components/PersonProfileForm';
import Color from '../constants/Color';
import Layout from '../constants/Layout';
import { createFreshPersonEntity, loadAllPersonEntities, PersonEntityContext } from '../utils/Device';
import { t, tkeys } from '../utils/i18n';
import { PersonEntity } from '../utils/schema';

export default function FamilyScreen({ navigation }) {
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
      setPersonEntities(personEntities.map(pe => pe.personId === form.personId ? form : pe))
      if (!personEntities.find(pe => pe.personId === form.personId)) {
        setPersonEntities([...personEntities, form])
      }
      setEditedPersonEntity(undefined)
    }
    return (
      <View style={styles.container}>
        <PersonProfileForm personEntity={editedPersonEntity}
            onSubmit={handleProfileSubmit} onCancel={() => setEditedPersonEntity(undefined)} />
      </View>
    )
  }

  const handleItemSelected = (item: PersonEntity) => {
    setPersonEntity(item)
    navigation.navigate('Health', { personEntity: item })
  }

  const renderPersonItem = ({ item }) => {
    const iconStyle = personEntity.personId === item.personId ? {color: Color.iconSelected} : {color: Color.iconHidden}
    return (
      <ListItem icon onPress={() => handleItemSelected(item)} onLongPress={() => setEditedPersonEntity(item)}>
        <Left>
          <Ionicons name='md-checkmark-circle' style={[styles.icon, iconStyle]} />
        </Left>
        <Body>
          <Text style={styles.text}>{item.name || '???'}</Text>
        </Body>
        <Right>
          <TouchableOpacity onPress={() => setEditedPersonEntity(item)}>
            <Ionicons name='md-settings' style={styles.icon} />
          </TouchableOpacity>
        </Right>
      </ListItem>
    )
  }

  const FlatListItemSeparator = () => <View style={styles.line} />

  return (
    <View style={styles.container}>
      <FlatList data={personEntities} keyExtractor={item => item.personId}
          renderItem={renderPersonItem} ItemSeparatorComponent={FlatListItemSeparator} />
      <ActionButton iconName='md-add-circle' title={t(tkeys.family_AddNewPerson)}
          onPress={() => setEditedPersonEntity(createFreshPersonEntity())} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
    flex: 1,
  },
  line: {
    backgroundColor: Color.tabIconDefault,
    height: 0.1 * Layout.fontSize,
  },
  icon: {
    fontSize: Layout.bigFontSize,
    padding: Layout.padding,
  },
  text: {
    fontSize: Layout.bigFontSize,
    padding: Layout.padding,
  },
})
