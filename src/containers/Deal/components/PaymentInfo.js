import {font} from '@styles'
import React from 'react'
import {View, Text} from 'react-native'

export default function PaymentInfo({
  color = 'black',
  backgroundColor = 'white',
  width = '90%',
  deal
}) {
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
              ? 'Đã xác nhận'
              : deal?.deal_state === 'sending'
              ? 'Đang giao'
              : deal?.deal_state === 'received'
              ? 'Đã nhận/Chưa đánh giá'
              : 'Hoàn tất'}
          </Text>
        </View>
      </View>
    </View>
  )
}
