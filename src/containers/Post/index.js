import {BaseLoading, BaseText, Icon, Input, ModalLoading} from '@components'
import {dimen} from '@styles'
import moment from 'moment'
import React, {Component, createRef} from 'react'
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {Provider} from 'react-native-paper'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {baseUrl} from 'src/constants/api'
import {AUTH_NAV, width} from 'src/constants/constant'
import {requestPost} from './action'
import Address from './components/Address'
import BottomButtons from './components/BottomButtons'
import Description from './components/Description'
import Header from './components/Header'
import PostRating from './components/PostRating'
import Report from './components/Report'
import SellerInfo from './components/SellerInfo'
import Slider from './components/Slider'

import * as AppNavigateActionCreator from '../AppNavigate/action'
import BottomAdminButtons from './components/BottomAdminButtons'
import {helper} from '@common'
import PostReports from './components/PostReports'

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: this.props.route.params.theme,
      postId: this.props.route.params.postId,
      onGoBack: this.props.route.params.onGoBack,
      showReport: false,
      onActionDone: this.props.route.params.onActionDone
        ? this.props.route.params.onActionDone
        : () => {},
      reports: this.props.route.params.reports
    }
    this.reportContentRef = createRef()
    this.reportInfoRef = createRef()
  }

  componentDidMount() {
    const {getPost} = this.props
    getPost({post_id: this.state.postId})
  }

  componentDidUpdate(prevProps, prevState) {
    const {onActionDone} = this.state
    const {isAdminActionDone, isAdminActioning, navigation, adminPostsData} =
      this.props
    const {dataPost, currentUser, isLoggedIn, statePost} = this.props
    if (
      prevProps.isAdminActioning != isAdminActioning &&
      !isAdminActioning &&
      isAdminActionDone
    ) {
      navigation.goBack()
      if (
        helper.isFunction(onActionDone) &&
        prevProps.adminPostsData.length === adminPostsData.length
      )
        onActionDone()
    }

    if (
      // prevProps.statePost.isFetching != this.props.statePost.isFetching &&
      // !this.props.statePost.isFetching &&
      // this.props.statePost.isError
      dataPost &&
      dataPost?.post?.post_state === 'deleted' &&
      currentUser.user_id !== dataPost?.post?.seller_id &&
      !global.adminLogin
    ) {
      alert('Không tìm thấy bài đăng này')
      navigation.goBack()
      if (helper.isFunction(this.state.onGoBack)) this.state.onGoBack()
    }
  }

  render() {
    const {theme, postId, onGoBack, showReport} = this.state
    const {dataPost, currentUser, isLoggedIn, statePost} = this.props
    const {navigate} = this.props.navigation
    const style = initStyle(theme)
    return (
      <Provider>
        <BaseLoading isLoading={statePost.isFetching}>
          <View style={style.wrapper}>
            <Modal visible={showReport} transparent>
              <Report
                postId={postId}
                onCancelReport={() => this.setState({showReport: false})}
              />
            </Modal>
            {!global.adminLogin && (
              <Header
                navigation={this.props.navigation}
                onGoBack={onGoBack}
                onReport={() => this.setState({showReport: true})}
                style={style}
                theme={theme}
                postState={dataPost?.post?.post_state}
                postId={postId}
                isOwner={dataPost?.user?.user_id === currentUser?.user_id}
              />
            )}
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
                  <BaseText
                    style={[style.title, {width: '80%'}]}
                    text={dataPost?.post?.title}
                  />
                  {/* <TouchableOpacity>
                  <Icon name="bookmark-outline" style={style.follow_buton} />
                </TouchableOpacity> */}
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
                      text={dataPost?.post?.default_price.toLocaleString(
                        'en-US',
                        {style: 'currency', currency: 'VND'}
                      )}
                    />
                  </View>
                  <BaseText
                    style={style.small_text}
                    text={moment(dataPost?.post?.time_created).fromNow()}
                  />
                </View>

                <SellerInfo
                  style={style}
                  user={dataPost?.user}
                  navigate={navigate}
                  isOwner={dataPost?.user?.user_id === currentUser?.user_id}
                />

                <Description
                  style={style}
                  description={dataPost?.post?.description}
                  details={dataPost?.details}
                />
                <Address theme={theme} address={dataPost?.post?.sell_address} />
                {this.state.reports && (
                  <PostReports reports={this.state.reports} />
                )}
                <PostRating postId={postId} navigate={navigate} />
              </View>
            </ScrollView>
            {dataPost?.user?.user_id !== currentUser?.user_id &&
            dataPost?.post?.post_state === 'active' &&
            !global.adminLogin ? (
              <BottomButtons
                theme={theme}
                navigate={navigate}
                postId={postId}
                isLoggedIn={isLoggedIn}
                seller={dataPost?.user}
                navigateToLoginScreen={() =>
                  this.props.navigation.navigate(AUTH_NAV)
                }
              />
            ) : null}
            {global.adminLogin &&
              (dataPost?.post?.post_state === 'pending' ||
                dataPost?.post?.post_state === 'active') && (
                <BottomAdminButtons
                  theme={theme}
                  navigation={this.props.navigation}
                  onActionDone={this.state.onActionDone}
                  hasReports={this.state.reports}
                />
              )}
          </View>
        </BaseLoading>
      </Provider>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUserReducer?.userData,
  isLoggedIn: state.currentUserReducer?.isLoggedIn,
  dataPost: state.postReducer.dataPost,
  statePost: state.postReducer.statePost,
  isAdminActionDone: state.adminPostsManagerReducer.isActionDone,
  isAdminActioning: state.adminPostsManagerReducer.isActioning,
  adminPostsData: state.adminPostsManagerReducer.postsData
})

const mapDispatchToProps = (dispatch) => ({
  getPost: bindActionCreators(requestPost, dispatch),
  appNavigate: bindActionCreators(AppNavigateActionCreator, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)

const initStyle = (theme) => {
  return StyleSheet.create({
    sub_container: {
      marginVertical: 10,
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
