import React, {Component} from 'react'
import {View, ImageBackground, StyleSheet, Alert} from 'react-native'
import {helper} from '@common'
import {constant} from '@constants'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import {KeyboardView, BaseText} from '@components'
import {OTP_SCR} from 'src/constants/constant'

const passwordRegex = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,}$/
)
const regExpPhone = new RegExp(/^[0]\d{9}$/)

class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      phoneNumber: '',
      newPassword: '',
      confirmedPassword: '',
      isShowNewPassword: false,
      isShowConfirmedPassword: false
    }
  }

  initFocus = () => {
    if (helper.isValidObject(this.inputUser)) {
      this.inputUser.focus()
      this.inputUser.blur()
    }
  }

  componentDidMount() {
    this.initFocus()
  }

  componentDidUpdate(preProps, preState) {}

  onSubmit = () => {
    this.props.navigation.navigate(OTP_SCR)
    // const { userName, phoneNumber, newPassword, confirmedPassword } = this.state
    // if (helper.isEmptyString(userName)) {
    //   Alert.alert('', 'Vui lòng nhập tên đăng nhập')
    // } else if (helper.isEmptyString(phoneNumber)) {
    //   Alert.alert('', 'Vui lòng nhập số điện thoại')
    // } else {
    //   const isValidatePhone = regExpPhone.test(phoneNumber)
    //   if (!isValidatePhone) {
    //     Alert.alert('', 'Vui lòng nhập số điện thoại đúng 10 chữ số')
    //   } else if (!helper.isValidatePhonePrefix(phoneNumber)) {
    //     Alert.alert('', 'Vui lòng nhập đúng đầu số điện thoại')
    //   } else if (helper.isEmptyString(newPassword)) {
    //     Alert.alert('', 'Vui lòng nhập mật khẩu mới')
    //   } else if (newPassword.length < 8 || !passwordRegex.test(newPassword)) {
    //     Alert.alert(
    //       '',
    //       'Mật khẩu mới phải ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số'
    //     )
    //   } else if (newPassword != confirmedPassword) {
    //     Alert.alert('', 'Mật khẩu không trùng khớp, vui lòng nhập lại')
    //   } else {
    // showBlockUI()
    // createOTP(userName, phoneNumber)
    //   .then((success) => {
    //     hideBlockUI()
    //     this.props.navigation.navigate('OtpInput', {
    //       userName,
    //       phoneNumber,
    //       newPassword
    //     })
    //   })
    //   .catch((msgError) => {
    //     if (msgError == 'locked account') {
    //       Alert.alert(
    //         '',
    //         'Tài khoản của bạn đã bị khóa do nhập sai mã OTP nhiều lần, liên hệ bộ phận IT để mở khóa',
    //         [
    //           {
    //             text: 'OK',
    //             style: 'cancel',
    //             onPress: () => {
    //               hideBlockUI()
    //               this.props.navigation.goBack()
    //             }
    //           }
    //         ]
    //       )
    //     } else
    //       Alert.alert(
    //         translate('common.notification_uppercase'),
    //         msgError,
    //         [
    //           {
    //             text: translate('common.btn_skip'),
    //             style: 'cancel',
    //             onPress: hideBlockUI
    //           },
    //           {
    //             text: translate('common.btn_notify_try_again'),
    //             style: 'default',
    //             onPress: this.onSubmit
    //           }
    //         ]
    //       )
    //   })
    //   }
    // }
  }

  render() {
    const {
      userName,
      phoneNumber,
      newPassword,
      confirmedPassword,
      isShowNewPassword,
      isShowConfirmedPassword
    } = this.state
    const {style} = this.props.route.params
    return (
      <KeyboardView>
        <ImageBackground style={{flex: 1}} source={{uri: 'background_login'}}>
          <View style={style.containerFlex}>
            <View
              style={{
                flex: 1,
                paddingTop: constant.calcHeight(80),
                alignContent: 'center',
                alignItems: 'center'
              }}>
              <View
                style={{
                  paddingVertical: constant.calcHeight(10),
                  paddingHorizontal: constant.calcWidth(20),
                  marginTop: constant.calcHeight(10),
                  alignItems: 'center',
                  backgroundColor: 'white',
                  width: constant.width - 60,
                  borderRadius: constant.calcWidth(15)
                }}>
                <View
                  style={{
                    borderBottomColor: '#CCCCCC',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    width: constant.width - 60,
                    alignItems: 'center',
                    paddingBottom: constant.calcHeight(5)
                  }}>
                  <BaseText
                    text={'QUÊN MẬT KHẨU'}
                    style={{
                      marginTop: constant.calcHeight(5),
                      fontWeight: 'bold'
                    }}
                  />
                </View>

                <BaseText
                  text={
                    'Nhập tài khoản và số điện thoại của bạn vào phía dưới và ấn xác nhận để lấy mã OTP qua tin nhắn SMS'
                  }
                  style={{
                    marginTop: constant.calcHeight(10)
                  }}
                />

                <View style={{marginTop: 10}}>
                  <FormInput
                    icon={{uri: 'person-outline'}}
                    placeholder={'Tên đăng nhập'}
                    _inputRef={(ref) => (this.inputUser = ref)}
                    onSubmitEditing={(event) => {
                      this.inputPhoneNumber.focus()
                    }}
                    onChangeText={(username) =>
                      this.setState({
                        userName: username
                      })
                    }
                    value={userName}
                    autoFocus={true}
                  />
                  <FormInput
                    icon={{
                      uri: 'call-outline'
                    }}
                    _inputRef={(ref) => (this.inputPhoneNumber = ref)}
                    placeholder={'Số điện thoại'}
                    onSubmitEditing={() => {
                      this.inputNewPassword.focus()
                    }}
                    onChangeText={(phoneNumber) =>
                      this.setState({
                        phoneNumber: phoneNumber[0] == '0' ? phoneNumber : ''
                      })
                    }
                    value={phoneNumber}
                    autoFocus={false}
                    keyboardType={'numeric'}
                  />
                  <FormInput
                    icon={{uri: 'lock-closed-outline'}}
                    _inputRef={(ref) => (this.inputNewPassword = ref)}
                    placeholder={'Mật khẩu mới'}
                    secureTextEntry={!isShowNewPassword}
                    onSubmitEditing={() => this.inputConfirmedPassword.focus()}
                    onChangeText={(password) =>
                      this.setState({
                        newPassword: password
                      })
                    }
                    value={newPassword}
                    isPassword={true}
                    isShowPassword={isShowNewPassword}
                    onPress={() =>
                      this.setState({isShowNewPassword: !isShowNewPassword})
                    }
                  />
                  <FormInput
                    icon={{
                      uri: 'shield-checkmark'
                    }}
                    _inputRef={(ref) => (this.inputConfirmedPassword = ref)}
                    placeholder={'Nhập lại mật khẩu mới'}
                    secureTextEntry={!isShowConfirmedPassword}
                    onSubmitEditing={this.onSubmit}
                    onChangeText={(password) =>
                      this.setState({
                        confirmedPassword: password
                      })
                    }
                    value={confirmedPassword}
                    autoFocus={false}
                    isPassword={true}
                    isShowPassword={isShowConfirmedPassword}
                    onPress={() =>
                      this.setState({
                        isShowConfirmedPassword: !isShowConfirmedPassword
                      })
                    }
                  />
                </View>

                <View
                  style={{
                    height: constant.calcHeight(25),
                    marginTop: -10
                  }}>
                  <BaseText
                    text={
                      helper.isNonEmptyString(newPassword) &&
                      newPassword.length < 8
                        ? 'Mật khẩu phải có tối thiểu 8 ký tự'
                        : newPassword.length >= 8 &&
                          !passwordRegex.test(newPassword)
                        ? 'Mật khẩu phải bao gồm chữ hoa, chữ thường và số'
                        : ''
                    }
                    style={{
                      marginBottom: constant.calcHeight(10),
                      color: '#F50537'
                    }}
                  />
                </View>

                <View style={{flexDirection: 'row'}}>
                  <FormButton
                    title={'Hủy'}
                    onPress={() => {
                      this.props.navigation.goBack()
                    }}
                    width={constant.calcWidth(120)}
                  />
                  <FormButton
                    title={'Xác nhận'}
                    onPress={this.onSubmit}
                    width={constant.calcWidth(120)}
                  />
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </KeyboardView>
    )
  }
}

export default ForgotPassword
