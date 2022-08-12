import React, {forwardRef, useImperativeHandle, useState} from 'react'
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View
} from 'react-native'
import {font} from '@styles'
import {constant} from '@constants'

export default Input = forwardRef(
  (
    {
      color = 'black',
      backgroundColor = 'white',
      width = '80%',
      height = 70,
      title,
      _text,
      required,
      placeholder = 'Select',
      message,
      multiLine = false,
      inputType,
      editable = true,
      onPress,
      onChange
    },
    ref
  ) => {
    const [isEmpty, setIsEmpty] = useState(false)
    const [text, setText] = useState('')

    useImperativeHandle(ref, () => ({
      getText() {
        return text
      }
    }))

    const onChangeText = (text) => {
      setText(text)
      onChange(text)
    }

    return (
      <View>
        <View
          style={{
            width: width,
            height: height,
            margin: 5
          }}>
          {editable ? (
            <TouchableOpacity
              onPress={onPress}
              activeOpacity={1}
              style={{
                flex: 1,
                marginTop: 10,
                paddingTop: 20,
                padding: 10,
                borderWidth: 1,
                borderColor: isEmpty ? 'red' : color,
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: backgroundColor,
                elevation: 3
              }}>
              <TextInput
                keyboardType={inputType}
                multiline={multiLine}
                editable={editable}
                style={{
                  width: '100%',
                  fontSize: 14,
                  paddingVertical: 3,
                  color: color
                }}
                onFocus={() => {
                  setIsEmpty(false)
                }}
                onBlur={() => {
                  if (required && text === '') setIsEmpty(true)
                }}
                selectionColor={color}
                value={_text || text}
                placeholder={placeholder}
                onChangeText={onChangeText}
              />
            </TouchableOpacity>
          ) : (
            <View
              style={{
                width: '100%',
                marginTop: 10,
                paddingTop: 20,
                padding: 10,
                borderWidth: 1,
                borderColor: isEmpty ? 'red' : color,
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: backgroundColor,
                elevation: 3
              }}>
              <ScrollView horizontal style={{}}>
                <Text
                  style={{
                    fontSize: 14,
                    paddingVertical: 3,
                    color: color
                  }}>
                  {_text || text || placeholder}
                </Text>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    position: 'absolute',
                    width: (constant.width * 80) / 100,
                    height: height
                  }}
                  onPress={onPress}></TouchableOpacity>
              </ScrollView>
            </View>
          )}
          <Text
            style={{
              paddingHorizontal: 10,
              position: 'absolute',
              backgroundColor: backgroundColor,
              fontSize: font.FONT_SIZE_14,
              left: 10,
              marginHorizontal: 5,
              color: color,
              fontWeight: '800'
            }}>
            {title} {required && <Text style={{color: 'red'}}> * </Text>}
          </Text>
        </View>
        {(message || isEmpty) && (
          <Text
            style={{
              color: isEmpty ? 'red' : color,
              fontSize: font.FONT_SIZE_12,
              alignSelf: 'flex-start',
              padding: 5
            }}>
            {isEmpty ? 'Không được bỏ trống' : message}
          </Text>
        )}
      </View>
    )
  }
)
