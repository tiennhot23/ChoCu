import {StyleSheet} from 'react-native'

const dynamicStyle = (theme) => {
  const colors = theme.colors
  return StyleSheet.create({
    container: {
      backgroundColor: colors.hairline,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
}

export default dynamicStyle
