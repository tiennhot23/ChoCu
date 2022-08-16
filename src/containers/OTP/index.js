import {Icon} from '@components'
import {constant} from '@constants'
import React, {useRef} from 'react'
import {Image, StyleSheet, TextInput, View} from 'react-native'
import FormButton from './components/FormButton'

export default function OTP({route, navigation}) {
  const theme = route.params
  const phoneRef = useRef()
  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: theme.primaryBackground
        }}>
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
          <Icon name={'call-outline'} size={20} color={theme?.primaryText} />
          <TextInput
            ref={phoneRef}
            keyboardType={'numeric'}
            style={{flex: 1, paddingLeft: 20}}
          />
        </View>
        <FormButton title={'Lấy mã OTP'} />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: theme.primaryBackground
        }}>
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
          <Icon name={'call-outline'} size={20} color={theme?.primaryText} />
          <TextInput
            ref={phoneRef}
            keyboardType={'numeric'}
            style={{flex: 1, paddingLeft: 20}}
          />
        </View>
        <FormButton title={'Xác thực OTP'} />
      </View>
    </>
  )
}
