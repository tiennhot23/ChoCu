import {BaseText, Icon} from '@components'
import React from 'react'
import {View} from 'react-native'

export default function Address({style, address}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 14,
        borderBottomColor: style.colors.primaryForeground,
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
            color: style.colors.blue,
            backgroundColor: style.colors.primaryForeground + 20,
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
              color: style.colors.primaryForeground
            }}
          />
        </View>
        <BaseText text={address} />
      </View>
      <Icon
        type="Entypo"
        name="chevron-right"
        style={{
          fontSize: 22,
          color: style.colors.primaryForeground
        }}
      />
    </View>
  )
}
