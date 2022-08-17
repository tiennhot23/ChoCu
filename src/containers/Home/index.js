import {AnimatedImageSlide, AnimatedImageSlide2} from '@components'
import {dimen} from '@styles'
import moment from 'moment'
import React, {Component, PureComponent} from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {POST_SCR, SEARCH_SCR} from 'src/constants/constant'
import {requestUserData} from '../CurrentUser/action'
import {requestPosts} from '../Posts/action'
import Categories from './components/Categories'
import Header from './components/Header'
import {PostCard, PostsHeader} from './components/Posts'
import Slider from './components/Slider'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: this.props.route.params
    }
  }

  componentDidMount() {
    this.props.getPosts({})
  }

  onPostPress = (postId) => {
    this.props.navigation.navigate(POST_SCR, {postId, onGoBack: this.onRefresh})
  }

  onCategoryPress = (category) => {
    this.props.navigation.navigate(SEARCH_SCR, {
      category,
      onGoBack: this.onRefresh
    })
  }

  onSearchBarPress = () => {
    this.props.navigation.navigate(SEARCH_SCR, {onGoBack: this.onRefresh})
  }

  onRefresh = () => {
    this.props.getPosts({})
  }

  render() {
    const {theme} = this.state
    const {navigate} = this.props.navigation
    const {posts} = this.props
    const style = initStyle(theme)
    return (
      <View style={style.wrapper}>
        <FlatList
          ListHeaderComponent={
            <ListHeaderComponent
              theme={theme}
              onSearchBarPress={this.onSearchBarPress}
              onCategoryPress={this.onCategoryPress}
            />
          }
          data={posts}
          showsVerticalScrollIndicator={false}
          overScrollMode={'never'}
          renderItem={({item, index}) => (
            <PostCard
              theme={theme}
              id={item.post_id}
              image={item.picture[0]}
              title={item.title}
              price={item.default_price}
              time={moment(item.time_updated).fromNow()}
              location={item.sell_address.split(', ')[2]}
              haveOnlinePayment={item.online_payment}
              onPress={this.onPostPress}
            />
          )}
          numColumns={2}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.postsReducer.dataPosts
})

const mapDispatchToProps = (dispatch) => ({
  getPosts: bindActionCreators(requestPosts, dispatch),
  getDataCurrentUser: bindActionCreators(requestUserData, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

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

class ListHeaderComponent extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const {theme, onSearchBarPress, onCategoryPress} = this.props
    return (
      <View key={0}>
        <Header theme={theme} onSearchBarPress={onSearchBarPress} />
        <Slider />
        <Categories theme={theme} onCategoryPress={onCategoryPress} />
        <PostsHeader theme={theme} />
      </View>
    )
  }
}
