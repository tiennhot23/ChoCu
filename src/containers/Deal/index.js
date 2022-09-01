import React, {Component, createRef} from 'react'
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  requestBuyDeals,
  requestCancelDeal,
  requestConfirmedDeal,
  requestPaidDeal,
  requestReceivedDeal,
  requestSellDeals,
  requestSendingDeal
} from '../DealManager/action'
import {requestGetDeal, requestRateDeal} from './action'
import Address from './components/Address'
import UserInfo from './components/UserInfo'
import DealInfo from './components/DealInfo'
import FormButton from './components/FormButton'
import PaymentInfo from './components/PaymentInfo'
import DealRating from './components/DealRating'
import {BaseLoading, ConfirmDialog, Input, ModalLoading} from '@components'
import {Rating} from 'react-native-ratings'
import WebView from 'react-native-webview'
import {baseUrl} from 'src/constants/api'

class Deal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: this.props.route.params.theme,
      dealId: this.props.route.params.dealId,
      actions: this.props.route.params.actions,
      payment: null,
      showPayPal: false,
      onActionDone: () => {},
      rate_numb: 0,
      showConfirm: false,
      confirmTitle: '',
      funcOnAction: () => {}
    }
    this.rateRef = createRef()
  }

  componentDidMount() {
    const {getDeal} = this.props
    getDeal({deal_id: this.state.dealId})
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.isActionDone !== this.props.isActionDone &&
      this.props.isActionDone
    ) {
      this.props.navigation.goBack()
      this.state.onActionDone()
    } else if (!this.props.isActionDone) {
      if (
        prevProps.stateSellDeals.isError !==
          this.props.stateSellDeals.isError &&
        this.props.stateSellDeals.isError &&
        this.props.stateSellDeals.message !== ''
      ) {
        alert(this.props.stateSellDeals.message)
        this.props.getSellDeals()
      } else if (
        prevProps.stateBuyDeals.isError !== this.props.stateBuyDeals.isError &&
        this.props.stateBuyDeals.isError &&
        this.props.stateBuyDeals.message !== ''
      ) {
        alert(this.props.stateBuyDeals.message)
        this.props.getBuyDeals()
      }
      this.setState({showConfirm: false})
    }
  }

  onAction({action, nextState, onActionDone}) {
    const {rate_numb} = this.state
    const rate_content = this.rateRef?.current?.getText()
    const {dataDeal, currentUser} = this.props
    const deal_id = this.state.dealId
    const isBuyer = currentUser.user_id === dataDeal?.buyer?.user_id
    const {
      cancelDeal,
      confirmDeal,
      payDeal,
      sendingDeal,
      receivedDeal,
      rateDeal
    } = this.props
    this.setState({onActionDone: onActionDone})
    switch (action) {
      case 'cancel':
        cancelDeal({deal_id, isBuyer})
        return
      case 'confirm':
        confirmDeal({deal_id})
        return
      case 'pay':
        this.setState({showPayPal: true})
      case 'send':
        sendingDeal({deal_id})
        return
      case 'receive':
        receivedDeal({deal_id})
        return
      case 'rate':
        rateDeal({deal_id, rate_numb, rate_content})
        return
      default:
        return
    }
  }

  onFinishRating = (rate_numb) => {
    this.setState({rate_numb: rate_numb})
  }

  handlePaypalPaymentResponse = (data) => {
    console.log('PAYPAL_RESPONSE', data)
    if (data.title.includes('success')) {
      this.setState({showPayPal: false})
      this.props.payDeal({deal_id: this.state.dealId})
    } else if (data.title.includes('cancel')) {
      this.setState({showPayPal: false})
      alert('Payment canceled')
    } else {
      return
    }
  }

  render() {
    const {theme, dealId, actions, showConfirm, confirmTitle, funcOnAction} =
      this.state
    const {dataDeal, currentUser, isLoggedIn, stateDeal, isActioning} =
      this.props
    const {navigate} = this.props.navigation
    const style = initStyle(theme)
    return (
      <BaseLoading isLoading={stateDeal?.isFetching}>
        <ScrollView style={{backgroundColor: theme.primaryBackground}}>
          <ConfirmDialog
            show={showConfirm}
            title={confirmTitle}
            onCanceled={() =>
              this.setState({
                showConfirm: false
              })
            }
            onConfirmed={funcOnAction}
          />
          <View
            style={[
              {
                backgroundColor: theme.primaryBackground,
                flex: 1,
                alignItems: 'center'
              }
            ]}>
            <ModalLoading loading={this.state.showPayPal || isActioning} />
            <Modal
              visible={this.state.showPayPal}
              onRequestClose={() => this.setState({showPayPal: false})}>
              <WebView
                source={{
                  uri:
                    baseUrl +
                    `/paypal?item_name=${dataDeal?.deal?.title}&price=${dataDeal?.deal?.deal_price}&recipient_name=${dataDeal?.seller?.name}&address=${dataDeal?.deal?.receive_address}`
                }}
                onNavigationStateChange={(data) =>
                  this.handlePaypalPaymentResponse(data)
                }
              />
            </Modal>
            <DealInfo deal={dataDeal?.deal} />
            <Address theme={theme} address={dataDeal?.deal?.receive_address} />

            <Text
              style={{
                width: '90%',
                color: theme.primaryForeground,
                fontWeight: '500',
                fontSize: 16
              }}>
              {currentUser.user_id === dataDeal?.seller?.user_id
                ? 'Thông tin người mua'
                : 'Thông tin người bán'}
            </Text>
            <UserInfo
              user={
                currentUser.user_id === dataDeal?.seller?.user_id
                  ? dataDeal?.buyer
                  : dataDeal?.seller
              }
              navigate={navigate}
            />
            <PaymentInfo deal={dataDeal?.deal} />
            {dataDeal?.deal?.deal_state === 'done' && (
              <DealRating
                deal={dataDeal?.deal}
                rating={dataDeal?.rating}
                user={dataDeal?.buyer}
              />
            )}
            {dataDeal?.deal?.deal_state === 'received' &&
              currentUser.user_id === dataDeal?.buyer?.user_id && (
                <>
                  <Rating
                    type="star"
                    startingValue={0}
                    ratingCount={5}
                    imageSize={25}
                    onFinishRating={this.onFinishRating}
                    style={{
                      alignSelf: 'center',
                      marginVertical: 10
                    }}
                  />
                  <Input
                    title={'Nội dung'}
                    multiline={true}
                    placeholder={'Nội dung đánh giá'}
                    required
                    height={150}
                    ref={this.rateRef}
                  />
                </>
              )}
            {dataDeal?.deal?.deal_state !== 'done' && (
              <View style={{flexDirection: 'row-reverse', width: '80%'}}>
                {actions.map((e, i) => {
                  return (
                    <FormButton
                      color={i && 1 ? 'black' : 'white'}
                      backgroundColor={i && 1 ? 'white' : 'black'}
                      styleContainer={{flex: 1, alignSelf: 'center'}}
                      title={e.label}
                      onPress={() => {
                        if (e.action !== 'rate') {
                          this.setState({
                            showConfirm: true,
                            confirmTitle: e.label,
                            funcOnAction: () =>
                              this.onAction({
                                action: e.action,
                                nextState: e.nextState,
                                onActionDone: e.onActionDone
                              })
                          })
                        } else {
                          this.onAction({
                            action: e.action,
                            nextState: e.nextState,
                            onActionDone: e.onActionDone
                          })
                        }
                      }}
                    />
                  )
                })}
              </View>
            )}
          </View>
        </ScrollView>
      </BaseLoading>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUserReducer?.userData,
  isLoggedIn: state.currentUserReducer?.isLoggedIn,
  dataDeal: state.dealReducer.dataDeal,
  stateDeal: state.dealReducer.stateDeal,
  stateSellDeals: state.userDealsReducer.stateSellDeals,
  stateBuyDeals: state.userDealsReducer.stateBuyDeals,
  isActionDone: state.userDealsReducer.isActionDone,
  isActioning: state.userDealsReducer.isActioning
})

const mapDispatchToProps = (dispatch) => ({
  getDeal: bindActionCreators(requestGetDeal, dispatch),
  getSellDeals: bindActionCreators(requestSellDeals, dispatch),
  getBuyDeals: bindActionCreators(requestBuyDeals, dispatch),
  cancelDeal: bindActionCreators(requestCancelDeal, dispatch),
  confirmDeal: bindActionCreators(requestConfirmedDeal, dispatch),
  payDeal: bindActionCreators(requestPaidDeal, dispatch),
  sendingDeal: bindActionCreators(requestSendingDeal, dispatch),
  receivedDeal: bindActionCreators(requestReceivedDeal, dispatch),
  rateDeal: bindActionCreators(requestRateDeal, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Deal)

const initStyle = (theme) => {
  return StyleSheet.create({})
}
