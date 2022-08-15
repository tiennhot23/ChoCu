import {Button} from '@components'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {dimen, font} from '@styles'
import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {requestBuyDeals, requestSellDeals} from '../DealManager/action'
import CanceledDeals from './screens/CanceledDeals'
import ConfirmedDeals from './screens/ConfirmedDeals'
import PendingDeals from './screens/PendingDeals'
import ReceivedDeals from './screens/ReceivedDeals'
import SendingDeals from './screens/SendingDeals'

const Tab = createMaterialTopTabNavigator()

class BuyDealsManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: this.props.route.params
    }
  }

  componentDidMount() {
    const {getSellDeals} = this.props
    getSellDeals()
  }

  render() {
    const {theme} = this.state
    const {isLoggedIn} = this.props
    const {navigate} = this.props.navigation
    const style = initStyle(theme)
    return (
      <View style={[style.wrapper]}>
        {!isLoggedIn ? (
          <Text>Cần đăng nhập để thực hiện chức năng này</Text>
        ) : (
          <>
            <View style={{flex: 1, width: '100%'}}>
              <Tab.Navigator
                screenOptions={{
                  tabBarScrollEnabled: true,
                  tabBarActiveTintColor: theme.primaryText,
                  tabBarLabelStyle: {
                    fontSize: font.FONT_SIZE_14,
                    fontWeight: font.FONT_WEIGHT_BOLD
                  },
                  tabBarItemStyle: {
                    width: 130
                  },
                  tabBarIndicatorStyle: {
                    backgroundColor: theme.primaryText
                  },
                  tabBarStyle: {
                    elevation: 0,
                    shadowColor: '#000000',
                    shadowOffset: {width: 0, height: 10}, // change this for more shadow
                    shadowOpacity: 0.4,
                    shadowRadius: 6
                  }
                }}
                // tabBar={(props) => <TopTabs {...props} />}
              >
                <Tab.Screen
                  name="PENDINGDEALS"
                  component={PendingDeals}
                  options={{title: 'Đang duyệt'}}
                />
                <Tab.Screen
                  name="CONFIRMEDDEALS"
                  component={ConfirmedDeals}
                  options={{title: 'Đã xác nhận'}}
                />
                <Tab.Screen
                  name="SENDINGDEALS"
                  component={SendingDeals}
                  options={{title: 'Đang giao'}}
                />
                <Tab.Screen
                  name="RECEIVEDDEALS"
                  component={ReceivedDeals}
                  options={{title: 'Đã nhận'}}
                />
                <Tab.Screen
                  name="CANCELEDDEALS"
                  component={CanceledDeals}
                  options={{title: 'Đã Huỷ'}}
                />
              </Tab.Navigator>
            </View>
          </>
        )}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.currentUserReducer.isLoggedIn
})

const mapDispatchToProps = (dispatch) => ({
  getSellDeals: bindActionCreators(requestSellDeals, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyDealsManager)

const initStyle = (theme) => {
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: theme.primaryBackground,
      alignItems: 'center'
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
