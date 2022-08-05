import {helper} from '@common'
import React, {useEffect} from 'react'
import {Dimensions, Image, ScrollView, Text, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {requestCategories} from 'src/containers/Categories/action'
import {FONT_SIZE_12, FONT_SIZE_16} from 'src/styles/fonts'

export default function Categories({theme}) {
  const dispatch = useDispatch()
  const categories = useSelector(
    (state) => state.categoriesReducer.dataCategories
  )

  useEffect(() => {
    if (helper.isEmptyArray(categories)) {
      dispatch(requestCategories())
    }
  }, [])

  return (
    <View
      style={{
        padding: 15
      }}>
      <Text
        style={{
          fontSize: FONT_SIZE_16,
          color: theme.primaryText,
          fontWeight: '600',
          letterSpacing: 1
        }}>
        Khám phá danh mục
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        overScrollMode={'never'}>
        {categories.map((item, index, arr) => {
          if (index & 1) return null
          return (
            <View style={{flexDirection: 'column'}} key={index}>
              <Category
                id={item.category_id}
                image={item.category_icon}
                title={item.category_title}
              />
              {index + 1 <= arr.length - 1 && (
                <Category
                  id={arr[index + 1].category_id}
                  image={arr[index + 1].category_icon}
                  title={arr[index + 1].category_title}
                />
              )}
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const Category = ({id, image, title}) => {
  return (
    <View
      style={{
        padding: 10,
        alignItems: 'center',
        width: 90,
        height: 90
      }}
      key={id}>
      <Image
        source={{uri: image}}
        style={{width: 40, height: 40, borderRadius: 15}}
      />
      <Text style={{fontSize: FONT_SIZE_12}}>{title}</Text>
    </View>
  )
}
