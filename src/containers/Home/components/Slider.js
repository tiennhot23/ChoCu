import React, {createRef, useRef, useState} from 'react'
import {useEffect} from 'react'
import {FlatList, Dimensions, View, Image} from 'react-native'

const WIDTH = Dimensions.get('window').width - 40
export default function Slider(props) {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef(null)
  const listRef = useRef(null)
  const {
    images = [
      'https://cdn.chotot.com/admincentre/L5KnCfXMEofuv7ZqMlCefnZWTWFfhpxOEuQlFCXtmvM/preset:raw/plain/232b35ddfa43bca10af8835b9ad2fcba-2780291306823581449.jpg',
      'https://cdn.chotot.com/admincentre/HQr2zWXn4LNKhtiA0xIakNHbj2PnMV8fvUWsR5Rqc4U/preset:raw/plain/6d160e765a968ab372aeb72cebffaea4-2780291634466685777.jpg',
      'https://cdn.chotot.com/admincentre/zqjT_Wsx0DAj3g0Tts5glRD0i-byjfZEMUGXojroAQ0/preset:raw/plain/716ca84ba436190432e42a339f8b130b-2780291241782207875.jpg',
      'https://cdn.chotot.com/admincentre/CQLb6hkVuFbWyWKoaDhUBkPBCsw-nKB2Cw_avbEclXc/preset:raw/plain/38abda42fc87aaf01945bccba8371b8a-2780291381384817302.jpg',
      'https://cdn.chotot.com/admincentre/QPCo10_sqxqPJ90xEu5HfyIPyjhgBPN8EYMhOPVfLBk/preset:raw/plain/af97c7df7f63275b71e70971fc4489c2-2777793274959501593.jpg'
    ]
  } = props

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
      listRef.current.scrollToIndex({index})
    }, 3000)
    return () => resetTimeout()
  }, [index])

  const renderProductImage = ({item, index}) => {
    return (
      <View
        style={{
          width: WIDTH,
          height: 150,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Image
          source={{uri: item}}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
            borderRadius: 10
          }}
        />
      </View>
    )
  }
  return (
    <View
      style={{
        width: WIDTH,
        alignSelf: 'center'
      }}>
      <FlatList
        data={images ? images : null}
        horizontal
        renderItem={renderProductImage}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.8}
        snapToInterval={WIDTH}
        bounces={false}
        ref={listRef}
        keyExtractor={(item, index) => index}
      />
    </View>
  )
}
