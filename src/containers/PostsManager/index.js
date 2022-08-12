import {Button} from '@components'
import {dimen} from '@styles'
import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {connect} from 'react-redux'
import {CREATE_POST_SCR} from 'src/constants/constant'
import FormButton from './components/FormButton'

class PostsManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: this.props.route.params
    }
  }

  render() {
    const {theme} = this.state
    const {navigate} = this.props.navigation
    const style = initStyle(theme)
    return (
      <View style={[style.wrapper]}>
        <FormButton
          title={'Tạo bài đăng mới'}
          onPress={() => navigate(CREATE_POST_SCR)}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(PostsManager)

const initStyle = (theme) => {
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      padding: dimen.wrapper_padding,
      backgroundColor: theme.primaryBackground,
      padding: dimen.wrapper_padding,
      alignItems: 'center'
    },
    header: {
      paddingVertical: dimen.wrapper_padding,
      borderBottomWidth: 0.7,
      borderBottomColor: theme.primaryForeground,
      flex: 1,
      flexDirection: 'row'
    }
  })
}
