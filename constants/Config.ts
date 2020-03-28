import * as Location from 'expo-location';

export default {
  // API_SERVER_URL: 'http://localhost:8080',
  // API_SERVER_URL: 'https://api.covid19app.org',
  API_SERVER_URL: 'https://api.tmp.covid19app.org',

  BARCODE_SCAN_VIBRATION_DURATION_IN_MS: 250,

  GEO_DEFAULT_S2_LEVEL: 8,
  GEO_DEFAULT_ACCURACY: Location.Accuracy.Balanced,

  TEMERATURE_MIN_IN_C: 36.0,
  TEMERATURE_MAX_IN_C: 42.0,
  TEMERATURE_DEFAULT_IN_C: 37.0,
  TEMERATURE_FEVER_IN_C: 37.5,
}
