import {helper} from '@common'
import {Input, KeyboardView, ModalLoading} from '@components'
import React, {useEffect, useRef, useState} from 'react'
import {View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {addCategory, addDetails} from '../action'
import FilePicker from '../components/FilePicker'
import FormButton from '../components/FormButton'

export default function CreateCategory({
  route,
  navigation,
  color = 'black',
  backgroundColor = 'white',
  width = '80%'
}) {
  const {theme, onGoBack} = route.params
  const dispatch = useDispatch()
  const [icon, setIcon] = useState(null)
  const titleRef = useRef()
  const categoriesState = useSelector(
    (state) => state.adminCategoriesManagerReducer.categoriesState
  )

  useEffect(() => {
    if (categoriesState.isActionDone) {
      onGoBack()
      navigation.goBack()
    }
  }, [categoriesState])

  const onFilePicked = (file) => {
    setIcon(file)
  }

  const onSubmit = () => {
    const category = {
      category_title: titleRef.current.getText(),
      category_icon: icon
    }

    if (!validateRequest(category)) return

    let formData = new FormData()
    formData.append('category_title', category.category_title)
    if (category.category_icon)
      formData.append('category_icon', {
        uri: category.category_icon.uri,
        name: category.category_icon.fileName,
        type: 'image/jpeg'
      })
    dispatch(addCategory({formData}))
  }

  const validateRequest = (category) => {
    if (
      !category.category_title ||
      helper.isEmptyString(category.category_title)
    ) {
      titleRef.current.alertMessage('Tiêu đề không được để trống')
      return false
    }
    if (!category.category_icon) {
      alert('Yêu cầu cung cấp icon')
      return false
    }
    return true
  }

  return (
    <KeyboardView>
      <View
        style={[
          {
            backgroundColor: theme.primaryBackground,
            flex: 1,
            alignItems: 'center'
          }
        ]}>
        <ModalLoading loading={categoriesState.isFetching} />
        <FilePicker
          title={'Choose icon'}
          icon={'image-outline'}
          onPicked={onFilePicked}
        />
        <Input
          title={'Tiêu đề'}
          required
          ref={titleRef}
          placeholder={'Tiêu đề'}
        />

        <FormButton title={'Lưu'} onPress={onSubmit} />
      </View>
    </KeyboardView>
  )
}
