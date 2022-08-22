import {BaseText, Icon} from '@components'
import React, {useEffect} from 'react'
import {View, Image, FlatList, ScrollView, TouchableOpacity} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {requestCategories} from '../action'

export default function ListCategory({route, navigation}) {
  const {theme} = route.params
  const categories = useSelector(
    (state) => state.adminCategoriesManagerReducer.categoriesData
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(requestCategories())
  }, [])

  const onRefresh = () => {
    dispatch(requestCategories())
  }

  return (
    <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
      <ScrollView>
        <View>
          {categories.map((item) => (
            <TouchableOpacity
              activeOpacity={1}
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center'
              }}
              key={item.category_id}
              onPress={() =>
                navigation.navigate('catedetails', {
                  category: item
                })
              }>
              <Image
                source={{uri: item.category_icon}}
                style={{width: 30, height: 30}}
              />
              <BaseText
                style={{marginHorizontal: 10}}
                text={`${item.category_title}`}
              />
            </TouchableOpacity>
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
          navigation.navigate('createcate', {onGoBack: onRefresh})
        }>
        <Icon name="add-outline" size={30} color="white" />
        <BaseText
          style={{marginHorizontal: 10, color: 'white'}}
          text={`Thêm danh mục`}
        />
      </TouchableOpacity>
    </View>
  )
}
