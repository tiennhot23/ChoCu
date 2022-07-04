import {I18nManager, Platform, StyleSheet} from 'react-native'
import {constant} from '@constants'

const dynamicStyle = (theme) => {
  const colors = theme.colors
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: colors.primaryBackground
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: colors.primaryForeground,
      marginTop: 25,
      marginBottom: 20,
      alignSelf: 'stretch',
      textAlign: 'left',
      marginLeft: 30
    },
    back_arrow: {
      marginTop: Platform.OS === 'ios' ? 50 : 20,
      marginLeft: 10,
      transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    bold_text: {
      color: colors.primaryForeground,
      marginLeft: 4,
      fontWeight: 'bold'
    },

    containerFlex: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center'
    },
    cotainerScrollView: {
      paddingTop: constant.calcWidth(114),
      paddingBottom: constant.calcWidth(300)
    },
    wrap_container: {
      height: constant.calcWidth(43),
      width: constant.calcWidth(255),
      flexDirection: 'row',
      marginBottom: constant.calcWidth(20)
    },
    ic_logo: {
      width: constant.calcWidth(70),
      height: constant.calcWidth(70),
      marginBottom: constant.calcWidth(5)
    },
    container_icon: {
      height: constant.calcWidth(43),
      width: constant.calcWidth(45),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4
    },
    container_input: {
      height: constant.calcWidth(43),
      width: constant.calcWidth(207),
      marginLeft: constant.calcWidth(3),
      backgroundColor: 'white',
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 8
    },
    button: {
      width: constant.calcWidth(189),
      height: constant.calcWidth(45),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'yellow',
      borderRadius: constant.calcWidth(50),
      marginBottom: constant.calcWidth(20),
      marginHorizontal: constant.calcWidth(10)
    },
    container_qrcode: {
      height: constant.calcWidth(50),
      width: constant.calcWidth(178),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: constant.calcWidth(36)
    },
    containerViewLogin: {
      backgroundColor: 'transparent',
      flex: 1,
      height: constant.calcHeight(100),
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
}

export default dynamicStyle
