import {StyleSheet} from 'react-native'

const dynamicStyle = (theme) => {
  const colors = theme.colors
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: colors.primaryBackground
    },
    colors
  })
}

export default dynamicStyle
