import {Button} from '@components'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {dimen, font} from '@styles'
import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {requestAllPosts} from './action'
import ApprovedPosts from './screens/ApprovedPosts'
import DeletedPosts from './screens/DeletedPosts'
import PendingPosts from './screens/PendingPosts'

const Tab = createMaterialTopTabNavigator()

class AdminPostsManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: this.props.route.params
    }
  }

  componentDidMount() {
    const {getAllPosts} = this.props
    getAllPosts()
  }

  render() {
    const {theme} = this.state
    const {isLoggedIn} = this.props
    const {navigate} = this.props.navigation
    const style = initStyle(theme)
    return (
      <View style={[style.wrapper]}>
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
                  width: 150
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
                name="PENDINGPOSTS"
                component={PendingPosts}
                options={{title: 'Đang chờ duyệt'}}
              />
              <Tab.Screen
                name="APPROVEDPOSTS"
                component={ApprovedPosts}
                options={{title: 'Đã chấp thuận'}}
              />
              <Tab.Screen
                name="DELETEDPOSTS"
                component={DeletedPosts}
                options={{title: 'Đã khoá'}}
              />
            </Tab.Navigator>
          </View>
        </>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.currentUserReducer.isLoggedIn
})

const mapDispatchToProps = (dispatch) => ({
  getAllPosts: bindActionCreators(requestAllPosts, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminPostsManager)

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
