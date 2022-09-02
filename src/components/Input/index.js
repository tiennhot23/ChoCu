import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
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
import {helper} from '@common'

export default Input = forwardRef(
  (
    {
      color = 'black',
      backgroundColor = 'white',
      width = '80%',
      height = 70,
      title,
      _text = '',
      required = false,
      placeholder = title,
      message,
      multiline = false,
      inputType,
      editable = true,
      onPress,
      onChange
    },
    ref
  ) => {
    color = editable ? 'black' : 'gray'
    const [isEmpty, setIsEmpty] = useState(false)
    const [text, setText] = useState('')

    useEffect(() => {
      setText(_text)
    }, [])

    useImperativeHandle(ref, () => ({
      getText() {
        return text
      },
      alertMessage() {
        setIsEmpty(true)
      }
    }))

    const onChangeText = (text) => {
      setText(text)
      if (helper.isFunction(onChange)) onChange(text)
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
                paddingTop: 10,
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
                keyboardType={inputType === 'money' ? 'numeric' : inputType}
                multiline={multiline}
                editable={editable}
                style={{
                  width: '100%',
                  fontSize: 14,
                  paddingVertical: 5,
                  color: color,
                  alignSelf: 'flex-start'
                }}
                onFocus={() => {
                  setIsEmpty(false)
                }}
                onBlur={() => {
                  if (required && text === '') setIsEmpty(true)
                }}
                selectionColor={color}
                value={text}
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
