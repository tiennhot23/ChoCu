import React, {Component} from 'react'
import {Text, TouchableOpacity, View, ScrollView, FlatList} from 'react-native'
import {connect} from 'react-redux'
import {Icon} from '@components'
import {POST_SCR} from 'src/constants/constant'
import {ThemeConsumer} from 'src/context/ThemeContext'

import dynamicStyle from './style'
import Slider from './components/Slider'
import Header from './components/Header'
import Categories from './components/Categories'
import {PostsHeader, PostCard} from './components/Posts'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [
        'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
        'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
        'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444'
      ],
      categories: [
        {
          id: 1,
          image:
            'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
          title: 'Ten danh muc'
        },
        {
          id: 2,
          image:
            'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
          title: 'Ten danh muc'
        },
        {
          id: 3,
          image:
            'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
          title: 'Ten danh muc'
        },
        {
          id: 4,
          image:
            'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
          title: 'Ten danh muc'
        },
        {
          id: 5,
          image:
            'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
          title: 'Ten danh muc'
        },
        {
          id: 6,
          image:
            'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
          title: 'Ten danh muc'
        },
        {
          id: 7,
          image:
            'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
          title: 'Ten danh muc'
        },
        {
          id: 8,
          image:
            'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
          title: 'Ten danh muc'
        },
        {
          id: 9,
          image:
            'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
          title: 'Ten danh muc'
        }
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

  render() {
    return (
      <ThemeConsumer>
        {(theme) => {
          const style = dynamicStyle(theme)
          return (
            <View style={style.wrapper}>
              <FlatList
                ListHeaderComponent={() => {
                  return (
                    <View key={0}>
                      <Header style={style} />
                      <Slider images={this.state.images} />
                      <Categories
                        style={style}
                        categories={this.state.categories}
                      />
                      <PostsHeader style={style} />
                    </View>
                  )
                }}
                data={this.state.posts}
                showsVerticalScrollIndicator={false}
                overScrollMode={'never'}
                renderItem={({item, index}) => (
                  <PostCard
                    style={style}
                    id={item.id}
                    image={item.image}
                    title={item.title}
                    price={item.price}
                    time={item.time}
                    location={item.location}
                    haveOnlinePayment={item.haveOnlinePayment}
                  />
                )}
                numColumns={2}
              />
            </View>
          )
        }}
      </ThemeConsumer>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
