import {Icon} from '@components'
import React from 'react'
import {TouchableOpacity, Text, View} from 'react-native'
import {height} from 'src/constants/constant'

export default function SelectBox({colors, title, content, required, onPress}) {
  return (
    <View
      style={{
        margin: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: colors.secondaryText,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        height: 60
      }}
      onPress={onPress}>
      <View
        style={{
          flexDirection: 'column'
        }}>
        {content && content !== '' && (
          <Text
            style={{
              marginEnd: 5,
              color: colors.secondaryText,
              fontWeight: '800'
            }}>
            {title} {required && <Text style={{color: 'red'}}> * </Text>}
          </Text>
        )}
        <Text style={{marginEnd: 5, color: colors.primaryText, fontSize: 18}}>
          {content || title}{' '}
          {required && !content && <Text style={{color: 'red'}}> * </Text>}
        </Text>
      </View>
      <Icon
        name="caret-down-outline"
        size={20}
        color={colors.primaryText}
        style={{
          position: 'absolute',
          right: 10
        }}
      />
    </View>
  )
}
