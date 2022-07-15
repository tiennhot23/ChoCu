import React from 'react'
import {FlatList, Animated, Dimensions, View, Image} from 'react-native'

export default function Slider({style, productImageList}) {
  const width = Dimensions.get('window').width

  const scrollX = new Animated.Value(0)

  let position = Animated.divide(scrollX, width)

  const renderProductImage = ({item, index}) => {
    return (
      <View
        style={{
          width: width,
          height: 240,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Image
          source={{uri: item}}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain'
          }}
        />
      </View>
    )
  }
  return (
    <>
      <FlatList
        data={productImageList ? productImageList : null}
        horizontal
        renderItem={renderProductImage}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.8}
        snapToInterval={width}
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false}
        )}
      />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
          marginTop: 32
        }}>
        {productImageList
          ? productImageList.map((data, index) => {
              let opacity = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0.2, 1, 0.2],
                extrapolate: 'clamp'
              })
              return (
                <Animated.View
                  key={index}
                  style={{
                    width: '16%',
                    height: 2.4,
                    backgroundColor: style.colors.primaryForeground,
                    opacity,
                    marginHorizontal: 4,
                    borderRadius: 100
                  }}></Animated.View>
              )
            })
          : null}
      </View>
    </>
  )
}
