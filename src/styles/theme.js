import {DefaultTheme, DarkTheme as PaperDarkTheme} from 'react-native-paper'

const LightTheme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  tag: 'light',
  colors: {
    ...DefaultTheme.colors,
    primaryBackground: '#ffffff',
    secondaryBackground: '#e6e7e8',
    primaryForeground: '#ffba00',
    secondaryForeground: '#ffd900',
    foregroundContrast: 'white',
    primaryText: '#151723',
    secondaryText: '#7e7e7e',
    primaryButtonBackground: '#6546d7',
    primaryButtonText: '#ffffff',
    secondaryButtonBackground: '#6546d7',
    secondaryButtonText: '#6546d7',
    hairline: '#e0e0e0',
    grey0: '#fafafa',
    grey3: '#f5f5f5',
    grey6: '#d6d6d6',
    grey9: '#939393',
    red: '#ea0606',
    blue: '#4287f5'
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
    primaryButtonBackground: '#6546d7',
    primaryButtonText: '#ffffff',
    secondaryButtonBackground: '#6546d7',
    secondaryButtonText: '#6546d7',
    hairline: '#222222',
    grey0: '#0a0a0a',
    grey3: '#2a2a2a',
    grey6: '#f5f5f5',
    grey9: '#eaeaea',
    red: '#ea0606',
    blue: '#4287f5'
  }
}

export default {LightTheme, DarkTheme}
