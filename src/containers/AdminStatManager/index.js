import React, {useEffect, useState} from 'react'
import {Dimensions, Button, ScrollView, Text, View} from 'react-native'
import {LineChart} from 'react-native-chart-kit'
import {baseUrl} from 'src/constants/api'
import MonthSelector from 'react-native-month-selector'
import moment from 'moment'
import {AnimatedDropdown} from '@components'

export default function AdminStatManager({route, navigation, ...props}) {
  const [data, setData] = useState([])
  const label = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const [total, setTotal] = useState(0)
  const [year, setYear] = useState(new Date().getFullYear())
  const years = Array.from(new Array(20), (val, index) => ({
    id: new Date().getFullYear() - index,
    title: new Date().getFullYear() - index
  }))

  useEffect(() => {
    fetch(baseUrl + '/admin/service-revenue', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        year: year
      })
    })
      .then((res) => res.json())
      .then((res) => {
        let t = 0
        let {data} = res
        let i = 0
        let d = label.map((e) => {
          if (data.length !== 0 && e === data[i]?.month) {
            let _i = i++
            t += data[_i].price
            return {
              month: data[_i].month,
              price: data[_i].price
            }
          } else {
            return {
              month: e,
              price: 0
            }
          }
        })
        setTotal(t)
        setData(d)
      })
      .catch((err) => console.log(err))
  }, [year])

  return (
    <View
      style={{
        backgroundColor: 'white'
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '700',
          alignSelf: 'center',
          padding: 20,
          textAlign: 'center',
          color: 'black'
        }}>
        Biểu đồ doanh thu dịch vụ mua lượt đăng bài theo năm
      </Text>
      <View style={{flexDirection: 'row'}}>
        <AnimatedDropdown
          title={'Năm'}
          data={years}
          item={year}
          width={100}
          onSelect={(e) => setYear(e.id)}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: '400',
            alignSelf: 'center',
            padding: 5,
            textAlign: 'center',
            color: 'black'
          }}>
          Doanh thu:{' '}
          {total.toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND'
          })}
        </Text>
      </View>
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
              width={Dimensions.get('window').width}
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
    </View>
  )
}
