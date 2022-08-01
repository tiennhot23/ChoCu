import React, {PureComponent} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwsome from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

class Icon extends PureComponent {
  render() {
    const {name, style, size, color, type} = this.props
    const iconColor = color
    const iconSize = size

    return type === 'Entypo' ? (
      <Entypo
        name={name}
        size={iconSize}
        color={iconColor}
        style={style}
        {...this.props}
      />
    ) : type === 'FontAwsome' ? (
      <FontAwsome
        name={name}
        size={iconSize}
        color={iconColor}
        style={style}
        {...this.props}
      />
    ) : type === 'MaterialCommunityIcons' ? (
      <MaterialCommunityIcons
        name={name}
        size={iconSize}
        color={iconColor}
        style={style}
        {...this.props}
      />
    ) : (
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
