import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

type TabBarIconProps = {
  name: string,
  focused: boolean,
}

export default function TabBarIcon(props: TabBarIconProps) {
  return (
    <Ionicons
      name={props.name}
      size={32}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
