import {BaseText, Icon} from '@components'
import {dimen} from '@styles'
import moment from 'moment'
import React, {Component} from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {Provider} from 'react-native-paper'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {requestPost} from './action'
import Address from './components/Address'
import BottomButtons from './components/BottomButtons'
import Description from './components/Description'
import Header from './components/Header'
import SellerInfo from './components/SellerInfo'
import Slider from './components/Slider'

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: this.props.route.params.theme,
      postId: this.props.route.params.postId
    }
  }

  componentDidMount() {
    const {getPost} = this.props
    getPost({post_id: this.state.postId})
  }

  render() {
    const {theme, postId} = this.state
    const {dataPost, currentUser, isLoggedIn} = this.props
    const {navigate} = this.props.navigation
    const style = initStyle(theme)
    return (
      <Provider>
        <View style={style.wrapper}>
          <Header
            navigation={this.props.navigation}
            style={style}
            theme={theme}
            postState={dataPost?.post?.post_state}
            postId={postId}
            isOwner={dataPost?.user?.user_id === currentUser?.user_id}
          />
          <ScrollView>
            <View style={style.slider_container}>
              <Slider theme={theme} pictures={dataPost?.post?.picture} />
            </View>
            <View
              style={{
                paddingHorizontal: 15,
                paddingBottom: 20
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 4,
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                <BaseText style={style.title} text={dataPost?.post?.title} />
                <TouchableOpacity>
                  <Icon name="bookmark-outline" style={style.follow_buton} />
                </TouchableOpacity>
              </View>
              <View style={{marginVertical: 5}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    type="Entypo"
                    name="shopping-cart"
                    style={{
                      fontSize: 18,
                      color: theme.primaryForeground,
                      marginRight: 6
                    }}
                  />
                  <BaseText
                    style={style.price}
                    text={dataPost?.post?.default_price + ' đ'}
                  />
                </View>
                <BaseText
                  style={style.small_text}
                  text={moment(dataPost?.post?.time_updated).fromNow()}
                />
              </View>

              <SellerInfo style={style} user={dataPost?.user} />

              <Description
                style={style}
                description={dataPost?.post?.description}
                details={dataPost?.details}
              />
              <Address theme={theme} address={dataPost?.post?.sell_address} />
            </View>
          </ScrollView>
          {dataPost?.user?.user_id !== currentUser?.user_id ? (
            <BottomButtons
              theme={theme}
              navigate={navigate}
              postId={postId}
              isLoggedIn={isLoggedIn}
            />
          ) : null}
        </View>
      </Provider>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUserReducer?.userData,
  isLoggedIn: state.currentUserReducer?.isLoggedIn,
  dataPost: state.postReducer.dataPost,
  statePost: state.postReducer.statePost
})

const mapDispatchToProps = (dispatch) => ({
  getPost: bindActionCreators(requestPost, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)

const initStyle = (theme) => {
  return StyleSheet.create({
    sub_container: {
      marginVertical: 10,
      borderBottomColor: theme.primaryForeground,
      borderBottomWidth: 1,
      paddingBottom: 10
    },
    wrapper: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.primaryBackground,
      position: 'relative'
    },

    /**slide */
    slider_container: {
      width: '100%',
      backgroundColor: theme.primaryBackground,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 4
    },

    /**header */
    header_container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
      position: 'absolute',
      zIndex: 1,
      top: 0,
      left: 0,
      paddingTop: 16,
      paddingLeft: 16
    },
    back_button: {
      fontSize: 24,
      color: 'black',
      backgroundColor: '#ffffff' + 99,
      padding: 12,
      borderRadius: 100
    },
    more_button: {
      fontSize: 24,
      color: 'black',
      backgroundColor: '#ffffff' + 99,
      padding: 12,
      borderRadius: 100,
      marginEnd: 15
    },

    title: {
      fontSize: 24,
      fontWeight: '800',
      letterSpacing: 0.5,
      marginVertical: 4,
      color: theme.secondaryText,
      marginEnd: 30
    },
    follow_buton: {
      fontSize: 24,
      color: theme.red,
      backgroundColor: theme.red + 20,
      padding: 8,
      borderRadius: 100
    },
    price: {
      fontSize: 20,
      fontWeight: '800',
      marginVertical: 5,
      color: theme.red
    },
    small_text: {
      fontSize: 12,
      marginVertical: 4,
      color: theme.secondaryText
    },
    seller_container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      justifyContent: 'space-between',
      borderBottomColor: theme.primaryForeground,
      borderBottomWidth: 1,
      paddingBottom: 10
    },
    link_button: {
      fontSize: 24,
      color: theme.primaryForeground,
      backgroundColor: theme.primaryForeground + 20,
      padding: 8,
      borderRadius: 100
    },
    details_item: {
      flexDirection: 'row',
      paddingVertical: 10,
      alignItems: 'center'
    }
  })
}
