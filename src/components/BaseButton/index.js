import React, {Component, PureComponent} from 'react'
import {TouchableOpacity} from 'react-native'
import BaseText from '../BaseText'
import Icon from '../Icon'

export default class BaseButton extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLock: false
    }
    this.timerID = null
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
    const {isLock} = this.state
    return (
      <TouchableOpacity
        onPress={this.onPressAction}
        style={[styleContainer, {flexDirection: 'row'}]}
        disabled={disabled || isLock}>
        {iconLeft && (
          <Icon
            name={iconLeft.name}
            color={styleText.color}
            size={iconLeft.size}
          />
        )}
        <BaseText style={styleText}>{text}</BaseText>
        {iconRight && (
          <Icon
            name={iconRight.name}
            color={styleText.color}
            size={iconRight.size}
          />
        )}
      </TouchableOpacity>
    )
  }
}
