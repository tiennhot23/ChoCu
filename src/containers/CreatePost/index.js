import React, {Component} from 'react'
import {Text, View} from 'react-native'
import ThemeContext, {ThemeConsumer} from 'src/context/ThemeContext'
import dynamicStyle from './style'

export default class CreatePost extends Component {
  static contextType = ThemeContext

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <ThemeConsumer>
        {(theme) => {
          const style = dynamicStyle(theme)
          return (
            <View style={style.container}>
              <Text style={{fontSize: 50}}>{theme.tag}</Text>
            </View>
          )
        }}
      </ThemeConsumer>
    )
  }
}
