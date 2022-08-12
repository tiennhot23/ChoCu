import {helper} from '@common'
import React, {useState} from 'react'
import {Text, View} from 'react-native'
import {Checkbox} from 'react-native-paper'

export default function OnlinePaymentCheckBox({
  color = 'black',
  width = '80%',
  height = 50,
  onCheck
}) {
  const [checked, setChecked] = useState(false)
  return (
    <View
      style={{
        width,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}>
      <Checkbox
        color={color}
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked(!checked)
          if (helper.isFunction(onCheck)) onCheck()
        }}
      />
      <Text style={{color: color}}>Chấp nhận thanh toán trực tuyến</Text>
    </View>
  )
}
