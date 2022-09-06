import {BaseText, ConfirmDialog, Icon} from '@components'
import {helper} from '@common'
import React, {useEffect, useState} from 'react'
import {
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native'
import {Checkbox, Searchbar} from 'react-native-paper'
import {useDispatch, useSelector} from 'react-redux'
import {deleteCategory, requestCategories} from '../action'

export default function ListCategory({route, navigation}) {
  const {theme} = route.params
  const categories = useSelector(
    (state) => state.adminCategoriesManagerReducer.categoriesData
  )
  const categoriesState = useSelector(
    (state) => state.adminCategoriesManagerReducer.categoriesState
  )
  const [data, setData] = useState([])
  const [dataHolder, setDataHolder] = useState([])
  const [category, setCategory] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(requestCategories())
  }, [])

  useEffect(() => {
    if (categoriesState.isActionDone) {
      // onGoBack()
      dispatch({type: 'RESET_STATE'})
      alert(categoriesState.message)
      setShowConfirm(false)
    } else {
      setShowConfirm(false)
      if (categoriesState.isError) {
        dispatch({type: 'RESET_STATE'})
        alert(categoriesState.message)
      }
    }
  }, [categoriesState])

  useEffect(() => {
    if (categories.length > 0) {
      let temp = categories.map((e) => ({
        ...e,
        keyword: helper.removeAccent(e.category_title).toLowerCase()
      }))
      setData(temp)
      setDataHolder(temp)
    }
  }, [categories])

  const onRefresh = () => {
    dispatch(requestCategories())
  }

  // useEffect(() => {
  //   setShowConfirm(false)
  // }, [category])

  return (
    <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
      <ConfirmDialog
        show={showConfirm}
        title={`Xoá danh mục ${category?.category_title}`}
        onCanceled={() => setShowConfirm(false)}
        onConfirmed={() => {
          dispatch(deleteCategory({category_id: category?.category_id}))
        }}
      />
      <Searchbar
        placeholder="Tìm kiếm..."
        lightTheme
        round
        onChangeText={(text) => {
          const newData = data.filter((item) => {
            const itemData = `${item.keyword}`
            const textData = helper.removeAccent(text).toLowerCase()

            return itemData.indexOf(textData) > -1
          })
          setDataHolder(newData)
        }}
        autoCorrect={false}
      />
      <ScrollView>
        <View>
          {dataHolder.map((item) => (
            <>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: 'gray',
                  margin: 10,
                  padding: 4
                }}
                key={item.category_id}
                onPress={() => {
                  navigation.navigate('catedetails', {
                    category: item
                  })
                }}>
                <View
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
                </View>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginHorizontal: 10
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    alignItems: 'center',
                    margin: 4
                  }}
                  onPress={() => {
                    navigation.navigate('createcate', {
                      category: item,
                      onGoBack: () => {}
                    })
                  }}>
                  <Icon name="pencil" color="black" size={20} />
                  <Text
                    style={{
                      fontWeight: '800',
                      color: 'black'
                    }}>
                    Chỉnh sửa
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    alignItems: 'center',
                    margin: 4
                  }}
                  onPress={() => {
                    setCategory(item)
                    setShowConfirm(true)
                  }}>
                  <Icon name="trash" color="black" size={20} />
                  <Text
                    style={{
                      fontWeight: '800',
                      color: 'black'
                    }}>
                    Xoá
                  </Text>
                </TouchableOpacity>
              </View>
            </>
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
