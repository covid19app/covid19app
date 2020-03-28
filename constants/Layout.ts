import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const innerSize = Math.min(width, height)

const defaultFontSize = Math.round(innerSize / 20)
const defaultSpacing = 0.5 * defaultFontSize

export default {
  window: {
    width,
    height,
  },
  innerSize,
  // isSmallDevice: width < 375,

  tinyFontSize: 0.5 * defaultFontSize,
  smallFontSize: 0.75 * defaultFontSize,
  fontSize: defaultFontSize,
  bigFontSize: 1.25 * defaultFontSize,
  hugeFontSize: 2.0 * defaultFontSize,

  padding: defaultSpacing,
  margin: defaultSpacing,

  largeIconSize: 1.5 * defaultFontSize,
  tabBarIconSize: 1.5 * defaultFontSize,

  columnWidth: 0.5 * innerSize - 2.0 * defaultSpacing,
}
