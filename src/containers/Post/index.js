import {BaseText, Icon} from '@components'
import React, {Component} from 'react'
import {
  Text,
  TouchableOpacity,
  View,
  Linking,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  Animated
} from 'react-native'
import {Avatar} from 'react-native-paper'
import {connect} from 'react-redux'
import {POST_SCR} from 'src/constants/constant'
import {ThemeConsumer} from 'src/context/ThemeContext'
import Address from './components/Address'
import BottomButtons from './components/BottomButtons'
import Description from './components/Description'
import Header from './components/Header'
import SellerInfo from './components/SellerInfo'
import Slider from './components/Slider'

import dynamicStyle from './style'

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {navigation} = this.props
    const product = {
      id: 1,
      category: 'product',
      productName: 'MI Super Bass Bluetooth Wireless Headphones',
      productPrice: 1799,
      description:
        'Up to 20 hours battery life | Super powerful Bass | 40mm dynamic driver | Pressure less ear muffs | Bluetooth 5.0 | Voice control',
      isOff: true,
      offPercentage: 10,
      productImage:
        'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
      isAvailable: true,
      productImageList: [
        'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
        'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
        'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444'
      ]
    }
    return (
      <ThemeConsumer>
        {(theme) => {
          const style = dynamicStyle(theme)
          return (
            <View style={style.wrapper}>
              <ScrollView>
                <View style={style.slider_container}>
                  <Header navigation={navigation} style={style} />
                  <Slider
                    style={style}
                    productImageList={product.productImageList}
                  />
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
                    <BaseText style={style.title} text={product.productName} />
                    <TouchableOpacity>
                      <Icon
                        name="bookmark-outline"
                        style={style.follow_buton}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{marginVertical: 5}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon
                        type="Entypo"
                        name="shopping-cart"
                        style={{
                          fontSize: 18,
                          color: style.colors.primaryForeground,
                          marginRight: 6
                        }}
                      />
                      <BaseText
                        style={style.price}
                        text={product.productPrice + ' đ'}
                      />
                    </View>
                    <BaseText style={style.small_text} text={'111 giờ trước'} />
                  </View>

                  <SellerInfo
                    style={style}
                    user={{
                      avatar:
                        'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
                      name: 'Người bán'
                    }}
                  />

                  <Description
                    style={style}
                    description={product.description}
                    details={[
                      {
                        icon: 'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
                        title: 'Hãng',
                        content: 'Asus'
                      },
                      {
                        icon: 'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
                        title: 'Hãng',
                        content: 'Asus'
                      },

                      {
                        icon: 'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
                        title: 'Hãng',
                        content: 'Asus'
                      },
                      {
                        icon: 'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
                        title: 'Hãng',
                        content: 'Asus'
                      },

                      {
                        icon: 'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
                        title: 'Hãng',
                        content: 'Asus'
                      },
                      {
                        icon: 'https://static.lag.vn/upload/news/22/04/28/one-punch-man-211-1_PTEC.jpg?w=800&encoder=wic&subsampling=444',
                        title: 'Hãng',
                        content: 'Asus'
                      }
                    ]}
                  />
                  <Address
                    style={style}
                    address="97 Man Thiện, Tp.Thủ Đức, Tp.Hồ Chí Minh"
                  />
                </View>
              </ScrollView>
              <BottomButtons style={style} />
            </View>
          )
        }}
      </ThemeConsumer>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
