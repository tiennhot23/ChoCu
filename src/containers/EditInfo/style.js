import {constant} from '@constants'
import {dimen} from '@styles'
import {StyleSheet} from 'react-native'
import {calcHeight, calcWidth} from 'src/constants/constant'
import {FONT_SIZE_14, FONT_SIZE_16} from 'src/styles/fonts'

const dynamicStyle = (theme) => {
  const colors = theme.colors
  return StyleSheet.create({
    wrapper: {
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
    list_container: {
      marginBottom: '20%',
      borderBottomWidth: 1,
      borderBottomColor: colors.primaryForeground
    },
    border_input: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 10,
      padding: calcWidth(5),
      marginVertical: calcWidth(10),
      marginHorizontal: calcWidth(20),
      flexDirection: 'column'
    },
    camera: {
      padding: 3,
      borderRadius: 20,
      borderWidth: 1,
      borderStyle: 'dotted',
      backgroundColor: colors.hairline,
      position: 'absolute',
      left: calcWidth(50),
      top: calcHeight(50)
    },
    absolute_button: {
      width: '70%',
      marginHorizontal: '15%',
      backgroundColor: colors.primaryForeground,
      padding: 15,
      borderRadius: 20,
      position: 'absolute',
      left: 0,
      top: constant.height - 150,
      alignItems: 'center',
      justifyContent: 'center'
    },
    row_item: {
      flexDirection: 'column',
      backgroundColor: colors.primaryBackground,
      padding: calcWidth(5)
    },

    detail_container: {
      backgroundColor: colors.primaryBackground,
      padding: constant.calcWidth(5),
      flex: 1,
      flexDirection: 'column'
    },
    posts_container: {
      marginVertical: calcHeight(10),
      backgroundColor: colors.primaryBackground,
      padding: constant.calcWidth(5),
      flex: 1,
      flexDirection: 'column'
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
      marginLeft: calcWidth(4),
      padding: calcWidth(5)
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
      margin: 5,
      alignSelf: 'flex-start'
    },
    detail_item: {flexDirection: 'row', alignItems: 'center'},
    color: {
      primaryText: colors.primaryText,
      secondaryText: colors.secondaryText
    }
  })
}

export default dynamicStyle
