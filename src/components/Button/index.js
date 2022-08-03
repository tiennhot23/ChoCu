import React, {PureComponent} from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native'
import {Icon} from '@components'
import {helper} from '@common'

class Button extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      focusAnimation: new Animated.Value(0),
      isLock: false
    }
    this.timerID = null
  }

  onPressIn = () => {
    const {focusAnimation} = this.state
    Animated.timing(focusAnimation, {
      toValue: 1,
      duration: 225,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true
    }).start()
  }

  onPressOut = () => {
    const {focusAnimation} = this.state
    Animated.timing(focusAnimation, {
      toValue: 0,
      duration: 225,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true
    }).start()
  }

  onPressAction = () => {
    const {onPress} = this.props
    if ('function' === typeof onPress) {
      this.timerID = setTimeout(() => {
        this.setState({isLock: false})
      }, 500)
      this.setState({isLock: true}, onPress)
    }
  }

  componentWillUnmount() {
    if (this.timerID) {
      clearTimeout(this.timerID)
    }
  }

  render() {
    const {styleContainer, disabled, iconLeft, iconRight, styleText, text} =
      this.props
    const {focusAnimation, isLock} = this.state
    const shadeStyle = {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: styleText.color,
      borderRadius: styleContainer.borderRadius,
      opacity: focusAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.2]
      })
    }
    const styleShadow = Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: focusAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 2]
          })
        },
        shadowOpacity: focusAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 0]
        }),
        shadowRadius: focusAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 8]
        })
      },
      android: {
        elevation: focusAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 12]
        }),
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 8
      }
    })
    return (
      <TouchableOpacity
        // onPressIn={this.onPressIn}
        // onPressOut={this.onPressOut}
        onPress={this.onPressAction}
        style={[
          styleContainer,
          !!styleContainer.backgroundColor && styleShadow
        ]}
        disabled={disabled || isLock}>
        {!helper.isEmpty(iconLeft) && (
          <Icon
            name={iconLeft.name}
            color={styleText.color}
            size={iconLeft.size}
          />
        )}
        <Text style={styleText}>{text}</Text>
        {!helper.isEmpty(iconRight) && (
          <Icon
            name={iconRight.name}
            color={styleText.color}
            size={iconRight.size}
          />
        )}
        {/* <Animated.View style={shadeStyle} /> */}
      </TouchableOpacity>
    )
  }
}

export default Button
