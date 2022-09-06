import {ComponentLoading} from '@components'
import {dimen} from '@styles'
import moment from 'moment'
import React, {Component, createRef} from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {POST_SCR} from 'src/constants/constant'
import {requestUserData} from '../CurrentUser/action'
import {requestPosts} from '../Posts/action'
import CategorySelection from './components/CategorySelection'
import Header from './components/Header'
import LocationSelection from './components/LocationSelection'
import {PostCard, PostsHeader} from './components/Posts'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: this.props.route.params.theme,
      address: '',
      category: this.props.route.params.category,
      onGoBack: this.props.route.params.onGoBack
    }
    this.categorySelectionRef = createRef()
    this.locationSelectionRef = createRef()
  }

  onPostPress = (postId) => {
    this.props.navigation.navigate(POST_SCR, {postId})
  }

  onSearch = (key_search) => {
    const category = this.categorySelectionRef.current.getData()
    const location = this.locationSelectionRef.current.getData()
    const {getPosts} = this.props
    getPosts({key_search, category, location})
  }

  componentDidMount() {
    const {getPosts} = this.props
    const {category} = this.state
    if (category) {
      getPosts({category: {category_id: category.id, details: []}})
      this.categorySelectionRef.current.setData(category)
    }
  }

  render() {
    const {theme, onGoBack} = this.state
    const {navigate} = this.props.navigation
    const {posts, statePosts} = this.props
    const style = initStyle(theme)
    return (
      <View style={style.wrapper}>
        <View>
          <Header
            theme={theme}
            navigation={this.props.navigation}
            onSearch={this.onSearch}
            onGoBack={onGoBack}
          />
          <LocationSelection ref={this.locationSelectionRef} />
          <CategorySelection ref={this.categorySelectionRef} />
          <PostsHeader />
        </View>
        <ComponentLoading
          isLoading={statePosts.isFetching}
          textLoading="Đang tìm kiếm">
          <FlatList
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
                time={moment(item.time_created).fromNow()}
                location={item.sell_address.split(', ')[2]}
                haveOnlinePayment={item.online_payment}
                onPress={this.onPostPress}
              />
            )}
            numColumns={2}
          />
        </ComponentLoading>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.postsReducer.dataPosts,
  statePosts: state.postsReducer.statePosts
})

const mapDispatchToProps = (dispatch) => ({
  getPosts: bindActionCreators(requestPosts, dispatch),
  getDataCurrentUser: bindActionCreators(requestUserData, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)

const initStyle = (theme) => {
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      padding: dimen.wrapper_padding,
      backgroundColor: theme.primaryBackground
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
