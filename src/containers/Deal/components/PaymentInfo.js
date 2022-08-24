import {helper} from '@common'
import {font} from '@styles'
import React, {useEffect, useState} from 'react'
import {View, Text} from 'react-native'
import {Checkbox} from 'react-native-paper'
import {useDispatch, useSelector} from 'react-redux'
import {requestUserPayments} from 'src/containers/Payment/action'

export default function PaymentInfo({
  color = 'black',
  backgroundColor = 'white',
  width = '90%',
  deal,
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
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestUserPayments({user_id: deal?.seller_id}))
  }, [deal])

  return (
    <View
      style={{
        width,
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          padding: 5
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '800',
            letterSpacing: 0.5,
            marginVertical: 4,
            color: color,
            borderBottomColor: color,
            borderBottomWidth: 1
          }}
          ellipsizeMode={'tail'}>
          {'Thông tin giao dịch'}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between'
          }}>
          <Text
            style={{
              fontSize: font.FONT_SIZE_14,
              letterSpacing: 0.5,
              textAlign: 'right',
              color: color
            }}
            ellipsizeMode={'tail'}>
            {'Tổng tiền'}
          </Text>
          <Text
            style={{
              fontSize: font.FONT_SIZE_18,
              letterSpacing: 0.5,
              textAlign: 'right',
              color: color,
              fontWeight: font.FONT_WEIGHT_BOLD
            }}
            ellipsizeMode={'tail'}>
            {deal?.deal_price + ' d'}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            borderBottomColor: color,
            borderBottomWidth: 1,
            borderStyle: 'dashed',
            justifyContent: 'space-between'
          }}>
          <Text
            style={{
              fontSize: font.FONT_SIZE_14,
              letterSpacing: 0.5,
              textAlign: 'right',
              color: color
            }}
            ellipsizeMode={'tail'}>
            {'Trạng thái'}
          </Text>
          <Text
            style={{
              fontSize: font.FONT_SIZE_18,
              letterSpacing: 0.5,
              textAlign: 'right',
              color: color,
              fontWeight: font.FONT_WEIGHT_BOLD
            }}
            ellipsizeMode={'tail'}>
            {deal?.deal_state === 'canceled'
              ? 'Đã huỷ'
              : deal?.deal_state === 'pending'
              ? 'Đang chờ xác nhận'
              : deal?.deal_state === 'confirmed'
              ? `${deal.online_deal ? 'Chờ thanh toán' : 'Đã xác nhận'}`
              : deal?.deal_state === 'paid'
              ? 'Đã thanh toán'
              : deal?.deal_state === 'sending'
              ? 'Đang giao'
              : deal?.deal_state === 'received'
              ? 'Đã nhận/Chưa đánh giá'
              : 'Hoàn tất'}
          </Text>
        </View>
        {deal?.deal_state === 'confirmed' && deal?.online_deal && (
          <>
            <Text
              style={{
                fontSize: 14,
                letterSpacing: 0.5,
                marginBottom: 4,
                marginTop: 20,
                color: color
              }}
              ellipsizeMode={'tail'}>
              {'Các hình thức giao dịch khả dụng'}
            </Text>
            {userPayments.lengh === 0 && (
              <Text
                style={{
                  color: 'gray',
                  textAlign: 'center',
                  padding: 20
                }}>
                Người bán chưa cung cấp bất kì thông tin hình thức giao dịch nào
              </Text>
            )}
            {userPayments.map((item, index) => {
              return (
                <View
                  style={{
                    width,
                    height: 50,
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
        )}
      </View>
    </View>
  )
}
