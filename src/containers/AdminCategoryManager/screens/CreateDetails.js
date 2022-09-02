import {helper} from '@common'
import {Icon, Input, KeyboardView, ModalLoading} from '@components'
import {constant} from '@constants'
import {dimen} from '@styles'
import React, {useEffect, useRef, useState} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {TextInput} from 'react-native-gesture-handler'
import {Checkbox} from 'react-native-paper'
import {useDispatch, useSelector} from 'react-redux'
import {addDetails, updateDetails} from '../action'
import FilePicker from '../components/FilePicker'
import FormButton from '../components/FormButton'

export default function CreateDetails({
  route,
  navigation,
  color = 'black',
  backgroundColor = 'white',
  width = '80%'
}) {
  const {theme, details, onGoBack} = route.params
  const dispatch = useDispatch()
  const [icon, setIcon] = useState(null)
  const [checked, setChecked] = useState(false)
  const [contents, setContents] = useState([])
  const titleRef = useRef()
  const detailsState = useSelector(
    (state) => state.adminCategoriesManagerReducer.detailsState
  )

  useEffect(() => {
    if (details) {
      setContents(details?.default_content)
      setChecked(details?.editable)
    }
  }, [])

  useEffect(() => {
    if (detailsState.isActionDone) {
      onGoBack()
      navigation.goBack()
    }
  }, [detailsState])

  const onFilePicked = (file) => {
    setIcon(file)
  }

  const onSubmit = () => {
    const d = {
      details_title: titleRef.current.getText(),
      default_content: contents.filter((e) => e !== ''),
      editable: checked,
      details_icon: icon
    }

    if (!validateRequest(d)) return

    let formData = new FormData()
    formData.append('details_title', d.details_title)
    d.default_content.forEach((item, index) => {
      formData.append(`default_content[${index}]`, item)
    })
    formData.append('editable', d.editable)
    if (d.details_icon)
      formData.append('details_icon', {
        uri: d.details_icon.uri,
        name: d.details_icon.fileName,
        type: 'image/jpeg'
      })
    if (details)
      dispatch(updateDetails({details_id: details?.details_id, formData}))
    else dispatch(addDetails({formData}))
  }

  const validateRequest = (d) => {
    if (!d.details_title || helper.isEmptyString(d.details_title)) {
      titleRef.current.alertMessage('Tiêu đề không được để trống')
      return false
    }
    if (
      !d.details_icon &&
      details &&
      helper.isEmptyString(details?.details_icon)
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
        <ModalLoading loading={detailsState.isFetching} />
        <FilePicker
          title={'Choose icon'}
          icon={'image-outline'}
          defaultFileUrl={details?.details_icon}
          onPicked={onFilePicked}
        />
        <Input
          title={'Tiêu đề'}
          required
          ref={titleRef}
          _text={details?.details_title}
          placeholder={'Tiêu đề'}
        />

        <View style={{width, paddingVertical: 20}}>
          <Text>Các nội dung mặc định</Text>
        </View>
        {contents.map((item, index) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width
            }}>
            <TextInput
              style={{
                flex: 1,
                borderRadius: 10,
                borderWidth: 1,
                margin: 10,
                padding: 10
              }}
              placeholder={`Nội dung ${index + 1}`}
              value={item}
              onChangeText={(text) => {
                let a = [...contents]
                a[index] = text
                setContents(a)
              }}
            />
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                let a = [...contents]
                a.splice(index, 1)
                setContents(a)
              }}>
              <Icon name="remove-circle-outline" size={30} color="black" />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity
          activeOpacity={1}
          style={{
            borderRadius: 100,
            borderStyle: 'dashed',
            borderWidth: 1,
            width: 50,
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={() => {
            let a = [...contents]
            a.push('')
            setContents(a)
          }}>
          <Icon name="add" size={30} />
        </TouchableOpacity>
        <View
          style={{
            width,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}>
          <Checkbox
            color={color}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked)
            }}
          />
          <Text style={{color: color}}>Cho phép chỉnh sửa</Text>
        </View>
        <FormButton title={'Lưu'} onPress={onSubmit} />
      </View>
    </KeyboardView>
  )
}
