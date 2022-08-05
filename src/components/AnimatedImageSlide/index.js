import React, {useState, useRef} from 'react'
import {
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
const {width, height} = Dimensions.get('screen')

const default_images = [
  'https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1668211/pexels-photo-1668211.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1647372/pexels-photo-1647372.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1616164/pexels-photo-1616164.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1799901/pexels-photo-1799901.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1789968/pexels-photo-1789968.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1774301/pexels-photo-1774301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1734364/pexels-photo-1734364.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1724888/pexels-photo-1724888.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
]

export default function AnimatedImageSlide(props) {
  const {images = default_images} = props
  const scrollX = React.useRef(new Animated.Value(0)).current
  const [index, setIndex] = React.useState(0)
  const timeoutRef = useRef(null)
  const listRef = useRef(null)

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  React.useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
      listRef.current.scrollToIndex({index})
    }, 3000)
    return () => resetTimeout()
  }, [index])

  return (
    <View>
      <SafeAreaView style={{backgroundColor: 'black'}}>
        <Animated.FlatList
          ref={listRef}
          data={images}
          keyExtractor={(item, index) => index}
          horizontal
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX
                  }
                }
              }
            ],
            {useNativeDriver: true}
          )}
          style={{flexGrow: 0}}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width
            ]
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0]
            })
            return (
              <Animated.View
                style={{
                  width,
                  opacity
                }}>
                <Image
                  source={{uri: item}}
                  style={{
                    width: width,
                    height: 250,
                    resizeMode: 'cover'
                  }}
                />
              </Animated.View>
            )
          }}
        />
      </SafeAreaView>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
          marginTop: 15
        }}>
        {images
          ? images.map((data, index) => {
              let position = Animated.divide(scrollX, width)
              let opacity = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0.2, 1, 0.2],
                extrapolate: 'clamp'
              })
              return (
                <Animated.View
                  key={index}
                  style={{
                    width: (width - 100) / images.length - 8,
                    height: 5,
                    backgroundColor: 'black',
                    opacity,
                    marginHorizontal: 4,
                    borderRadius: 100
                  }}
                />
              )
            })
          : null}
      </View>
    </View>
  )
}
