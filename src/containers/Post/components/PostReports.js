import {BaseText, Icon} from '@components'
import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {TouchableOpacity, View, Text} from 'react-native'
import {Avatar} from 'react-native-paper'
import {Rating} from 'react-native-ratings'
import {baseUrl} from 'src/constants/api'
import {USER_INFO_SCR} from 'src/constants/constant'

export default function PostReports({
  color = 'black',
  backgroundColor = 'white',
  width = '90%',
  reports
}) {
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
          {'Khiếu nại'}
        </Text>
        {reports?.length === 0 && <Text>Không có khiếu nại</Text>}
        {reports?.map((e) => (
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
            }}
            key={e.report_id}>
            <View
              style={{
                flexDirection: 'row'
              }}>
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
                  text={e.contact_info}
                />
                <BaseText
                  style={{
                    fontSize: 14,
                    marginVertical: 4,
                    color: 'gray'
                  }}
                  text={e.content}
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                  <BaseText
                    style={{
                      fontSize: 14,
                      marginVertical: 4,
                      color: 'gray'
                    }}
                    text={moment(e.time_created).fromNow()}
                  />
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
