import {BaseText, Icon} from '@components'
import React from 'react'
import {Text, View} from 'react-native'

export default function Address({
  color = 'black',
  backgroundColor = 'white',
  width = '90%',
  address
}) {
  return (
    <>
      <Text style={{width, color, fontWeight: '500', fontSize: 16}}>
        Địa chỉ nhận hàng
      </Text>
      <View
        style={{
          width,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 14,
          borderBottomColor: color,
          borderBottomWidth: 1,
          paddingBottom: 20
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '80%',
            alignItems: 'center'
          }}>
          <View
            style={{
              backgroundColor: '#000000' + 20,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 12,
              borderRadius: 100,
              marginRight: 10
            }}>
            <Icon
              type="Entypo"
              name="location-pin"
              style={{
                fontSize: 16,
                color: color
              }}
            />
          </View>
          <BaseText text={address} />
        </View>
      </View>
    </>
  )
}
