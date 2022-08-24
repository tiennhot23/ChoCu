import React from 'react'
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {ADMIN_CATEGORY_SCR, ADMIN_POST_SCR} from 'src/constants/constant'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'
import moment from 'moment'

export default function AddminDashboard({route, navigation, ...props}) {
  const {theme} = route.params
  const mdata = [
    {
      time_buy: '2022-08-05T17:00:00.000Z',
      price: 90000
    },
    {
      time_buy: '2022-08-12T17:00:00.000Z',
      price: 20030
    },
    {
      time_buy: '2022-08-24T17:00:00.000Z',
      price: 110000
    }
  ].map((e) => ({day: new Date(e.time_buy).getDate(), price: e.price}))
  const maxDay = Number(new Date(2022, 2, 0).getDate())
  const label = Array.from(Array(maxDay).keys()).map((e) => e + 1)
  let i = 0
  const data = label.map((e) => {
    if (e === mdata[i]?.day) {
      let _i = i++
      return {
        day: mdata[_i].day,
        price: mdata[_i].price
      }
    } else {
      return {
        day: e,
        price: 0
      }
    }
  })
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '700',
          alignSelf: 'center',
          padding: 20
        }}>
        Services Revenue Chart
      </Text>
      <ScrollView
        horizontal
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
          }}>
          <LineChart
            data={{
              labels: label,
              datasets: [
                {
                  data: data.map((e) => e.price)
                }
              ]
            }}
            width={Dimensions.get('window').width + 700}
            height={300}
            yAxisSuffix="d"
            chartConfig={{
              backgroundColor: '#555',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            bezier
            style={{
              marginVertical: 8
            }}
          />
        </View>
      </ScrollView>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            width: '40%',
            aspectRatio: 1,
            margin: 20,
            elevation: 4,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.primaryBackground,
            borderRadius: 25
          }}
          onPress={() => navigation.navigate(ADMIN_POST_SCR)}>
          <Text>Duyệt tin đăng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '40%',
            aspectRatio: 1,
            margin: 20,
            elevation: 4,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.primaryBackground,
            borderRadius: 25
          }}>
          <Text>Báo cáo vi phạm</Text>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            width: '40%',
            aspectRatio: 1,
            margin: 20,
            elevation: 4,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.primaryBackground,
            borderRadius: 25
          }}
          onPress={() => navigation.navigate(ADMIN_CATEGORY_SCR)}>
          <Text>Quản lí danh mục</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '40%',
            aspectRatio: 1,
            margin: 20,
            elevation: 4,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.primaryBackground,
            borderRadius: 25
          }}>
          <Text>Quản lí người dùng</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
