import { NavigationContainerRef, useLinking } from '@react-navigation/native';
import { Linking } from 'expo';

export default function(containerRef: React.RefObject<NavigationContainerRef>) {
  return useLinking(containerRef, {
    prefixes: [
      Linking.makeUrl('/'),
      // 'https://covid19app.org',
      // 'covid19app://',
    ],
    config: {
      Root: {
        path: 'root',
        screens: {
          'Pair': 'sample',
          'Lab': 'lab',
          'Person': 'person',
          'QR': 'qr',
          'Family': 'family',
          'CDC': 'cdc',
        },
      },
    },
  })
}
