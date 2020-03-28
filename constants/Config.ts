import * as Location from 'expo-location';

export default {
  // API_SERVER_URL: 'http://localhost:8080',
  // API_SERVER_URL: 'https://api.covid19app.org',
  API_SERVER_URL: 'https://api.tmp.covid19app.org',
  DEFAULT_S2_LEVEL: 8,
  DEFAULT_ACCURACY: Location.Accuracy.Balanced,
  MIN_TEMERATURE_IN_C: 36.0,
  MAX_TEMPERATURE_IN_C: 42.0,
  DEFAULT_TEMERATURE_IN_C: 37.0,
  FEVER_THRESHOLD_IN_C: 37.5,
}
