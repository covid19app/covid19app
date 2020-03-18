import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import Layout from '../constants/Layout';

export default function FamilyScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Alice'},
          {key: 'Bob'},
          {key: 'TODO'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  item: {
    padding: Layout.padding,
    fontSize: Layout.fontSize,
    height: 3 * Layout.fontSize,
  },
})
