import {BaseText, Icon} from '@components'
import React, {useEffect, useState} from 'react'
import {View, Image, FlatList, ScrollView, TouchableOpacity} from 'react-native'
import {Checkbox} from 'react-native-paper'
import {useDispatch, useSelector} from 'react-redux'
import {
  addDetailsToCategory,
  addMultiDetailsToCategory,
  requestCateDetails,
  requestCategories,
  requestDetails
} from '../action'

export default function ListOnlinePayments({route, navigation}) {
  let checked = []
  const {theme, selected, category_id, onGoBack} = route.params
  const detailsData = useSelector(
    (state) => state.adminCategoriesManagerReducer.detailsData
  )
  const cateDetailsState = useSelector(
    (state) => state.adminCategoriesManagerReducer.cateDetailsState
  )
  const [selectedDetails, setSelectedDetails] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(requestDetails())
  }, [])

  useEffect(() => {
    if (cateDetailsState.isActionDone) {
      onGoBack()
      navigation.goBack()
    }
  }, [cateDetailsState])

  useEffect(() => {
    if (detailsData.length > 0) {
      const temp = detailsData.filter((el) => {
        return !selected.find((e) => e === el.details_id)
      })
      setSelectedDetails(temp)
    }
  }, [detailsData])

  function add(id) {
    checked.push(id)
  }

  function remove(id) {
    checked.filter((e) => e !== id)
  }

  const onRefresh = () => {
    dispatch(requestDetails())
  }

  return (
    <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
      <FlatList
        data={selectedDetails}
        renderItem={({item}) => <Item item={item} add={add} remove={remove} />}
      />

      <TouchableOpacity
        style={{
          width: '70%',
          flexDirection: 'row',
          padding: 10,
          borderRadius: 100,
          backgroundColor: 'black',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          margin: 10
        }}
        onPress={() => {
          // navigation.navigate('createdetails')
          dispatch(
            addMultiDetailsToCategory({
              category_id,
              details: checked.map((e) => ({details_id: e}))
            })
          )
        }}>
        <Icon name="add-outline" size={30} color="white" />
        <BaseText
          style={{marginHorizontal: 10, color: 'white'}}
          text={`Thêm vào danh mục`}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: '70%',
          flexDirection: 'row',
          padding: 10,
          borderRadius: 100,
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          margin: 10
        }}
        onPress={() => {
          navigation.navigate('createdetails', {onGoBack: onRefresh})
        }}>
        <BaseText
          style={{marginHorizontal: 10, color: 'black', fontWeight: 'bold'}}
          text={`Tạo thông số chi tiết mới`}
        />
      </TouchableOpacity>
    </View>
  )
}

const Item = ({item, add, remove}) => {
  const [selected, setSelected] = useState(false)
  useEffect(() => {
    if (selected) add(item.details_id)
    else remove(item.details_id)
  }, [selected])
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center'
      }}
      key={item.details_id}>
      <Checkbox
        color={'black'}
        status={selected ? 'checked' : 'unchecked'}
        onPress={() => setSelected(!selected)}
      />
      <Image
        source={{uri: item.details_icon}}
        style={{width: 30, height: 30}}
      />
      <BaseText style={{marginHorizontal: 10}} text={`${item.details_title}`} />
    </View>
  )
}
