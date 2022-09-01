import {helper} from '@common'
import {
  AnimatedDropdown,
  BaseLoading,
  BottomSheet,
  Input,
  KeyboardView,
  ModalLoading
} from '@components'
import {constant} from '@constants'
import {dimen} from '@styles'
import React, {
  Component,
  createRef,
  forwardRef,
  useImperativeHandle
} from 'react'
import {
  Alert,
  AppState,
  BackHandler,
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Checkbox} from 'react-native-paper'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {requestCategories, requestDetails} from '../Categories/action'
import {requestUpdateUserInfo} from '../CurrentUser/action'
import {requestCreatePost} from '../Post/action'
import AddressSelection from './components/AddressSelection'
import FilePicker from './components/FilePicker'
import FormButton from './components/FormButton'

class EditInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: this.props.route.params,
      address: '',
      avatar: null
    }
    this.nameRef = createRef()
    this.emailRef = createRef()
    this.addressSelectionRef = null
    this.backToHome = props.route.params.backToHome
  }

  openAddressSeletion = () => {
    const isActive = this.addressSelectionRef?.isActive()
    if (isActive) {
      this.addressSelectionRef?.scrollTo(0)
    } else {
      this.addressSelectionRef?.scrollTo(-500)
    }
  }

  bindCallbackRef = (ref) => {
    //callback ref
    this.addressSelectionRef = ref
  }

  onFilePicked = (file) => {
    this.setState({avatar: file})
  }

  onSubmit = () => {
    const {updateUserInfo} = this.props
    const data = {
      name: this.nameRef.current.getText(),
      email: this.emailRef.current.getText(),
      address: this.state.address,
      avatar: this.state.avatar
    }
    if (!this.validateRequest(data)) return

    let formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('address', data.address)
    if (data.avatar)
      formData.append('avatar', {
        uri: data.avatar.uri,
        name: data.avatar.fileName,
        type: 'image/jpeg'
      })
    updateUserInfo({formData})
  }

  backAction = () => {
    // if (this.backToHome) {
    //   alert('Vui lòng cập nhật đầy đủ các thông tin cần thiết')
    //   return null
    // } else return true
    Alert.alert('', 'Vui lòng cập nhật đầy đủ các thông tin cần thiết', [
      {
        text: 'OK',
        onPress: () => null,
        style: 'cancel'
      }
    ])
    return true
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction
    )
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  componentDidUpdate(prevProps, prevState) {
    const {goBack} = this.props.navigation
    if (
      // prevProps.stateUser.isFetching !== this.props.stateUser.isFetching &&
      // prevProps.stateUser.isFetching &&
      // !this.props.stateUser.isError
      prevProps.stateUser.isActioning !== this.props.stateUser.isActioning &&
      prevProps.stateUser.isActioning &&
      this.props.stateUser.isActionDone
    )
      goBack()
  }

  validateRequest(data) {
    if (!data.name || helper.isEmptyString(data.name.trim())) {
      this.nameRef.current.alertMessage('Họ và tên không được để trống')
      return false
    }
    if (!data.email || helper.isEmptyString(data.email.trim())) {
      this.emailRef.current.alertMessage('Email không được để trống')
      return false
    }
    return true
  }

  render() {
    const {currentUser, stateUser} = this.props
    const {theme, address} = this.state
    const style = initStyle(theme)
    return (
      <GestureHandlerRootView
        style={{flex: 1, backgroundColor: theme.primaryBackground}}>
        <KeyboardView>
          <BaseLoading isLoading={stateUser.isFetching}>
            <ModalLoading loading={stateUser.isActioning} />
            <View
              style={[
                {
                  backgroundColor: theme.primaryBackground,
                  flex: 1,
                  alignItems: 'center'
                }
              ]}>
              <FilePicker
                title={'Choose avatar'}
                icon={'image-outline'}
                onPicked={this.onFilePicked}
                defaultFileUrl={currentUser?.avatar}
              />
              <Input
                title={'Họ và tên'}
                required
                _text={
                  currentUser?.name === 'Chưa cung cấp' ? '' : currentUser?.name
                }
                ref={this.nameRef}
                placeholder={'Họ tên'}
              />
              <Input
                title={'Số điện thoại'}
                editable={false}
                placeholder={currentUser?.phone}
              />
              <Input
                title={'Email'}
                required
                ref={this.emailRef}
                _text={
                  currentUser?.email === 'Chưa cung cấp'
                    ? ''
                    : currentUser?.email
                }
                placeholder={'Email'}
              />
              <Input
                title={'Địa chỉ'}
                _text={address}
                placeholder={currentUser?.address}
                editable={false}
                onPress={this.openAddressSeletion}
              />
              <FormButton title={'Lưu thay đổi'} onPress={this.onSubmit} />
            </View>
          </BaseLoading>
        </KeyboardView>
        <AddressSelection
          bindCallbackRef={this.bindCallbackRef}
          setAddress={(address) => {
            this.setState({address: address})
            this.addressSelectionRef?.scrollTo(0)
          }}
        />
      </GestureHandlerRootView>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUserReducer.userData,
  stateUser: state.currentUserReducer.stateUser
})

const mapDispatchToProps = (dispatch) => ({
  updateUserInfo: bindActionCreators(requestUpdateUserInfo, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(EditInfo)

const initStyle = (theme) => {
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      padding: dimen.wrapper_padding,
      backgroundColor: theme.primaryBackground,
      padding: dimen.wrapper_padding
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
