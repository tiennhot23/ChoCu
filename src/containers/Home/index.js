import React, {Component} from 'react'
import {Text, View} from 'react-native'
import {withTheme} from 'react-native-paper'

import dynamicStyle from './style'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      themeTag: this.props.theme.tag,
      style: dynamicStyle(this.props.theme)
    }
  }

  static getDerivedStateFromProps(props, current_state) {
    if (current_state.themeTag !== props.theme.tag) {
      return {
        themeTag: props.theme.tag,
        style: dynamicStyle(props.theme)
      }
    }
    return null
  }

  render() {
    return (
      <View style={this.state.style.container}>
        <Text style={{fontSize: 50}}>{this.state.themeTag}</Text>
      </View>
    )
  }
}

export default withTheme(Home)
