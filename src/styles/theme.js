import {DefaultTheme, DarkTheme as PaperDarkTheme} from 'react-native-paper'

const LightTheme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  tag: 'light',
  colors: {
    ...DefaultTheme.colors,
    primaryBackground: '#ffffff',
    secondaryBackground: '#ffffff',
    primaryForeground: '#6546d7',
    secondaryForeground: '#8442bd',
    foregroundContrast: 'white',
    primaryText: '#151723',
    secondaryText: '#7e7e7e',
    hairline: '#e0e0e0',
    grey0: '#fafafa',
    grey3: '#f5f5f5',
    grey6: '#d6d6d6',
    grey9: '#939393',
    red: '#ea0606'
  }
}

const DarkTheme = {
  ...PaperDarkTheme,
  roundness: 2,
  version: 3,
  tag: 'dark',
  colors: {
    ...PaperDarkTheme.colors,
    primaryBackground: '#121212',
    secondaryBackground: '#000000',
    primaryForeground: '#6546d7',
    secondaryForeground: '#8442bd',
    foregroundContrast: 'white',
    primaryText: '#ffffff',
    secondaryText: '#c5c5c5',
    hairline: '#222222',
    grey0: '#0a0a0a',
    grey3: '#2a2a2a',
    grey6: '#f5f5f5',
    grey9: '#eaeaea',
    red: '#ea0606'
  }
}

export default {LightTheme, DarkTheme}
