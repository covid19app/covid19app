const tintColor = '#2f95dc';
// color: 'rgba(255,255,255,0.8)',

// https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=CFD8DC&secondary.color=81C784

const primary = '#cfd8dc'
const primaryLight = '#ffffff'
const primaryDark = '#9ea7aa'
const secondary = '#81c784'
const secondaryLight = '#b2fab4'
const secondaryDark = '#519657'
const primaryText = '#000000'
const secondaryText = '#000000'

export default {
  defaultAction: secondaryLight,
  secondaryAction: primaryLight,

  tabIconDefault: primary,
  tabIconSelected: tintColor,

  infected: '#ffa4a2', // = similar to secondary light but created from red instead of blue - light from red 300
  notInfected: '#b2fab4', // = secondary light - light from green 300

  background: primaryLight,
  text: primaryText,

  inputBackground: primaryDark,

  selectedIcon: secondaryDark,

  // errorBackground: 'red',
  // errorText: '#fff',
  // warningBackground: '#EAEB5E',
  // warningText: '#666804',
  // noticeBackground: tintColor,
  // noticeText: '#fff',
}
