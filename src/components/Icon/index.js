import React, {PureComponent} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

class Icon extends PureComponent {
  render() {
    const {name, style, size, color} = this.props
    const iconColor = color
    const iconSize = size

    return (
      <Ionicons
        name={name}
        size={iconSize}
        color={iconColor}
        style={style}
        {...this.props}
      />
    )
  }
}

export default Icon
