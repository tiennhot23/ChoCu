import {helper} from '@common'
import {Input, KeyboardView} from '@components'
import {dimen} from '@styles'
import React, {Component} from 'react'
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import WebView from 'react-native-webview'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {requestCreateDeal} from '../Deal/action'
import {requestUserPayments} from '../Payment/action'
import {requestCreatePost} from '../Post/action'
import AddressSelection from './components/AddressSelection'
import FormButton from './components/FormButton'
import PaymentCheckBox from './components/PaymentCheckBox'
import PaymentInfo from './components/PaymentInfo'
import PostInfo from './components/PostInfo'

class CreateDeal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: this.props.route.params,
      address: '',
      payment: null,
      showPayPal: false
    }
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

  onPaymentChecked = (payment) => {
    this.setState({payment: payment})
  }

  onSubmit = () => {
    this.setState({showPayPal: true})
    // const {createDeal, currentUser, dataPost} = this.props
    // const data = {
    //   buyer_id: currentUser.user_id,
    //   post_id: dataPost.post.post_id,
    //   receive_address: this.state.address,
    //   deal_price: dataPost.post.default_price,
    //   online_deal: this.state.payment !== null
    // }
    // if (!data.receive_address || helper.isEmptyString(data.receive_address)) {
    //   alert('Chưa chọn địa chỉ nhận')
    //   return
    // }
    // createDeal({deal: data})
  }

  handlePaypalPaymentResponse = (data) => {
    console.log('PAYPAL_RESPONSE', data)
    if (data.title.includes('success')) {
      this.setState({showPayPal: false})
    } else if (data.title.includes('cancel')) {
      this.setState({showPayPal: false})
    } else {
      return
    }
  }

  componentDidMount() {
    const {currentUser, dataPost, getUserPayment} = this.props
    this.setState({
      address:
        currentUser.address === 'Chưa cung cấp' ? '' : currentUser.address
    })
    getUserPayment({user_id: dataPost.user.user_id})
  }

  componentDidUpdate(prevProps, prevState) {
    const {goBack} = this.props.navigation
    if (
      prevProps.stateDeal.isFetching !== this.props.stateDeal.isFetching &&
      prevProps.stateDeal.isFetching &&
      !helper.isEmptyObject(this.props.dataDeal)
    )
      goBack()
  }

  render() {
    const {statePost, dataPost} = this.props
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
          <Modal
            visible={this.state.showPayPal}
            onRequestClose={() => this.setState({showPayPal: false})}>
            <WebView
              source={{uri: 'http://192.168.1.7:3000/paypal'}}
              onNavigationStateChange={(data) =>
                this.handlePaypalPaymentResponse(data)
              }
            />
          </Modal>
          <View
            style={[
              {
                backgroundColor: theme.primaryBackground,
                flex: 1,
                alignItems: 'center'
              }
            ]}>
            <PostInfo post={dataPost.post} />
            <Input
              title={'Địa chỉ nhận'}
              _text={address}
              editable={false}
              required
              onPress={this.openAddressSeletion}
            />
            <PaymentInfo post={dataPost.post} />
            <PaymentCheckBox onCheck={this.onPaymentChecked} />
            <FormButton title={'Tiến hành giao dịch'} onPress={this.onSubmit} />
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
  currentUser: state.currentUserReducer?.userData,
  dataPost: state.postReducer.dataPost,
  statePost: state.postReducer.statePost,
  dataDeal: state.dealReducer.dataDeal,
  stateDeal: state.dealReducer.stateDeal
})

const mapDispatchToProps = (dispatch) => ({
  createPost: bindActionCreators(requestCreatePost, dispatch),
  createDeal: bindActionCreators(requestCreateDeal, dispatch),
  getUserPayment: bindActionCreators(requestUserPayments, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateDeal)

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
