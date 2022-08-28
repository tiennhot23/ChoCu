import React, {Component} from 'react'
import {View, ImageBackground, StyleSheet, Alert} from 'react-native'

import auth from '@react-native-firebase/auth'
import {helper} from '@common'
import {constant} from '@constants'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import {KeyboardView, BaseText, BaseLoading} from '@components'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {requestActionCreateAccount} from 'src/containers/OTP/action'

const passwordRegex = new RegExp(
  // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,}$/
  /^(?=.{10,}$)(?=.*[A-Za-z])(?=.*[0-9])(?=.*\W).*$/
)
const phoneRegex = new RegExp(/^[0]\d{9}$/)
const otpRegex = new RegExp(/\d{6}$/)

class CreateAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',
      otpCode: '',
      newPassword: '',
      isShowNewPassword: false,
      isLoading: false,
      showPhoneForm: true,
      showOTPForm: false,
      confirm: null
    }
  }

  onSubmit = async () => {
    try {
      const {phoneNumber} = this.state
      const confirmation = await auth().signInWithPhoneNumber(
        '+84' + phoneNumber.slice(1, 10)
      )
      this.setState({
        confirm: confirmation,
        showOTPForm: true,
        showPhoneForm: false
      })
    } catch (error) {
      console.log(error)
      if (error.code === 'auth/invalid-phone-number')
        alert('Số điện thoại không hợp lệ')
      else alert('Không thể gửi mã otp')
    }
  }

  onSubmitOTP = async () => {
    const {confirm, otpCode} = this.state
    try {
      await confirm.confirm(otpCode)
      // alert('ok')
      const {createAccount} = this.props
      const {newPassword, phoneNumber} = this.state
      createAccount({phone: phoneNumber, password: newPassword})
    } catch (error) {
      console.log(error)
      alert('Mã xác thực không chính xác hoặc đã hết hiệu lực')
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {goBack} = this.props.navigation
    if (
      prevProps.stateAction.isFetching !== this.props.stateAction.isFetching &&
      !this.props.stateAction.isFetching
    ) {
      if (helper.isNonEmptyString(this.props.stateAction.message)) {
        alert(this.props.stateAction.message)
        this.setState({
          phoneNumber: '',
          otpCode: '',
          newPassword: '',
          isShowNewPassword: false,
          isLoading: false,
          showPhoneForm: true,
          showOTPForm: false,
          confirm: null
        })
      }
      if (this.props.stateAction.isDone) goBack()
      if (this.props.stateAction.message.includes('không thể tạo tài khoản'))
        new Promise((resolve) =>
          setTimeout(() => {
            resolve
            goBack()
          }, 1000)
        )
    }
  }

  render() {
    const {
      phoneNumber,
      otpCode,
      newPassword,
      isShowNewPassword,
      showPhoneForm,
      showOTPForm
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
                        text={'TẠO TÀI KHOẢN'}
                        style={{
                          marginTop: constant.calcHeight(5),
                          fontWeight: 'bold'
                        }}
                      />
                    </View>

                    <BaseText
                      text={
                        'Nhập số điện thoại dùng để đăng ký tài khoản và mật khẩu sau đó ấn xác nhận để lấy mã OTP'
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
                          color: '#F50537'
                        }}
                      />
                    </View>
                    <View>
                      <FormInput
                        icon={{uri: 'lock-closed-outline'}}
                        _inputRef={(ref) => (this.inputNewPassword = ref)}
                        placeholder={'Mật khẩu'}
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
                        phoneRegex.test(phoneNumber) &&
                        helper.isNonEmptyString(newPassword) &&
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
              </View>
            </View>
          </ImageBackground>
        </BaseLoading>
      </KeyboardView>
    )
  }
}

const mapStateToProps = (state) => ({
  stateAction: state.otpReducer.stateAction
})

const mapDispatchToProps = (dispatch) => ({
  createAccount: bindActionCreators(requestActionCreateAccount, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)
