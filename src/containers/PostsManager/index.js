import React, {Component} from 'react'
import {Text, View} from 'react-native'

class PostsManager extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View
        style={[
          {
            backgroundColor: '#fff666',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }
        ]}>
        <Text style={{fontSize: 50}}>PostsManager</Text>
      </View>
    )
  }
}
export default PostsManager