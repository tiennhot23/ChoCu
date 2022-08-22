import React, {Component} from 'react'
import {View, ImageBackground, StyleSheet, Alert} from 'react-native'
import {helper} from '@common'
import {constant} from '@constants'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import {KeyboardView, BaseText, BaseLoading} from '@components'
import {OTP_SCR} from 'src/constants/constant'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  requestActionForgotPassword,
  requestGetOTP,
  requestVerifyOTP
} from 'src/containers/OTP/action'

const passwordRegex = new RegExp(
  // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,}$/
  /^(?=.{10,}$)(?=.*[A-Za-z])(?=.*[0-9])(?=.*\W).*$/
)
const phoneRegex = new RegExp(/^[0]\d{9}$/)
const otpRegex = new RegExp(/\d{6}$/)

class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      phoneNumber: '',
      otpCode: '',
      newPassword: '',
      confirmedPassword: '',
      isShowNewPassword: false,
      isShowConfirmedPassword: false,
      isLoading: false,
      showPhoneForm: true,
      showOTPForm: false,
      showPasswordForm: false
    }
  }

  onSubmitPhone = () => {
    const {getOtp} = this.props
    const {phoneNumber} = this.state
    getOtp({phone: phoneNumber})
  }

  onSubmitOTP = () => {
    const {verifyOtp} = this.props
    const {otpCode} = this.state
    verifyOtp({otp_code: otpCode})
  }

  componentDidUpdate(prevProps, prevState) {
    const {goBack} = this.props.navigation
    if (
      prevProps.stateOtp.isFetching !== this.props.stateOtp.isFetching &&
      !this.props.stateOtp.isFetching &&
      !this.props.stateOtp.isError
    ) {
      if (this.props.dataOtp.verified) {
        this.setState({
          showOTPForm: false,
          showPasswordForm: true
        })
      } else {
        const {dataOtp} = this.props
        this.setState({
          showPhoneForm: false,
          showOTPForm: true
        })
        global._notify.localNotify({
          title: 'Mã OTP',
          message: dataOtp.otp_code
        })
      }
    } else if (
      prevProps.stateOtp.isFetching !== this.props.stateOtp.isFetching &&
      !this.props.stateOtp.isFetching
    ) {
      if (this.props.stateOtp.isError) {
        alert(this.props.stateOtp.message)
        if (this.props.stateOtp.message.includes('hết hiệu lực'))
          this.setState({
            showPhoneForm: true,
            showOTPForm: false
          })
      } else if (this.props.stateAction.isError)
        alert(this.props.stateAction.message)
    }

    if (
      prevProps.stateAction.isFetching !== this.props.stateAction.isFetching &&
      !this.props.stateAction.isFetching
    ) {
      if (helper.isNonEmptyString(this.props.stateAction.message))
        alert(this.props.stateAction.message)
      if (this.props.stateAction.isDone) goBack()
      if (this.props.stateAction.message.includes('không tồn tại'))
        new Promise((resolve) =>
          setTimeout(() => {
            resolve
            goBack()
          }, 1000)
        )
    }
  }

  onSubmit = () => {
    const {newPassword, confirmedPassword} = this.state
    if (newPassword != confirmedPassword) {
      alert('Mật khẩu không trùng khớp, vui lòng nhập lại')
      return
    }
    const {resetPassword} = this.props
    resetPassword({password: newPassword})
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
      otpCode,
      newPassword,
      confirmedPassword,
      isShowNewPassword,
      isShowConfirmedPassword,
      showPhoneForm,
      showOTPForm,
      showPasswordForm
    } = this.state
    const {style} = this.props.route.params
    return (
      <KeyboardView>
        <BaseLoading isLoading={this.state.isLoading}>
          <ImageBackground style={{flex: 1}} source={{uri: 'background_login'}}>
            <View style={style.containerFlex}>
              <View
                style={{
                  flex: 1,
                  paddingTop: constant.calcHeight(80),
                  alignContent: 'center',
                  alignItems: 'center'
                }}>
                {showPhoneForm && (
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
                        'Nhập số điện thoại của bạn vào phía dưới và ấn xác nhận để lấy mã OTP'
                      }
                      style={{
                        marginTop: constant.calcHeight(10)
                      }}
                    />

                    <View style={{marginTop: 10}}>
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
                            phoneNumber:
                              phoneNumber[0] == '0' ? phoneNumber : ''
                          })
                        }
                        value={phoneNumber}
                        autoFocus={false}
                        keyboardType={'numeric'}
                      />
                    </View>

                    <View
                      style={{
                        height: constant.calcHeight(25),
                        marginTop: -10
                      }}>
                      <BaseText
                        text={
                          helper.isNonEmptyString(phoneNumber) &&
                          !phoneRegex.test(phoneNumber)
                            ? 'Số điên thoại không đúng định dạng'
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
                      {helper.isNonEmptyString(phoneNumber) &&
                        phoneRegex.test(phoneNumber) && (
                          <FormButton
                            title={'Xác nhận'}
                            onPress={this.onSubmitPhone}
                            width={constant.calcWidth(120)}
                          />
                        )}
                    </View>
                  </View>
                )}
                {showOTPForm && (
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
                        text={'XÁC THỰC OTP'}
                        style={{
                          marginTop: constant.calcHeight(5),
                          fontWeight: 'bold'
                        }}
                      />
                    </View>

                    <BaseText
                      text={'Nhập mã OTP vừa nhận để xác thực'}
                      style={{
                        marginTop: constant.calcHeight(10)
                      }}
                    />

                    <View style={{marginTop: 10}}>
                      <FormInput
                        icon={{uri: 'shield-checkmark'}}
                        placeholder={'OTP'}
                        onChangeText={(otpCode) =>
                          this.setState({
                            otpCode: otpCode
                          })
                        }
                        value={otpCode}
                        autoFocus={true}
                      />
                    </View>

                    <View
                      style={{
                        height: constant.calcHeight(25),
                        marginTop: -10
                      }}>
                      <BaseText
                        text={
                          helper.isNonEmptyString(otpCode) &&
                          !otpRegex.test(otpCode)
                            ? 'Mã OTP chỉ bao gồm 6 số'
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
                      {helper.isNonEmptyString(otpCode) &&
                        otpRegex.test(otpCode) && (
                          <FormButton
                            title={'Xác nhận'}
                            onPress={this.onSubmitOTP}
                            width={constant.calcWidth(120)}
                          />
                        )}
                    </View>
                  </View>
                )}
                {showPasswordForm && (
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
                        text={'ĐẶT LẠI MẬT KHẨU'}
                        style={{
                          marginTop: constant.calcHeight(5),
                          fontWeight: 'bold'
                        }}
                      />
                    </View>

                    <BaseText
                      text={'Nhập mật khẩu mới'}
                      style={{
                        marginTop: constant.calcHeight(10)
                      }}
                    />

                    <View style={{marginTop: 10}}>
                      <FormInput
                        icon={{uri: 'lock-closed-outline'}}
                        _inputRef={(ref) => (this.inputNewPassword = ref)}
                        placeholder={'Mật khẩu mới'}
                        secureTextEntry={!isShowNewPassword}
                        onSubmitEditing={() =>
                          this.inputConfirmedPassword.focus()
                        }
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
                      {helper.isNonEmptyString(newPassword) &&
                        newPassword.length >= 8 &&
                        passwordRegex.test(newPassword) && (
                          <FormButton
                            title={'Xác nhận'}
                            onPress={this.onSubmit}
                            width={constant.calcWidth(120)}
                          />
                        )}
                    </View>
                  </View>
                )}
              </View>
            </View>
          </ImageBackground>
        </BaseLoading>
      </KeyboardView>
    )
  }
}

const mapStateToProps = (state) => ({
  dataOtp: state.otpReducer.dataOtp,
  stateOtp: state.otpReducer.stateOtp,
  stateAction: state.otpReducer.stateAction
})

const mapDispatchToProps = (dispatch) => ({
  getOtp: bindActionCreators(requestGetOTP, dispatch),
  verifyOtp: bindActionCreators(requestVerifyOTP, dispatch),
  resetPassword: bindActionCreators(requestActionForgotPassword, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
