import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {View, TouchableOpacity, Image, FlatList, Text} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {baseUrl} from 'src/constants/api'
import {POST_SCR} from 'src/constants/constant'
import {requestPendingPosts, requestReports} from './action'

export default function AdminReportManager({
  route,
  navigation,
  color = 'black',
  backgroundColor = 'white',
  ...props
}) {
  const reports = useSelector(
    (state) => state.adminReportsManagerReducer.reportsData
  )
  const [data, setData] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestReports())
  }, [])

  useEffect(() => {
    if (reports)
      setData(
        reports?.sort((a, b) => {
          return b?.reports[0].time_created.localeCompare(
            a?.reports[0].time_created
          )
        })
      )
  }, [reports])

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        overScrollMode={'never'}
        renderItem={({item, index}) => (
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingStart: 10,
              flexDirection: 'row',
              alignItems: 'center'
            }}
            key={item.post_id}
            onPress={() =>
              navigation.navigate(POST_SCR, {
                postId: item.post_id,
                reports: item.reports
              })
            }>
            <Image
              source={{uri: item.picture[0], width: 70, height: 70}}
              style={{aspectRatio: 1, margin: 5}}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                padding: 5,
                justifyContent: 'center'
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: color
                }}
                ellipsizeMode={'tail'}
                numberOfLines={2}>
                {item.title}
              </Text>
              <Text
                style={{
                  color: color
                }}
                ellipsizeMode={'tail'}
                numberOfLines={2}>
                {moment(item.reports[0].time_created).fromNow()}
              </Text>
            </View>

            <View
              style={{
                width: 70,
                height: 70,
                justifyContent: 'center',
                backgroundColor: 'black'
              }}>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  color: 'white'
                }}>
                {item.reports.length}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  textAlign: 'center',
                  color: 'white'
                }}>
                khiếu nại
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
