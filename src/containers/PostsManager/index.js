import {Button} from '@components'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {dimen, font} from '@styles'
import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {CREATE_POST_SCR} from 'src/constants/constant'
import {requestUserPosts} from './action'
import FormButton from './components/FormButton'
import TopTabs from './components/TopTabs'
import ActivePosts from './screens/ActivePosts'
import HiddenPosts from './screens/HiddenPosts'
import PendingPosts from './screens/PendingPosts'

const Tab = createMaterialTopTabNavigator()

class PostsManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: this.props.route.params
    }
  }

  componentDidMount() {
    const {getUserPosts} = this.props
    getUserPosts()
  }

  handleButtonCreatePost = () => {
    const {navigate} = this.props.navigation
    const {isLoggedIn} = this.props
    if (isLoggedIn) navigate(CREATE_POST_SCR)
    else alert('Cần đăng nhập để thực hiện chức năng này')
  }

  render() {
    const {theme} = this.state
    const {isLoggedIn} = this.props
    const {navigate} = this.props.navigation
    const style = initStyle(theme)
    return (
      <View style={[style.wrapper]}>
        {!isLoggedIn ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text>Cần đăng nhập để quản lí bài đăng của mình</Text>
          </View>
        ) : (
          <>
            <FormButton
              title={'Tạo bài đăng mới'}
              onPress={this.handleButtonCreatePost}
            />
            <View style={{flex: 1, width: '100%'}}>
              <Tab.Navigator
                screenOptions={{
                  tabBarActiveTintColor: theme.primaryText,
                  tabBarLabelStyle: {
                    fontSize: font.FONT_SIZE_14,
                    fontWeight: font.FONT_WEIGHT_BOLD
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
                  options={{title: 'Đang duyệt'}}
                />
                <Tab.Screen
                  name="ACTIVEPOSTS"
                  component={ActivePosts}
                  options={{title: 'Đang đăng'}}
                />
                <Tab.Screen
                  name="HIDDENPOSTS"
                  component={HiddenPosts}
                  options={{title: 'Đã ẩn'}}
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
  isLoggedIn: state.currentUserReducer.isLoggedIn,
  statePost: state.postReducer.statePost
})

const mapDispatchToProps = (dispatch) => ({
  getUserPosts: bindActionCreators(requestUserPosts, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PostsManager)

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
