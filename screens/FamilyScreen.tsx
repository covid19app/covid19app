import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function FamilyScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Alice'},
          {key: 'Bob'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
