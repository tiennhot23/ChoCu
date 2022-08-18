import {BaseText, Icon} from '@components'
import moment from 'moment'
import React from 'react'
import {TouchableOpacity, View, Text} from 'react-native'
import {Avatar} from 'react-native-paper'
import {Rating} from 'react-native-ratings'

export default function DealRating({
  color = 'black',
  backgroundColor = 'white',
  width = '90%',
  rating,
  deal,
  user
}) {
  return (
    <View
      style={{
        width,
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
            fontWeight: '800',
            letterSpacing: 0.5,
            marginVertical: 4,
            color: color,
            borderBottomColor: color,
            borderBottomWidth: 1
          }}
          ellipsizeMode={'tail'}>
          {'Đánh giá'}
        </Text>
        {rating && (
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
              <Avatar.Image
                source={{
                  uri: user?.avatar
                }}
                size={30}
              />
              <View style={{marginStart: 10, flex: 1}}>
                <BaseText
                  style={[
                    {
                      fontSize: 20,
                      fontWeight: '800',
                      letterSpacing: 0.5,
                      marginVertical: 4,
                      color: 'gray',
                      marginEnd: 30
                    }
                  ]}
                  text={user?.name}
                />
                <BaseText
                  style={{
                    fontSize: 14,
                    marginVertical: 4,
                    color: 'gray'
                  }}
                  text={rating.rate_content}
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
                    startingValue={rating.rate_numb}
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
                    text={moment(rating.time_created).fromNow()}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}
