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
        height: constant.calcWidth(43),
        width: constant.calcWidth(255),
        flexDirection: 'row',
        marginBottom: constant.calcWidth(20)
      }}>
      <View
        style={{
          height: constant.calcWidth(43),
          width: constant.calcWidth(45),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          borderTopLeftRadius: 4,
          borderBottomLeftRadius: 4,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: 'gray'
        }}>
        {sourceIcon && (
          <Image style={{width: 20, height: 20}} source={sourceIcon} />
        )}
        {icon && <Icon name={icon.uri} size={20} color={'black'} />}
      </View>
      <View
        style={{
          height: constant.calcWidth(43),
          width: constant.calcWidth(207),
          marginLeft: constant.calcWidth(3),
          backgroundColor: 'white',
          borderTopRightRadius: 4,
          borderBottomRightRadius: 4,
          flexDirection: 'row',
          alignItems: 'center',
          paddingRight: 8,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: 'gray'
        }}>
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
    </View>
  )
}

export default FormInput
