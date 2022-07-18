import React, {createRef, useRef, useState} from 'react'
import {useEffect} from 'react'
import {FlatList, Dimensions, View, Image} from 'react-native'

export default function Slider({images}) {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef(null)
  const listRef = useRef(null)

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
          width: Dimensions.get('window').width,
          height: 240,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Image
          source={{uri: item}}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover'
          }}
        />
      </View>
    )
  }
  return (
    <>
      <FlatList
        data={images ? images : null}
        horizontal
        renderItem={renderProductImage}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.8}
        snapToInterval={Dimensions.get('window').width}
        bounces={false}
        ref={listRef}
        keyExtractor={(item, index) => index}
      />
    </>
  )
}
