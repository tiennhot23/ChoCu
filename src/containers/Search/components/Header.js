import React, {useEffect, useRef, useState} from 'react'
import {View, TouchableOpacity, Text, TextInput} from 'react-native'
import {Icon} from '@components'

export default function Header({
  color = 'black',
  backgroundColor = 'white',
  navigation,
  onSearch,
  onGoBack
}) {
  const searchRef = useRef(null)
  const [isSeaching, setIsSearching] = useState(true)
  const [text, setText] = useState('')

  useEffect(() => {
    searchRef.current.focus()
  }, [])

  const onBackPress = () => {
    if (searchRef && searchRef.current.isFocused()) {
      searchRef.current.blur()
      setIsSearching(false)
    } else {
      navigation.goBack()
      onGoBack()
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
      }}>
      <TouchableOpacity onPress={onBackPress}>
        <Icon
          name="arrow-back-outline"
          style={{
            fontSize: 24,
            color: color,
            paddingEnd: 12
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          fontSize: 20,
          color: color,
          borderRadius: 10,
          borderWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 5
        }}>
        {isSeaching && (
          <Icon
            name="search-outline"
            size={24}
            color={color}
            style={{marginHorizontal: 12}}
          />
        )}

        <TextInput
          placeholder="Tìm kiếm trên chợ cũ"
          ref={searchRef}
          value={text}
          onChangeText={(t) => setText(t)}
          onFocus={() => setIsSearching(true)}
          onBlur={() => setIsSearching(false)}></TextInput>
      </View>
      {!isSeaching && (
        <TouchableOpacity onPress={() => onSearch(text)}>
          <Icon
            name="search-outline"
            style={{
              fontSize: 24,
              color: color,
              padding: 12
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}
