import * as React from 'react';
import WebBrowser from '../components/WebBrowser';

import { t, tkeys } from '../utils/i18n';

export default function ResourcesScreen() {
  return <WebBrowser url={t(tkeys.resources_Url)} />
}
