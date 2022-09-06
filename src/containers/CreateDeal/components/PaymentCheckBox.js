import {helper} from '@common'
import React, {useState} from 'react'
import {Text, View} from 'react-native'
import {Checkbox} from 'react-native-paper'
import {useSelector} from 'react-redux'

export default function PaymentCheckBox({
  color = 'black',
  width = '80%',
  height = 50,
  onOnlinePayment
}) {
  const dataPost = useSelector((state) => state.postReducer.dataPost)
  const [checked, setChecked] = useState(0)
  const onOptionCheck = (index) => {
    setChecked(index)
    if (helper.isFunction(onOnlinePayment)) {
      onOnlinePayment(index === 1)
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
          status={checked === 0 ? 'checked' : 'unchecked'}
          onPress={() => onOptionCheck(0)}
        />
        <Text style={{color: color}}>Thanh toán trực tiếp</Text>
      </View>
      {dataPost?.post?.online_payment && (
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
            status={checked === 1 ? 'checked' : 'unchecked'}
            onPress={() => onOptionCheck(1)}
          />
          <Text style={{color: color}}>
            Thanh toán online (Chuyển khoản khi nhận hàng)
          </Text>
        </View>
      )}
    </>
  )
}
