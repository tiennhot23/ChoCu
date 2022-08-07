import React, {PureComponent} from 'react'
import {StyleSheet, Text} from 'react-native'
import {font} from '@styles'
import {FONT_SIZE_14} from 'src/styles/fonts'

export default class BaseText extends PureComponent {
  render() {
    const {
      typeFont = 'regular',
      weight = '400',
      size = FONT_SIZE_14,
      color = 'black',
      text = '',
      oneline = false,
      style,
      onPress,
      children
    } = this.props

    return (
      <Text
        style={StyleSheet.flatten([
          {color: color, fontWeight: weight, fontSize: size},
          this.defaultStyle(typeFont),
          style
        ])}
        onPress={onPress}
        ellipsizeMode={oneline ? 'tail' : 'clip'}>
        {text}
        {children}
      </Text>
    )
  }

  defaultStyle = (typeFont) => {
    switch (typeFont) {
      case 'black':
        return robotoStyles.black

      case 'highlight':
        return robotoStyles.highlight

      case 'blackitalic':
        return robotoStyles.blackitalic

      case 'thin':
        return robotoStyles.thin

      case 'thinitalic':
        return robotoStyles.thinitalic

      case 'italic':
        return robotoStyles.italic

      case 'light':
        return robotoStyles.light

      case 'regular':
        return robotoStyles.regular

      case 'medium_regular':
        return robotoStyles.medium_regular

      case 'medium':
        return robotoStyles.medium

      case 'bold':
        return robotoStyles.bold

      case 'bolditalic':
        return robotoStyles.bolditalic

      default:
        return robotoStyles.regular
    }
  }
}

const robotoStyles = {
  black: {
    includeFontPadding: false,
    fontFamily: font.FONT_FAMILY_BLACK,
    fontWeight: 'normal',
    backgroundColor: 'black'
  },
  highlight: {
    includeFontPadding: false,
    fontFamily: font.FONT_FAMILY_BLACK,
    fontWeight: 'normal'
  },
  blackitalic: {
    includeFontPadding: false,
    fontFamily: font.FONT_FAMILY_BLACKITALIC,
    fontWeight: 'normal',
    backgroundColor: 'black'
  },
  thin: {
    includeFontPadding: false,
    fontFamily: font.FONT_FAMILY_THIN,
    fontWeight: 'normal',
    backgroundColor: 'black'
  },
  thinitalic: {
    includeFontPadding: false,
    fontFamily: font.FONT_FAMILY_THINITALIC,
    fontWeight: 'normal',
    backgroundColor: 'black'
  },
  italic: {
    includeFontPadding: false,
    fontFamily: font.FONT_FAMILY_ITALIC,
    fontWeight: 'normal',
    backgroundColor: 'black'
  },
  light: {
    includeFontPadding: false,
    fontFamily: font.FONT_FAMILY_LIGHT,
    fontWeight: 'normal',
    backgroundColor: 'black'
  },
  regular: {
    includeFontPadding: false,
    fontFamily: font.FONT_FAMILY_REGULAR,
    fontWeight: 'normal'
    // backgroundColor: 'black'
  },
  medium_regular: {
    includeFontPadding: false,
    fontFamily: font.FONT_FAMILY_MEDIUM,
    fontWeight: '500',
    backgroundColor: 'black'
  },
  medium: {
    includeFontPadding: false,
    fontFamily: font.FONT_FAMILY_MEDIUM,
    fontWeight: '500',
    backgroundColor: 'black'
  },
  bold: {
    includeFontPadding: false,
    fontFamily: font.FONT_FAMILY_BOLD,
    fontWeight: 'bold',
    backgroundColor: 'black'
  },
  bolditalic: {
    includeFontPadding: false,
    fontFamily: font.FONT_FAMILY_BOLDITALIC,
    fontWeight: 'bold',
    backgroundColor: 'black'
  }
}
