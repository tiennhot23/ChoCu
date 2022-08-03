import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native'
import {Icon} from '@components'
import {constant} from '@constants'

const FormInput = (props) => {
  const {
    theme,
    sourceIcon,
    icon,
    _inputRef,
    autoFocus,
    isPassword,
    isShowPassword,
    onPress
  } = props
  return (
    <View
      style={{
        width: constant.calcWidth(300),
        margin: constant.calcWidth(15),
        backgroundColor: theme?.primaryBackground,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: theme?.primaryText,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderWidth: StyleSheet.hairlineWidth
      }}>
      {sourceIcon && (
        <Image style={{width: 20, height: 20}} source={sourceIcon} />
      )}
      {icon && <Icon name={icon.uri} size={20} color={theme?.primaryText} />}
      <TextInput
        ref={_inputRef}
        style={{flex: 1, paddingLeft: 20}}
        autoFocus={autoFocus}
        {...props}
      />
      {isPassword && (
        <TouchableOpacity activeOpacity={1} onPress={onPress}>
          <Icon
            name={isShowPassword ? 'eye-outline' : 'eye-off-outline'}
            color={'black'}
            size={22}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default FormInput
