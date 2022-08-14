import {helper} from '@common'
import React, {useState} from 'react'
import {Text, View} from 'react-native'
import {Checkbox} from 'react-native-paper'
import {useSelector} from 'react-redux'

export default function PaymentCheckBox({
  color = 'black',
  width = '80%',
  height = 50,
  onCheck
}) {
  const userPayments = useSelector(
    (state) => state.paymentsReducer.dataUserPayments
  )
  const [checked, setChecked] = useState(-1)
  const onOptionCheck = (index) => {
    setChecked(index)
    if (helper.isFunction(onCheck)) {
      if (index !== -1) onCheck(userPayments[index])
      else onCheck(null)
    }
  }
  return (
    <>
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
          status={checked === -1 ? 'checked' : 'unchecked'}
          onPress={() => onOptionCheck(-1)}
        />
        <Text style={{color: color}}>Thanh toán trực tiếp</Text>
      </View>
      {userPayments.map((item, index) => {
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
              status={checked === index ? 'checked' : 'unchecked'}
              onPress={() => onOptionCheck(index)}
            />
            <Text style={{color: color}}>{item.title}</Text>
          </View>
        )
      })}
    </>
  )
}
