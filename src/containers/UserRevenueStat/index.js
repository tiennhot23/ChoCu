import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import React from 'react'
import {useEffect} from 'react'
import {useState} from 'react'
import {Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {apiBase, METHOD_POST} from 'src/common/api'
import {baseUrl} from 'src/constants/api'

export default function UserRevenueStat({route, navigation, ...props}) {
  const {theme} = route.params
  const [fDate, setFDate] = useState(new Date('2022-01-01'))
  const [tDate, setTDate] = useState(new Date())
  const [showFDate, setShowFDate] = useState(false)
  const [showTDate, setShowTDate] = useState(false)
  const [textFDate, setTextFDate] = useState(
    fDate.getFullYear() +
      '-' +
      ('0' + (fDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + fDate.getDate()).slice(-2)
  )
  const [textTDate, setTextTDate] = useState(
    tDate.getFullYear() +
      '-' +
      ('0' + (tDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + tDate.getDate()).slice(-2)
  )
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)

  const onChangeFromDate = (event, selectedDate) => {
    const currentDate = selectedDate || fDate
    setShowFDate(false)
    setFDate(currentDate)
    setTextFDate(
      currentDate.getFullYear() +
        '-' +
        ('0' + (currentDate.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + currentDate.getDate()).slice(-2)
    )

    if (currentDate > tDate) {
      setTDate(currentDate)
      setTextTDate(
        currentDate.getFullYear() +
          '-' +
          ('0' + (currentDate.getMonth() + 1)).slice(-2) +
          '-' +
          ('0' + currentDate.getDate()).slice(-2)
      )
    }
  }
  const onChangeToDate = (event, selectedDate) => {
    const currentDate = selectedDate || tDate
    setShowTDate(false)
    setTDate(currentDate)
    setTextTDate(
      currentDate.getFullYear() +
        '-' +
        ('0' + (currentDate.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + currentDate.getDate()).slice(-2)
    )
  }

  useEffect(() => {
    getRevenueStat()
  }, [textFDate, textTDate])
  useEffect(() => {
    let t = 0
    data.map((e) => (t += e.price_sum))
    setTotal(t)
  }, [data])

  const getRevenueStat = () => {
    apiBase(baseUrl + '/user/revenue-stat', METHOD_POST, {
      fromDate: textFDate,
      toDate: textTDate
    })
      .then(async (response) => {
        const {message, code} = response
        if (code === 200) {
          setData(response.data)
        } else {
          alert(message)
        }
      })
      .catch((err) => {
        alert(message)
      })
  }
  return (
    <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: 'black', padding: 10, alignSelf: 'center'}}>
          Từ ngày:
        </Text>
        <TouchableOpacity
          style={{borderWidth: 1, margin: 10}}
          activeOpacity={1}
          onPress={() => setShowFDate(!showFDate)}>
          <Text style={{color: 'black', padding: 10}}>{textFDate}</Text>
        </TouchableOpacity>
        <Text style={{color: 'black', padding: 10, alignSelf: 'center'}}>
          Đến ngày:
        </Text>
        <TouchableOpacity
          style={{borderWidth: 1, margin: 10}}
          activeOpacity={1}
          onPress={() => setShowTDate(!showTDate)}>
          <Text style={{color: 'black', padding: 10}}>{textTDate}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          margin: 5,
          borderWidth: 1,
          backgroundColor: '#999999'
        }}>
        <Text
          style={{flex: 2, color: 'black', padding: 10, alignSelf: 'center'}}>
          STT
        </Text>
        <Text
          style={{flex: 10, color: 'black', padding: 10, alignSelf: 'center'}}>
          Ngày đặt
        </Text>
        <Text
          style={{
            flex: 10,
            textAlign: 'center',
            color: 'black',
            padding: 10,
            alignSelf: 'center'
          }}>
          Doanh thu
        </Text>
      </View>
      <ScrollView>
        {data.map((e, i) => (
          <View style={{flexDirection: 'row', margin: 5, borderWidth: 1}}>
            <Text
              style={{
                flex: 2,
                color: 'black',
                padding: 10,
                alignSelf: 'center'
              }}>
              {i + 1}
            </Text>
            <Text
              style={{
                flex: 10,
                color: 'black',
                padding: 10,
                alignSelf: 'center'
              }}>
              {moment(e.time_created).format('DD-MM-yyyy')}
            </Text>
            <Text
              style={{
                flex: 10,
                textAlign: 'center',
                color: 'black',
                padding: 10,
                alignSelf: 'center'
              }}>
              {e.price_sum.toLocaleString('en-US', {
                style: 'currency',
                currency: 'VND'
              })}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Text
          style={{
            color: 'black',
            fontSize: 24,
            letterSpacing: 1,
            fontWeight: '600',
            padding: 10,
            alignSelf: 'flex-end',
            justifyContent: 'flex-end'
          }}>
          {`Tổng tiền: ${total.toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND'
          })}`}
        </Text>
      </View>
      {showFDate && (
        <DateTimePicker
          value={fDate}
          mode="date"
          onChange={onChangeFromDate}
          maximumDate={new Date()}
        />
      )}
      {showTDate && (
        <DateTimePicker
          value={tDate}
          mode="date"
          onChange={onChangeToDate}
          maximumDate={new Date()}
          minimumDate={fDate}
        />
      )}
    </View>
  )
}
