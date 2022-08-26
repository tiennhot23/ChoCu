import {helper} from '@common'
import {constant} from '@constants'
import React, {Component} from 'react'
import {I18nManager, Keyboard, StyleSheet, View} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {requestUserData, saveUser} from '../CurrentUser/action'
import * as LoginActionCreator from './action'
import * as AppNavigateActionCreator from '../AppNavigate/action'
import FormMessage from './components/FormMessage'
import FormInput from './components/FormInput'
import FormButton from './components/FormButton'
import {
  ADMIN_LOGIN_SCR,
  FORGOT_PASSWORD_SCR,
  HOME_SCR,
  SIGN_UP_SCR
} from 'src/constants/constant'
import {BaseText} from '@components'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: props.route.params,
      messageErrorLogin: '',
      language: 'vi',
      userName: '',
      passWord: '',
      isShowPassword: false,
      rememberAccount: false
    }
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
    if (!helper.isNonEmptyString(userName)) {
      this.setState({messageErrorLogin: 'Username not empty'})
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

  backToHome = () => {
    if (this.props.mainStack) this.props.navigation.goBack()
    else {
      this.props.appNavigate.navigateToMainScreen()
    }
  }

  componentDidMount() {
    this.initFocus()
    // this.setState({ language: getCurrentLocaleLanguage() })
  }

  componentDidUpdate(preProps, preState) {
    const {isFetching} = this.props
    if (preProps.isFetching !== isFetching) {
      if (!isFetching) {
        const {message, isError} = this.props
        if (isError) {
          // hideBlockUI()
          this.setState({messageErrorLogin: message})
        } else {
          // hideBlockUI()

          const {getDataCurrentUser} = this.props
          getDataCurrentUser()
          if (this.props.mainStack) this.props.navigation.goBack()
          else this.props.appNavigate.navigateToMainScreen()
        }
      }
    }
  }

  render() {
    const {theme} = this.state
    const {navigate} = this.props.navigation
    const style = initStyle(theme)
    const {userName, passWord, isShowPassword, messageErrorLogin} = this.state
    return (
      <View style={style.wrapper}>
        <View style={style.container}>
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
              text={'Quên mật khẩu?'}
              onPress={() =>
                navigate(FORGOT_PASSWORD_SCR, {
                  style: style
                })
              }
            />
          </View>

          <FormButton
            title="Đăng nhập"
            color={theme.primaryForeground}
            textColor={theme.primaryButtonText}
            onPress={this.doActionLogin}
          />

          <FormButton
            title="Quay lại"
            color={theme.secondaryText}
            textColor={theme.primaryButtonText}
            onPress={this.backToHome}
          />

          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              paddingVertical: 4
            }}>
            <BaseText color={theme.primaryText} text={'Chưa có tài khoản? '}>
              <BaseText
                color={theme.blue}
                text={'Đăng ký'}
                onPress={() =>
                  navigate(SIGN_UP_SCR, {
                    style: style
                  })
                }
              />
            </BaseText>
          </View>
        </View>
      </View>
    )
  }
}
const mapStateToProps = (state) => ({
  isFetching: state.loginReducer.isFetching,
  message: state.loginReducer.message,
  isError: state.loginReducer.isError,
  mainStack: state.appNavigateReducer.mainStack
})

const mapDispatchToProps = (dispatch) => ({
  loginAction: bindActionCreators(LoginActionCreator, dispatch),

  getDataCurrentUser: bindActionCreators(requestUserData, dispatch),
  appNavigate: bindActionCreators(AppNavigateActionCreator, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const initStyle = (theme) => {
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: theme.primaryBackground
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: theme.primaryForeground,
      marginTop: 25,
      marginBottom: 20,
      alignSelf: 'stretch',
      textAlign: 'left',
      marginLeft: 30
    },
    back_arrow: {
      marginTop: Platform.OS === 'ios' ? 50 : 20,
      marginLeft: 10,
      transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    bold_text: {
      color: theme.primaryForeground,
      marginLeft: 4,
      fontWeight: 'bold'
    },

    containerFlex: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center'
    },
    cotainerScrollView: {
      paddingTop: constant.calcWidth(114),
      paddingBottom: constant.calcWidth(300)
    },
    wrap_container: {
      height: constant.calcWidth(43),
      width: constant.calcWidth(255),
      flexDirection: 'row',
      marginBottom: constant.calcWidth(20)
    },
    ic_logo: {
      width: constant.calcWidth(70),
      height: constant.calcWidth(70),
      marginBottom: constant.calcWidth(5)
    },
    container_icon: {
      height: constant.calcWidth(43),
      width: constant.calcWidth(45),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4
    },
    container_input: {
      height: constant.calcWidth(43),
      width: constant.calcWidth(207),
      marginLeft: constant.calcWidth(3),
      backgroundColor: 'white',
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 8
    },
    button: {
      width: constant.calcWidth(189),
      height: constant.calcWidth(45),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'yellow',
      borderRadius: constant.calcWidth(50),
      marginBottom: constant.calcWidth(20),
      marginHorizontal: constant.calcWidth(10)
    },
    container_qrcode: {
      height: constant.calcWidth(50),
      width: constant.calcWidth(178),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: constant.calcWidth(36)
    },
    containerViewLogin: {
      backgroundColor: 'transparent',
      flex: 1,
      height: constant.calcHeight(100),
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
}
