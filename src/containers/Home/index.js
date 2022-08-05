import {AnimatedImageSlide, AnimatedImageSlide2} from '@components'
import {dimen} from '@styles'
import React, {Component} from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native'
import {connect} from 'react-redux'
import Categories from './components/Categories'
import Header from './components/Header'
import {PostCard, PostsHeader} from './components/Posts'
import Slider from './components/Slider'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: this.props.route.params,
      images: [
        'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
        'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
        'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444'
      ],
      posts: [
        {
          id: 1,
          image:
            'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
          title: 'Tieu de bai dang dai dai dai dai daida dadasdasdasdasdas',
          price: 10000,
          time: '3 gio truoc',
          location: 'Ho Chi Minh',
          haveOnlinePayment: true
        },
        {
          id: 2,
          image:
            'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
          title: 'Tieu de bai dang',
          price: 10000,
          time: '3 gio truoc',
          location: 'Ho Chi Minh',
          haveOnlinePayment: true
        },
        {
          id: 3,
          image:
            'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
          title: 'Tieu de bai dang',
          price: 10000,
          time: '3 gio truoc',
          location: 'Ho Chi Minh',
          haveOnlinePayment: true
        },
        {
          id: 4,
          image:
            'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
          title: 'Tieu de bai dang',
          price: 10000,
          time: '3 gio truoc',
          location: 'Ho Chi Minh',
          haveOnlinePayment: true
        },
        {
          id: 5,
          image:
            'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
          title: 'Tieu de bai dang',
          price: 10000,
          time: '3 gio truoc',
          location: 'Ho Chi Minh',
          haveOnlinePayment: true
        },
        {
          id: 6,
          image:
            'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
          title: 'Tieu de bai dang',
          price: 10000,
          time: '3 gio truoc',
          location: 'Ho Chi Minh',
          haveOnlinePayment: true
        },
        {
          id: 7,
          image:
            'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
          title: 'Tieu de bai dang',
          price: 10000,
          time: '3 gio truoc',
          location: 'Ho Chi Minh',
          haveOnlinePayment: true
        },
        {
          id: 8,
          image:
            'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
          title: 'Tieu de bai dang',
          price: 10000,
          time: '3 gio truoc',
          location: 'Ho Chi Minh',
          haveOnlinePayment: true
        }
      ]
    }
  }

  onPostPress = () => {
    this.props.navigation.navigate(POST_SCR)
  }

  onSearchBarPress = () => {
    this.props.navigation.navigate(SEARCH_SCR)
  }

  render() {
    const {theme} = this.state
    const {navigate} = this.props.navigation
    const style = initStyle(theme)
    return (
      <View style={style.wrapper}>
        <FlatList
          ListHeaderComponent={() => {
            return (
              <View key={0}>
                <Header
                  theme={theme}
                  onSearchBarPress={this.onSearchBarPress}
                />
                <Slider />
                <Categories theme={theme} />
                <PostsHeader theme={theme} />
              </View>
            )
          }}
          data={this.state.posts}
          showsVerticalScrollIndicator={false}
          overScrollMode={'never'}
          renderItem={({item, index}) => (
            <PostCard
              theme={theme}
              id={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              time={item.time}
              location={item.location}
              haveOnlinePayment={item.haveOnlinePayment}
              onPress={this.onPostPress}
            />
          )}
          numColumns={2}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

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
