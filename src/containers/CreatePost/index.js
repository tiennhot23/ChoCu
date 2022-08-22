import {helper} from '@common'
import {AnimatedDropdown, BottomSheet, Input, KeyboardView} from '@components'
import {constant} from '@constants'
import {dimen} from '@styles'
import React, {
  Component,
  createRef,
  forwardRef,
  useImperativeHandle
} from 'react'
import {
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
import {requestCreatePost} from '../Post/action'
import AddressSelection from './components/AddressSelection'
import CategorySelection from './components/CategorySelection'
import FilePicker from './components/FilePicker'
import FormButton from './components/FormButton'
import OnlinePaymentCheckBox from './components/OnlinePaymentCheckBox'

class CreatePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: this.props.route.params,
      address: '',
      isOnlinePayment: false,
      picture: null
    }
    this.titleRef = createRef()
    this.defaultPriceRef = createRef()
    this.descriptionRef = createRef()
    this.categorySelectionRef = createRef()
    this.addressSelectionRef = null
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

  onOnlinePaymentChecked = () => {
    this.setState({isOnlinePayment: !this.state.isOnlinePayment})
  }

  onFilePicked = (file) => {
    this.setState({picture: file})
  }

  onSubmit = () => {
    const {createPost} = this.props
    const data = {
      ...this.categorySelectionRef.current.getData(),
      title: this.titleRef.current.getText(),
      defaut_price: this.defaultPriceRef.current.getText(),
      description: this.descriptionRef.current.getText(),
      sell_address: this.state.address,
      online_payment: this.state.isOnlinePayment,
      picture: [this.state.picture]
    }
    if (!this.validateRequest(data)) return

    let formData = new FormData()
    formData.append('title', data.title)
    formData.append('default_price', data.defaut_price)
    formData.append('description', data.description)
    formData.append('sell_address', data.sell_address)
    formData.append('online_payment', data.online_payment)
    data.picture.forEach((file) => {
      formData.append('picture', {
        uri: file.uri,
        name: file.fileName,
        type: 'image/jpeg'
      })
    })
    formData.append('category_id', data.category_id)
    data.details.forEach((item, index) => {
      formData.append(`details[${index}][details_id]`, item.details_id)
      formData.append(`details[${index}][content]`, item.content)
    })
    createPost({formData})
  }

  componentDidUpdate(prevProps, prevState) {
    const {goBack} = this.props.navigation
    if (
      prevProps.statePost.isFetching !== this.props.statePost.isFetching &&
      prevProps.statePost.isFetching &&
      !helper.isEmptyObject(this.props.dataPost)
    )
      goBack()
  }

  validateRequest(data) {
    if (
      !data.picture ||
      helper.isEmptyArray(data.picture) ||
      data.picture[0] === null
    ) {
      alert('Vui lòng chọn ít nhất một ảnh')
      return false
    }
    if (!data.title || helper.isEmptyString(data.title)) {
      this.titleRef.current.alertMessage('Chưa điền tiêu đề bài đăng')
      return false
    }
    if (!data.category_id || helper.isEmptyString(data.category_id)) {
      this.categorySelectionRef.current.alertMessage('Chưa chọn danh mục')
      return false
    }
    if (!data.defaut_price || helper.isEmptyString(data.defaut_price)) {
      this.defaultPriceRef.current.alertMessage('Chưa cung cấp giá')
      return false
    }
    if (!data.description || helper.isEmptyString(data.description)) {
      this.descriptionRef.current.alertMessage('Chưa mô tả mặt hàng')
      return false
    }
    if (!data.sell_address || helper.isEmptyString(data.sell_address)) {
      alert('Chưa chọn địa chỉ bán')
      return false
    }
    return true
  }

  render() {
    const {statePost} = this.props
    const {theme, address} = this.state
    const style = initStyle(theme)
    return (
      <GestureHandlerRootView
        style={{flex: 1, backgroundColor: theme.primaryBackground}}>
        <KeyboardView>
          <Modal visible={statePost.isFetching} transparent>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)'
              }}>
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <ActivityIndicator color={'black'} />
              </View>
            </View>
          </Modal>
          <View
            style={[
              {
                backgroundColor: theme.primaryBackground,
                flex: 1,
                alignItems: 'center'
              }
            ]}>
            <FilePicker
              title={'Pick image'}
              icon={'image-outline'}
              onPicked={this.onFilePicked}
            />
            <Input
              title={'Tiêu đề'}
              required
              ref={this.titleRef}
              placeholder={'Tiêu đề bài đăng'}
            />
            <CategorySelection ref={this.categorySelectionRef} />
            <Input
              title={'Giá'}
              required
              ref={this.defaultPriceRef}
              inputType={'numeric'}
              placeholder={'Giá ban đầu'}
            />
            <Input
              title={'Mô tả'}
              multiline={true}
              placeholder={
                'Mô tả ngắn gọn về mặt hàng giao dịch\nSử dụng các hashtag để tìm kiếm dễ dàng hơn\nVí dụ: #áo '
              }
              required
              height={150}
              ref={this.descriptionRef}
            />
            <Input
              title={'Địa chỉ'}
              _text={address}
              placeholder={'Nơi bán'}
              editable={false}
              required
              onPress={this.openAddressSeletion}
            />
            <OnlinePaymentCheckBox onCheck={this.onOnlinePaymentChecked} />
            <FormButton title={'Đăng bài'} onPress={this.onSubmit} />
          </View>
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
  statePost: state.postReducer.statePost,
  dataPost: state.postReducer.dataPost
})

const mapDispatchToProps = (dispatch) => ({
  createPost: bindActionCreators(requestCreatePost, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)

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
