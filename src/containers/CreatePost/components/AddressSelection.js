import React, {useCallback, useRef, useState} from 'react'
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  UIManager,
  View
} from 'react-native'
import {BottomSheet, Icon} from '@components'
import {font} from '@styles'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

export default function AddressSelection({
  color = 'black',
  backgroundColor = 'white',
  width = '80%',
  height = 70,
  title = 'Địa chỉ',
  required,
  placeHolder = 'Chọn địa chỉ',
  address,
  onSelect
}) {
  const bottomSheetRef = useRef(null)
  const onPress = useCallback(() => {
    const isActive = bottomSheetRef?.current?.isActive()
    if (isActive) {
      bottomSheetRef?.current?.scrollTo(0)
    } else {
      bottomSheetRef?.current?.scrollTo(-400)
    }
  }, [])
  return (
    <>
      <View
        style={{
          width,
          height,
          margin: 5
        }}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            flex: 1,
            marginTop: 10,
            paddingTop: 20,
            padding: 10,
            borderWidth: 1,
            borderColor: color,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: backgroundColor,
            elevation: 3
          }}
          onPress={onPress}>
          <View
            style={{
              flexDirection: 'column'
            }}>
            <View style={{flexDirection: 'row'}}>
              {address ? (
                <Text
                  style={{
                    fontSize: 18,
                    padding: 2,
                    elevation: 3,
                    borderRadius: 5,
                    marginHorizontal: 5,
                    backgroundColor: '#e6e7e8',
                    color: color
                  }}>
                  {address}
                </Text>
              ) : (
                <Text style={{color: 'gray'}}> {placeHolder} </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
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
      <BottomSheet ref={bottomSheetRef}></BottomSheet>
    </>
  )
}
