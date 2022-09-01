import {helper} from '@common'
import {BaseText, ModalLoading, Icon} from '@components'
import React, {useEffect, useState} from 'react'
import {View, Image, FlatList, ScrollView, TouchableOpacity} from 'react-native'
import {Checkbox, Searchbar} from 'react-native-paper'
import {useDispatch, useSelector} from 'react-redux'
import {addMultiDetailsToCategory, requestDetails} from '../action'

export default function ListDetails({route, navigation}) {
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

  const [data, setData] = useState([])

  useEffect(() => {
    if (cateDetailsState.isActionDone) {
      onGoBack()
      navigation.goBack()
    }
  }, [cateDetailsState])

  useEffect(() => {
    if (detailsData.length > 0) {
      let temp = detailsData.filter((el) => {
        return !selected.find((e) => e === el.details_id)
      })
      temp = temp.map((e) => ({
        ...e,
        keyword: helper.removeAccent(e.details_title).toLowerCase()
      }))
      setData(temp)
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
          setSelectedDetails(newData)
        }}
        autoCorrect={false}
      />
      <ModalLoading loading={cateDetailsState.isFetching} />
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
          text={`Tạo mục chi tiết mới`}
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
    <>
      <View
        style={{
          paddingVertical: 10,
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
            paddingVertical: 10
          }}
          key={item.details_id}>
          <Checkbox
            color={'black'}
            status={selected ? 'checked' : 'unchecked'}
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
