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

export default Input = forwardRef(
  (
    {
      color = 'black',
      backgroundColor = 'white',
      width = '80%',
      height = 70,
      title,
      required,
      placeHolder = 'Select',
      message,
      multiLine = false,
      inputType,
      onSelect
    },
    ref
  ) => {
    const [isEmpty, setIsEmpty] = useState(false)
    const [text, setText] = useState('')

    useImperativeHandle(ref, () => ({
      getAlert() {
        alert(text)
      }
    }))

    return (
      <View>
        <View
          style={{
            width: width,
            height: height,
            margin: 5
          }}>
          <Text
            style={{
              paddingHorizontal: 10,
              position: 'absolute',
              zIndex: 1,
              backgroundColor: backgroundColor,
              fontSize: font.FONT_SIZE_14,
              left: 10,
              marginHorizontal: 5,
              color: color,
              fontWeight: '800'
            }}>
            {title} {required && <Text style={{color: 'red'}}> * </Text>}
          </Text>
          <View
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
              style={{
                width: '100%',
                fontSize: 18,
                paddingVertical: 3
              }}
              onFocus={() => {
                setIsEmpty(false)
              }}
              onBlur={() => {
                if (required && text === '') setIsEmpty(true)
              }}
              selectionColor={color}
              value={text}
              placeholder={title}
              onChangeText={(text) => setText(text)}
            />
          </View>
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
