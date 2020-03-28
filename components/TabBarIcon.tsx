import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';

import Color from '../constants/Color';
import Layout from '../constants/Layout';

interface TabBarIconProps {
  focused: boolean
  name: string
  size: number
}

export default function TabBarIcon(props: TabBarIconProps) {
  return (
    <Ionicons
      name={props.name}
      size={props.size * 1.2}
      style={{ marginBottom: -(Layout.tabBarIconSize / 4) }}
      color={props.focused ? Color.tabIconSelected : Color.tabIconDefault}
    />
  )
}
