import {BaseText, Icon, KeyboardView} from '@components'
import React, {Component} from 'react'
import {TouchableOpacity, View, ImageBackground, Keyboard} from 'react-native'
import {withTheme} from 'react-native-paper'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {helper} from '@common'
import {constant} from '@constants'

import dynamicStyle from './style'
import * as LoginActionCreator from './action'
import FormMessage from './components/FormMessage'
import FormInput from './components/FormInput'
import FormButton from './components/FormButton'
import {FORGOT_PASSWORD_SCR, SIGN_UP_SCR} from 'src/constants/constant'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      themeTag: this.props.theme.tag,
      style: dynamicStyle(this.props.theme),
      messageErrorLogin: '',
      language: 'vi',
      userName: '',
      passWord: '',
      isShowPassword: false,
      rememberAccount: false
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

  initFocus = () => {
    if (helper.isValidObject(this.inputUser)) {
      this.inputUser.focus()
      this.inputUser.blur()
    }
  }

  clearErrorMessage = () => {
    this.setState({messageErrorLogin: ''})
  }

  doActionLogin = () => {
    const {loginAction} = this.props
    const {userName, passWord} = this.state
    this.clearErrorMessage()
    const regExpUser = new RegExp(/^0/)
    if (!helper.isNonEmptyString(userName)) {
      this.setState({messageErrorLogin: 'Username not empty'})
      return
    }
    if (!regExpUser.test(userName)) {
      this.setState({messageErrorLogin: 'Username or password incorrect'})
      return
    }
    if (!helper.isNonEmptyString(passWord)) {
      this.setState({messageErrorLogin: 'Password not empty'})
      return
    }
    Keyboard.dismiss()
    // showBlockUI()
    loginAction.requestAuthToken({
      username: userName.trim(),
      password: passWord
    })
  }

  componentDidMount() {
    this.initFocus()
    // this.setState({ language: getCurrentLocaleLanguage() })
  }

  componentDidUpdate(preProps, preState) {
    const {isFetching} = this.props
    if (preProps.isFetching !== isFetching) {
      if (!isFetching) {
        const {message, isError, appSwitchAction} = this.props
        if (isError) {
          // hideBlockUI()
          this.setState({messageErrorLogin: message})
        } else {
          // hideBlockUI()
          // storageHelper.setItem(STORAGE_CONST.CURRENT_LANGUAGE, this.state.language)
          // appSwitchAction.switchToMainScreen()
        }
      }
    }
  }

  render() {
    const {userName, passWord, isShowPassword, messageErrorLogin} = this.state
    return (
      <View style={this.state.style.wrapper}>
        <View>
          <TouchableOpacity style={{alignSelf: 'flex-start'}}>
            <Icon
              style={this.state.style.back_arrow}
              name="arrow-back-outline"
              size={32}
              color={this.props.theme.colors.primaryForeground}
            />
          </TouchableOpacity>
          <BaseText style={this.state.style.title} text="Sign In" />
        </View>
        {/* <KeyboardView> */}
        <View style={this.state.style.container}>
          <View>
            <FormInput
              icon={{uri: 'person-outline'}}
              placeholder={'Username'}
              _inputRef={(ref) => (this.inputUser = ref)}
              onSubmitEditing={(event) => {
                this.inputPassword.focus()
              }}
              onChangeText={(username) =>
                this.setState({
                  userName: username,
                  messageErrorLogin: ''
                })
              }
              value={userName}
              autoFocus={true}
            />
            <FormInput
              icon={{uri: 'lock-closed-outline'}}
              _inputRef={(ref) => (this.inputPassword = ref)}
              placeholder={'Password'}
              secureTextEntry={!isShowPassword}
              onSubmitEditing={this.doActionLogin}
              onChangeText={(password) =>
                this.setState({
                  passWord: password,
                  messageErrorLogin: ''
                })
              }
              value={passWord}
              autoFocus={false}
              isPassword={true}
              isShowPassword={isShowPassword}
              onPress={() => this.setState({isShowPassword: !isShowPassword})}
            />
          </View>

          {messageErrorLogin !== '' && (
            <FormMessage message={messageErrorLogin} messageType="error" />
          )}

          <View
            style={{
              width: constant.calcWidth(255),
              marginVertical: constant.calcHeight(15)
            }}>
            <BaseText
              style={this.state.style.bold_text}
              text={'Quên mật khẩu?'}
              onPress={() =>
                this.props.navigation.navigate(FORGOT_PASSWORD_SCR, {
                  style: this.state.style
                })
              }
            />
          </View>

          <FormButton
            title={'Login'}
            color={this.props.theme.colors.primaryButtonBackground}
            textColor={this.props.theme.colors.primaryButtonText}
            onPress={this.doActionLogin}
          />

          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              paddingVertical: 4
            }}>
            <BaseText
              style={{color: this.props.theme.colors.primaryText}}
              text={'Chưa có tài khoản? '}>
              <BaseText
                style={{color: this.props.theme.colors.primaryForeground}}
                text={'Đăng ký'}
                onPress={() => this.props.navigation.navigate(SIGN_UP_SCR)}
              />
            </BaseText>
          </View>
        </View>
        {/* </KeyboardView> */}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.loginReducer.isFetching,
  message: state.loginReducer.message,
  isError: state.loginReducer.isError
})

const mapDispatchToProps = (dispatch) => ({
  loginAction: bindActionCreators(LoginActionCreator, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Login))
