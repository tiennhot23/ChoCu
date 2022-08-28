import React, {useEffect, useState} from 'react'
import {Dimensions, Button, ScrollView, Text, View} from 'react-native'
import {LineChart} from 'react-native-chart-kit'
import {baseUrl} from 'src/constants/api'
import MonthSelector from 'react-native-month-selector'
import moment from 'moment'

export default function AdminStatManager({route, navigation, ...props}) {
  const [data, setData] = useState([])
  const maxDay = Number(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
  )
  const label = Array.from(Array(maxDay).keys()).map((e) => e + 1)
  const [month, setMonth] = useState(moment(new Date()))

  useEffect(() => {
    fetch(baseUrl + '/admin/service-revenue', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        month: month.month() + 1,
        year: month.year()
      })
    })
      .then((res) => res.json())
      .then((res) => {
        let tmp = res.data.map((e) => ({
          day: new Date(e.time_buy).getDate(),
          price: e.price
        }))
        let i = 0
        let d = label.map((e) => {
          if (tmp.length !== 0 && e === tmp[i]?.day) {
            let _i = i++
            return {
              day: tmp[_i].day,
              price: tmp[_i].price
            }
          } else {
            return {
              day: e,
              price: 0
            }
          }
        })
        setData(d)
      })
      .catch((err) => console.log(err))
  }, [month])

  return (
    <>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '700',
          alignSelf: 'center',
          padding: 20,
          textAlign: 'center'
        }}>
        Biểu đồ doanh thu dịch vụ mua lượt đăng bài
      </Text>
      <MonthSelector
        selectedDate={month}
        onMonthTapped={(date) => {
          setMonth(date)
        }}
        localeLanguage="vi"
      />
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
          {data && data.length > 0 && (
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
          )}
        </View>
      </ScrollView>
    </>
  )
}
