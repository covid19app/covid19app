import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Switch, SwitchProps, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Color from '../constants/Color';
import Layout from '../constants/Layout';

interface SymptomSwitchProps extends SwitchProps {
  title: string
  tip?: string
}

export default function SymptomSwitch(props: SymptomSwitchProps) {
  const [showTip, setShowTip] = React.useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.namedSwitchContainer}>
        <View style={styles.titleContainer}>
          <TouchableOpacity style={styles.titleTouchable} disabled={!props.tip} onPress={ () => setShowTip(!showTip) }>
            <Text style={styles.title}>{props.title}</Text>
            { !!props.tip && <Ionicons name='md-help-circle-outline' style={styles.tipIcon} />}
          </TouchableOpacity>
        </View>
        <Switch {...props} style={styles.switch} />
        <View style={styles.spacer}></View>
      </View>
      { showTip && <Text style={styles.tip}>{props.tip}</Text> }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: Layout.padding,
  },
  namedSwitchContainer: {
    flexDirection: 'row',
  },
  titleContainer: {
    flex: 8,
  },
  titleTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: Color.text,
    fontSize: Layout.fontSize,
  },
  switch: {
    flex: 1,
  },
  spacer: {
    flex: 1,
  },
  tip: {
    color: Color.text,
    fontSize: Layout.smallFontSize,
    padding: Layout.padding,
  },
  tipIcon: {
    fontSize: Layout.fontSize,
    color: Color.text,
    paddingLeft: Layout.padding,
  },
})
