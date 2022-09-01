import {helper} from '@common'
import {Input, KeyboardView, ModalLoading} from '@components'
import React, {useEffect, useRef, useState} from 'react'
import {View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {addCategory, addDetails, updateCategory} from '../action'
import FilePicker from '../components/FilePicker'
import FormButton from '../components/FormButton'

export default function CreateCategory({
  route,
  navigation,
  color = 'black',
  backgroundColor = 'white',
  width = '80%'
}) {
  const {theme, category, onGoBack} = route.params
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
    const c = {
      category_title: titleRef.current.getText(),
      category_icon: icon
    }

    if (!validateRequest(c)) return

    let formData = new FormData()
    formData.append('category_title', c.category_title)
    if (c.category_icon)
      formData.append('category_icon', {
        uri: c.category_icon.uri,
        name: c.category_icon.fileName,
        type: 'image/jpeg'
      })
    if (category) {
      dispatch(updateCategory({category_id: category?.category_id, formData}))
    } else dispatch(addCategory({formData}))
  }

  const validateRequest = (c) => {
    if (!c.category_title || helper.isEmptyString(c.category_title)) {
      titleRef.current.alertMessage('Tiêu đề không được để trống')
      return false
    }
    if (
      !c.category_icon &&
      category &&
      helper.isEmptyString(category?.category_icon)
    ) {
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
          defaultFileUrl={category?.category_icon}
          onPicked={onFilePicked}
        />
        <Input
          title={'Tiêu đề'}
          required
          ref={titleRef}
          _text={category?.category_title}
          placeholder={'Tiêu đề'}
        />

        <FormButton title={'Lưu'} onPress={onSubmit} />
      </View>
    </KeyboardView>
  )
}
