import {BaseText, Icon} from '@components'
import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {TouchableOpacity, View, Text} from 'react-native'
import {Avatar} from 'react-native-paper'
import {Rating} from 'react-native-ratings'
import {baseUrl} from 'src/constants/api'
import {USER_INFO_SCR} from 'src/constants/constant'

export default function PostRating({
  color = 'black',
  backgroundColor = 'white',
  width = '90%',
  navigate,
  postId
}) {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch(baseUrl + '/post/rating' + `/${postId}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => console.log(err))
  }, [])
  return (
    <View
      style={{
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          padding: 5
        }}>
        <Text
          style={{
            fontSize: 18,
            color: color,
            fontWeight: '800',
            letterSpacing: 0.5,
            marginVertical: 4,
            borderBottomColor: color,
            borderBottomWidth: 1,
            paddingVertical: 5
          }}
          ellipsizeMode={'tail'}>
          {'Đánh giá'}
        </Text>
        {data.map(
          (e) =>
            e.rating && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                  justifyContent: 'space-between',
                  borderBottomColor: color,
                  borderBottomWidth: 1,
                  borderStyle: 'dashed',
                  paddingBottom: 10
                }}>
                <View
                  style={{
                    flexDirection: 'row'
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() =>
                      navigate(USER_INFO_SCR, {userId: e.user?.user_id})
                    }>
                    <Avatar.Image
                      source={{
                        uri: e.user?.avatar
                      }}
                      size={30}
                    />
                  </TouchableOpacity>

                  <View style={{marginStart: 10, flex: 1}}>
                    <BaseText
                      style={[
                        {
                          fontSize: 20,
                          fontWeight: '800',
                          letterSpacing: 0.5,
                          marginVertical: 4,
                          color: color,
                          marginEnd: 30
                        }
                      ]}
                      text={e.user?.name}
                    />
                    <BaseText
                      style={{
                        fontSize: 14,
                        marginVertical: 4,
                        color: 'gray'
                      }}
                      text={e.rating.rate_content}
                    />
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                      <Rating
                        type="star"
                        startingValue={e.rating.rate_numb}
                        ratingCount={5}
                        imageSize={20}
                        readonly
                        style={{
                          alignSelf: 'flex-start',
                          marginVertical: 10
                        }}
                      />
                      <BaseText
                        style={{
                          fontSize: 14,
                          marginVertical: 4,
                          color: 'gray'
                        }}
                        text={moment(e.rating.time_created).fromNow()}
                      />
                    </View>
                  </View>
                </View>
              </View>
            )
        )}
      </View>
    </View>
  )
}
