import React from 'react'
import {Image, ScrollView, Text, View} from 'react-native'
import {FONT_SIZE_16} from 'src/styles/fonts'

export default function Categories({style, categories}) {
  return (
    <View
      style={{
        padding: 15,
        elevation: 4,
        backgroundColor: style.colors.primaryBackground,
        borderTopColor: style.colors.secondaryBackground,
        borderTopWidth: 10
      }}>
      <Text
        style={{
          fontSize: FONT_SIZE_16,
          color: style.colors.primaryText,
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
              <Category id={item.id} image={item.image} title={item.title} />
              {index + 1 <= arr.length - 1 && (
                <Category
                  id={arr[index + 1].id}
                  image={arr[index + 1].image}
                  title={arr[index + 1].title}
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
        padding: 20,
        alignItems: 'center'
      }}
      key={id}>
      <Image
        source={{uri: image}}
        style={{width: 50, height: 50, borderRadius: 15}}
      />
      <Text>{title}</Text>
    </View>
  )
}
