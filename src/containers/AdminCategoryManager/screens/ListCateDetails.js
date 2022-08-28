import {BaseText, Icon} from '@components'
import React, {useEffect} from 'react'
import {View, Image, FlatList, ScrollView, TouchableOpacity} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {requestCateDetails, requestCategories} from '../action'

export default function ListCateDetails({route, navigation}) {
  const {theme, category} = route.params
  const cateDetailsData = useSelector(
    (state) => state.adminCategoriesManagerReducer.cateDetailsData
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(requestCateDetails({category_id: category.category_id}))
  }, [])

  const onRefresh = () => {
    dispatch(requestCateDetails({category_id: category.category_id}))
  }

  return (
    <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
      <TouchableOpacity
        style={{
          width: '70%',
          flexDirection: 'row',
          padding: 10,
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          margin: 10
        }}>
        <Image
          source={{uri: category.category_icon}}
          style={{width: 30, height: 30}}
        />
        <BaseText
          style={{marginHorizontal: 10, color: 'black', fontSize: 20}}
          text={`${category.category_title}`}
        />
      </TouchableOpacity>
      <ScrollView>
        <View>
          {cateDetailsData.map((item) => (
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center'
              }}
              key={item.details_id}>
              <Image
                source={{uri: item.details_icon}}
                style={{width: 30, height: 30}}
              />
              <BaseText
                style={{marginHorizontal: 10}}
                text={`${item.details_title}`}
              />
              <BaseText
                color="red"
                style={{marginHorizontal: 10}}
                text={`${item.required ? '*' : ''}`}
              />
            </View>
          ))}
        </View>
      </ScrollView>

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
        onPress={() =>
          navigation.navigate('details', {
            selected: cateDetailsData.map((e) => e.details_id),
            category_id: category.category_id,
            onGoBack: onRefresh
          })
        }>
        <Icon name="add-outline" size={30} color="white" />
        <BaseText
          style={{marginHorizontal: 10, color: 'white'}}
          text={`Thêm thông số chi tiết`}
        />
      </TouchableOpacity>
    </View>
  )
}
