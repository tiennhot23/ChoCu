import {constant} from '@constants'
import {dimen} from '@styles'
import {StyleSheet} from 'react-native'
import {FONT_SIZE_16} from 'src/styles/fonts'

const dynamicStyle = (theme) => {
  const colors = theme.colors
  return StyleSheet.create({
    wrapper: {
      padding: constant.calcWidth(5),
      backgroundColor: colors.secondaryBackground
    },
    person_container: {
      backgroundColor: colors.primaryBackground,
      padding: constant.calcWidth(5),
      borderBottomWidth: 0.7,
      borderBottomColor: colors.primaryForeground,
      flex: 1,
      flexDirection: 'row'
    },
    detail_container: {
      backgroundColor: colors.primaryBackground,
      padding: constant.calcWidth(5),
      flex: 1,
      flexDirection: 'column'
    },
    posts_container: {
      marginVertical: 10,
      backgroundColor: colors.primaryBackground,
      padding: constant.calcWidth(5),
      flex: 1,
      flexDirection: 'column'
    },
    list_container: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderBottomColor: colors.secondaryText,
      borderTopColor: colors.secondaryText
    },
    bold_text: {
      fontSize: FONT_SIZE_16,
      color: colors.primaryText,
      marginLeft: 4,
      fontWeight: 'bold',
      padding: 5
    },
    nor_text: {
      color: colors.secondaryText,
      marginLeft: 4,
      padding: 5
    },
    link_text: {
      color: colors.blue,
      marginLeft: 4,
      padding: 5,
      alignSelf: 'center'
    },
    thin_border: {
      borderColor: colors.secondaryText,
      borderWidth: 1,
      borderRadius: 20,
      margin: 5
    },
    detail_item: {flexDirection: 'row', alignItems: 'center'},
    color: {
      primaryText: colors.primaryText,
      secondaryText: colors.secondaryText
    }
  })
}

export default dynamicStyle
