import {StyleSheet} from 'react-native'

const dynamicStyle = (theme) => {
  const colors = theme.colors
  return StyleSheet.create({
    sub_container: {
      marginVertical: 10,
      borderBottomColor: colors.primaryForeground,
      borderBottomWidth: 1,
      paddingBottom: 10
    },
    wrapper: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.primaryBackground,
      position: 'relative'
    },

    /**slide */
    slider_container: {
      width: '100%',
      backgroundColor: theme.colors.primaryBackground,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 4
    },

    /**header */
    header_container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
      position: 'absolute',
      zIndex: 1,
      top: 0,
      left: 0,
      paddingTop: 16,
      paddingLeft: 16
    },
    back_button: {
      fontSize: 24,
      color: colors.primaryForeground,
      backgroundColor: colors.primaryForeground + 30,
      padding: 12,
      borderRadius: 100
    },
    more_button: {
      fontSize: 24,
      color: colors.primaryForeground,
      backgroundColor: colors.primaryForeground + 30,
      padding: 12,
      borderRadius: 100,
      marginEnd: 15
    },

    title: {
      fontSize: 24,
      fontWeight: '800',
      letterSpacing: 0.5,
      marginVertical: 4,
      color: colors.secondaryText
    },
    follow_buton: {
      fontSize: 24,
      color: colors.red,
      backgroundColor: colors.red + 20,
      padding: 8,
      borderRadius: 100
    },
    price: {
      fontSize: 20,
      fontWeight: '800',
      marginVertical: 5,
      color: colors.red
    },
    small_text: {
      fontSize: 12,
      marginVertical: 4,
      color: colors.secondaryText
    },
    seller_container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      justifyContent: 'space-between',
      borderBottomColor: colors.primaryForeground,
      borderBottomWidth: 1,
      paddingBottom: 10
    },
    link_button: {
      fontSize: 24,
      color: colors.primaryForeground,
      backgroundColor: colors.primaryForeground + 20,
      padding: 8,
      borderRadius: 100
    },
    details_item: {
      flexDirection: 'row',
      paddingVertical: 10,
      alignItems: 'center'
    },

    colors
  })
}

export default dynamicStyle
