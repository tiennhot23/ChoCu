import {Icon} from '@components'
import React, {useEffect, useState} from 'react'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import ItemsSelection from 'src/containers/ItemsSelection'
import {
  getDataDistricts,
  getDataProvinces
} from 'src/containers/Location/action'

const PROVINCE = 'Tỉnh/Thành phố'
const DISTRICT = 'Quận/Huyện'
const CATEGORY = 'Danh mục'

export default function Filter({style}) {
  const [selectedLocation, setSelectedLocation] = useState({})

  const [selectedCategory, setSelectedCategory] = useState({})

  const dispatch = useDispatch()
  const provinces = useSelector((state) => state.locationReducer.provinces)
  const districts = useSelector((state) => state.locationReducer.districts)
  const [titleSelection, setTitleSelection] = useState('')
  const [dataSelection, setDataSelection] = useState([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    dispatch(getDataProvinces())
  }, [])

  const openSelection = (title, data) => {
    setVisible(true)
    setTitleSelection(title)
    setDataSelection(data)
  }

  const cancelSelection = () => {
    setVisible(false)
  }

  const applySelection = (valueSelected) => {
    setVisible(false)
    switch (titleSelection) {
      case PROVINCE:
        setSelectedLocation({
          province: valueSelected
        })
        dispatch(getDataDistricts(valueSelected))
        break
      case DISTRICT:
        setSelectedLocation({
          ...selectedLocation,
          district: valueSelected
        })
        break
      default:
        break
    }
  }

  return (
    <View style={{padding: 10}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="location-outline"
              size={20}
              color={style.colors.primaryText}
            />
            <Text
              style={{marginHorizontal: 4, color: style.colors.secondaryText}}>
              Khu vực:
            </Text>
            <SelectedBox
              style={style}
              title={selectedLocation.province || PROVINCE}
              onPress={() => openSelection(PROVINCE, provinces)}
            />
            {selectedLocation.province && (
              <SelectedBox
                style={style}
                title={selectedLocation.district || DISTRICT}
                onPress={() => openSelection(DISTRICT, districts)}
              />
            )}
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="information-circle-outline"
              size={20}
              color={style.colors.primaryText}
            />
            <Text
              style={{marginHorizontal: 4, color: style.colors.secondaryText}}>
              Chi tiết:
            </Text>
            <SelectedBox
              style={style}
              title={selectedCategory.category || CATEGORY}
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
      <ItemsSelection
        style={style}
        visible={visible}
        onCancel={cancelSelection}
        onApply={applySelection}
        data={dataSelection}
        title={titleSelection}
      />
    </View>
  )
}

const SelectedBox = ({style, title, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        margin: 5,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row'
      }}
      onPress={onPress}>
      <Text style={{marginEnd: 5, color: style.colors.primaryText}}>
        {title}
      </Text>
      <Icon
        name="caret-down-outline"
        size={20}
        color={style.colors.primaryText}
      />
    </TouchableOpacity>
  )
}
