import React, {Component} from 'react'
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  requestCancelDeal,
  requestConfirmedDeal,
  requestReceivedDeal,
  requestSendingDeal
} from '../DealManager/action'
import {requestGetDeal} from './action'
import Address from './components/Address'
import UserInfo from './components/UserInfo'
import DealInfo from './components/DealInfo'
import FormButton from './components/FormButton'
import PaymentInfo from './components/PaymentInfo'

class Deal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: this.props.route.params.theme,
      dealId: this.props.route.params.dealId,
      actions: this.props.route.params.actions,
      onActionDone: () => {}
    }
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
    }
  }

  onAction({action, nextState, onActionDone}) {
    const {dataDeal, currentUser} = this.props
    const deal_id = this.state.dealId
    const isBuyer = currentUser.user_id === dataDeal?.buyer?.user_id
    const {cancelDeal, confirmDeal, sendingDeal, receivedDeal} = this.props
    this.setState({onActionDone: onActionDone})
    switch (action) {
      case 'cancel':
        cancelDeal({deal_id, isBuyer})
        return
      case 'confirm':
        confirmDeal({deal_id})
        return
      case 'send':
        sendingDeal({deal_id})
        return
      case 'receive':
        receivedDeal({deal_id})
        return
      case 'rate':
        return
      default:
        return
    }
  }

  render() {
    const {theme, dealId, actions} = this.state
    const {dataDeal, currentUser, isLoggedIn} = this.props
    const {navigate} = this.props.navigation
    const style = initStyle(theme)
    return (
      <ScrollView style={{backgroundColor: theme.primaryBackground}}>
        <View
          style={[
            {
              backgroundColor: theme.primaryBackground,
              flex: 1,
              alignItems: 'center'
            }
          ]}>
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
          />
          <PaymentInfo deal={dataDeal?.deal} />
          <View style={{flexDirection: 'row-reverse', width: '80%'}}>
            {actions.map((e, i) => {
              return (
                <FormButton
                  color={i && 1 ? 'black' : 'white'}
                  backgroundColor={i && 1 ? 'white' : 'black'}
                  styleContainer={{flex: 1, alignSelf: 'center'}}
                  title={e.label}
                  onPress={() =>
                    this.onAction({
                      action: e.action,
                      nextState: e.nextState,
                      onActionDone: e.onActionDone
                    })
                  }
                />
              )
            })}
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUserReducer?.userData,
  isLoggedIn: state.currentUserReducer?.isLoggedIn,
  dataDeal: state.dealReducer.dataDeal,
  stateDeal: state.postReducer.stateDeal,
  stateSellDeals: state.userDealsReducer.stateSellDeals,
  stateBuyDeals: state.userDealsReducer.stateBuyDeals,
  isActionDone: state.userDealsReducer.isActionDone
})

const mapDispatchToProps = (dispatch) => ({
  getDeal: bindActionCreators(requestGetDeal, dispatch),
  cancelDeal: bindActionCreators(requestCancelDeal, dispatch),
  confirmDeal: bindActionCreators(requestConfirmedDeal, dispatch),
  sendingDeal: bindActionCreators(requestSendingDeal, dispatch),
  receivedDeal: bindActionCreators(requestReceivedDeal, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Deal)

const initStyle = (theme) => {
  return StyleSheet.create({})
}
