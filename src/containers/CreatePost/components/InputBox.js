import {Icon} from '@components'
import React from 'react'
import {TouchableOpacity, Text, View, TextInput} from 'react-native'
import {height} from 'src/constants/constant'

export default function InputBox({
  colors,
  title,
  content,
  inputType,
  required,
  onPress,
  onFocus
}) {
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
        height: 70
      }}
      onPress={onPress}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column'
        }}>
        <Text
          style={{
            marginEnd: 5,
            color: colors.secondaryText,
            fontWeight: '800'
          }}>
          {title} {required && <Text style={{color: 'red'}}> * </Text>}
        </Text>
        <TextInput
          keyboardType={inputType}
          style={{
            fontSize: 18,
            paddingVertical: 3
          }}
          selectionColor={colors.primaryText}
          value={content}
          placeholder={title}
        />
      </View>
    </View>
  )
}
