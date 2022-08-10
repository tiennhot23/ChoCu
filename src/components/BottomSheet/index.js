import {constant} from '@constants'
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState
} from 'react'
import {Dimensions, View} from 'react-native'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'

const BottomSheet = forwardRef(
  ({children, color = 'black', backgroundColor = 'white'}, ref) => {
    useImperativeHandle(ref, () => ({}))

    const translateY = useSharedValue(0)
    const context = useSharedValue({y: 0})
    const active = useSharedValue(false)

    const scrollTo = useCallback((destination) => {
      'worklet'
      active.value = destination !== 0

      translateY.value = withSpring(destination, {damping: 50})
    }, [])

    const isActive = useCallback(() => {
      return active.value
    }, [])

    useImperativeHandle(ref, () => ({scrollTo, isActive}), [scrollTo, isActive])

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = {y: translateY.value}
      })
      .onUpdate((event) => {
        translateY.value = Math.max(
          event.translationY + context.value.y,
          -constant.height
        )
      })
      .onEnd(() => {
        if (translateY.value > -constant.height / 3) {
          scrollTo(0)
        } else if (translateY.value < -constant.height / 1.5) {
          scrollTo(-constant.height)
        }
      })

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateY: translateY.value}]
      }
    })

    const backgroundStyle = useAnimatedStyle(() => {
      return {
        height: interpolate(active.value, [false, true], [0, constant.height])
      }
    })

    return (
      <>
        <Animated.View
          style={[
            {
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundColor: 'rgba(0,0,0,0.5)'
            },
            backgroundStyle
          ]}
        />
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[
              {
                height: constant.height,
                width: '100%',
                backgroundColor: 'red',
                position: 'absolute',
                top: constant.height,
                borderTopStartRadius: 25,
                borderTopEndRadius: 25
              },
              animatedStyle
            ]}>
            {children}
          </Animated.View>
        </GestureDetector>
      </>
    )
  }
)

export default BottomSheet
