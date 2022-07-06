import {constant} from '@constants'
import {dimen} from '@styles'
import {StyleSheet} from 'react-native'
import {FONT_SIZE_16} from 'src/styles/fonts'

const dynamicStyle = (theme) => {
  const colors = theme.colors
  return StyleSheet.create({
    header: {
      backgroundColor: colors.primaryForeground,
      height: constant.calcHeight(dimen.headerHeight),
      justifyContent: 'center'
    },
    headerIcon: {},
    headerGroupIcon: {
      alignSelf: 'flex-end',
      marginEnd: constant.calcWidth(10)
    },
    wrapper: {
      padding: constant.calcWidth(5),
      backgroundColor: colors.primaryBackground
    },
    person_container: {
      padding: constant.calcWidth(10),
      borderBottomWidth: 0.7,
      borderBottomColor: colors.primaryForeground,
      flex: 1,
      flexDirection: 'row'
    },
    bold_text: {
      fontSize: FONT_SIZE_16,
      color: colors.primaryText,
      marginLeft: 4,
      fontWeight: 'bold'
    },
    nor_text: {
      color: colors.secondaryText,
      marginLeft: 4
    }
  })
}

export default dynamicStyle
