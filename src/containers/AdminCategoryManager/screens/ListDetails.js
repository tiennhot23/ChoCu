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
import {deleteDetails, requestDetails} from '../action'

export default function ListDetails({route, navigation}) {
  const {theme} = route.params
  const detailsData = useSelector(
    (state) => state.adminCategoriesManagerReducer.detailsData
  )
  const detailsState = useSelector(
    (state) => state.adminCategoriesManagerReducer.detailsState
  )
  const [data, setData] = useState([])
  const [dataHolder, setDataHolder] = useState([])
  const [details, setDetails] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(requestDetails())
  }, [])

  useEffect(() => {
    if (detailsState.isActionDone) {
      // onGoBack()
      dispatch({type: 'RESET_STATE'})
      alert(detailsState.message)
      setShowConfirm(false)
    } else {
      setShowConfirm(false)
      if (detailsState.isError) {
        dispatch({type: 'RESET_STATE'})
        alert(detailsState.message)
      }
    }
  }, [detailsState])

  useEffect(() => {
    if (detailsData.length > 0) {
      let temp = detailsData.map((e) => ({
        ...e,
        keyword: helper.removeAccent(e.details_title).toLowerCase()
      }))
      setData(temp)
      setDataHolder(temp)
    }
  }, [detailsData])

  const onRefresh = () => {
    dispatch(requestDetails())
  }

  // useEffect(() => {
  //   setShowConfirm(false)
  // }, [details])

  return (
    <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
      <ConfirmDialog
        show={showConfirm}
        title={`Xoá chi tiết ${details?.details_title}`}
        onCanceled={() => setShowConfirm(false)}
        onConfirmed={() => {
          dispatch(deleteDetails({details_id: details?.details_id}))
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
      <FlatList
        data={dataHolder}
        renderItem={({item}) => (
          <Item
            item={item}
            onPress={() => {
              // navigation.navigate('catedetails', {
              //   details: item
              // })
            }}
            onEdit={() => {
              navigation.navigate('createdetails', {
                details: item,
                onGoBack: () => {}
              })
            }}
            onDelete={() => {
              setDetails(item)
              setShowConfirm(true)
            }}
          />
        )}
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
        onPress={() =>
          navigation.navigate('createdetails', {onGoBack: onRefresh})
        }>
        <Icon name="add-outline" size={30} color="white" />
        <BaseText
          style={{marginHorizontal: 10, color: 'white'}}
          text={`Thêm chi tiết`}
        />
      </TouchableOpacity>
    </View>
  )
}

const Item = ({item, onPress, onEdit, onDelete}) => {
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
            {item?.editable && (
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 2,
                  alignItems: 'center'
                }}>
                <Icon name="create" size={20} />
                <BaseText
                  style={{marginHorizontal: 10}}
                  text={`Cho phép nhập`}
                />
              </View>
            )}
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
          onPress={onEdit}>
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
          onPress={onDelete}>
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
  )
}
