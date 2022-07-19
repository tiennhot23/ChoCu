import React, {useEffect, useRef, useState} from 'react'
import {View, TouchableOpacity, Text, TextInput} from 'react-native'
import {Icon} from '@components'

export default function Header({style, navigation}) {
  const searchRef = useRef(null)
  const [isSeaching, setIsSearching] = useState(true)

  useEffect(() => {
    searchRef.current.focus()
  }, [])

  const onBackPress = () => {
    if (searchRef && searchRef.current.isFocused()) {
      searchRef.current.blur()
      setIsSearching(false)
    } else navigation.goBack()
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
        backgroundColor: style.colors.primaryForeground,
        alignItems: 'center'
      }}>
      <TouchableOpacity onPress={onBackPress}>
        <Icon
          name="arrow-back-outline"
          style={{
            fontSize: 24,
            color: style.colors.backgroundMedium,
            paddingEnd: 12
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          fontSize: 20,
          color: style.colors.primaryText,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: style.colors.primaryBackground
        }}>
        <Icon
          name="search-outline"
          size={24}
          color={style.colors.secondaryText}
          style={{marginHorizontal: 12}}
        />
        <TextInput
          placeholder="Tìm kiếm trên chợ cũ"
          ref={searchRef}
          onFocus={() => setIsSearching(true)}
          onBlur={() => setIsSearching(false)}></TextInput>
      </View>
      {!isSeaching && (
        <TouchableOpacity>
          <Icon
            name="chatbox-outline"
            style={{
              fontSize: 24,
              color: style.colors.backgroundMedium,
              padding: 12
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}
