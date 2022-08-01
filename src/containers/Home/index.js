import React, {Component} from 'react'
import {Text, View} from 'react-native'

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const theme = this.props.route.params
    return (
      <View
        style={[
          {
            backgroundColor: theme.primaryBackground,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }
        ]}>
        <Text style={{fontSize: 50}}>Home</Text>
      </View>
    )
  }
}
