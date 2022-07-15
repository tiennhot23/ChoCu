import React, {Component} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {withTheme} from 'react-native-paper'
import {connect} from 'react-redux'
import {POST_SCR} from 'src/constants/constant'
import {ThemeConsumer} from 'src/context/ThemeContext'

import dynamicStyle from './style'

class Home extends Component {
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
            <TouchableOpacity
              style={style.container}
              onPress={() => {
                this.props.navigation.navigate(POST_SCR)
              }}>
              <Text style={{fontSize: 50}}>{'go to post screen'}</Text>
            </TouchableOpacity>
          )
        }}
      </ThemeConsumer>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
