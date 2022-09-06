import {BaseText, Icon, ModalLoading} from '@components'
import {constant} from '@constants'
import React, {useEffect, useState} from 'react'
import {View, Image, FlatList, ScrollView, TouchableOpacity} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {
  removeMultiDetailsFromCategory,
  requestCateDetails,
  requestCategories
} from '../action'

export default function ListCateDetails({route, navigation}) {
  const [checked, setCheck] = useState([])
  const [onClear, setOnClear] = useState(false)
  const {theme, category} = route.params
  const cateDetailsData = useSelector(
    (state) => state.adminCategoriesManagerReducer.cateDetailsData
  )
  const cateDetailsState = useSelector(
    (state) => state.adminCategoriesManagerReducer.cateDetailsState
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(requestCateDetails({category_id: category.category_id}))
  }, [])

  const onRefresh = () => {
    dispatch(requestCateDetails({category_id: category.category_id}))
  }

  function add(id) {
    setCheck((checked) => [...checked, id])
  }

  function remove(id) {
    setCheck((checked) => checked.filter((e) => e !== id))
  }

  useEffect(() => {
    if (checked.length === 0) setOnClear(false)
  }, [checked])

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
      <ModalLoading loading={cateDetailsState.isActioning} />
      <FlatList
        data={cateDetailsData}
        renderItem={({item}) => (
          <Item item={item} add={add} remove={remove} onClear={onClear} />
        )}
      />
      {/* <ScrollView>
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
            </View>
          ))}
        </View>
      </ScrollView> */}

      {checked.length > 0 ? (
        <>
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
              dispatch(
                removeMultiDetailsFromCategory({
                  category_id: category.category_id,
                  details: checked.map((e) => ({details_id: e}))
                })
              )
              setCheck([])
            }}>
            <BaseText
              style={{marginHorizontal: 10, color: 'white'}}
              text={`Xoá các mục đã chọn`}
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
              justifyContent: 'center'
            }}
            onPress={() => {
              setOnClear(true)
            }}>
            <Icon name="close-circle-outline" size={30} color="black" />
            <BaseText
              style={{marginHorizontal: 10, color: 'black', fontWeight: 'bold'}}
              text={`Huỷ`}
            />
          </TouchableOpacity>
        </>
      ) : (
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
            navigation.navigate('restdetails', {
              selected: cateDetailsData.map((e) => e.details_id),
              category_id: category.category_id,
              onGoBack: onRefresh
            })
          }>
          <Icon name="add-outline" size={30} color="white" />
          <BaseText
            style={{marginHorizontal: 10, color: 'white'}}
            text={`Thêm mục thông tin chi tiết`}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

const Item = ({item, add, remove, onClear}) => {
  const [selected, setSelected] = useState(false)
  useEffect(() => {
    if (selected) add(item.details_id)
    else remove(item.details_id)
  }, [selected])
  useEffect(() => {
    setSelected(false)
  }, [onClear])
  return (
    <>
      <View
        style={{
          paddingVertical: 5,
          borderWidth: 1,
          borderColor: 'gray',
          margin: 10,
          padding: 4
        }}
        key={item.category_id}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingVertical: 10,
            alignItems: 'center'
          }}
          key={item.details_id}>
          <Icon
            name="close-circle-outline"
            color={selected ? 'red' : 'gray'}
            size={constant.smallIcon}
            style={{
              paddingHorizontal: 10,
              justifyContent: 'flex-end'
            }}
            onPress={() => setSelected(!selected)}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'column'
            }}>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 2,
                alignItems: 'center'
              }}>
              <Image
                source={{uri: item.details_icon}}
                style={{width: 30, height: 30}}
              />
              <BaseText
                style={{marginHorizontal: 10}}
                text={`${item.details_title}`}
              />
            </View>
            {item?.default_content?.length > 0 && (
              <ScrollView horizontal style={{marginVertical: 10}}>
                {item?.default_content?.map((e) => (
                  <BaseText
                    style={{
                      marginHorizontal: 10,
                      marginVertical: 3,
                      padding: 10,
                      backgroundColor: '#e6e7e8',
                      borderRadius: 10,
                      height: 50,
                      textAlign: 'center'
                    }}
                    text={`${e}`}
                  />
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </View>
    </>
  )
}
