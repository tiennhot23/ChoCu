import {Icon} from '@components'
import React, {useState} from 'react'
import {TouchableOpacity, Text, View, TextInput, Image} from 'react-native'
import {launchImageLibrary} from 'react-native-image-picker'

export default function FilePicker({
  color = 'black',
  backgroundColor = 'white',
  width = '80%',
  height = 150,
  title,
  icon,
  onPicked
}) {
  const [file, setFile] = useState(null)

  const options = {
    title: 'Select image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false
    }
  }

  const pickImage = async () => {
    try {
      const res = (await launchImageLibrary(options)).assets
      setFile(res[0])
      onPicked(res[0])
    } catch (ignored) {}
  }

  return (
    <View
      style={{
        width,
        height,
        margin: 5
      }}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flex: 1,
          padding: 10,
          borderWidth: 1,
          borderColor: color,
          backgroundColor: backgroundColor,
          borderStyle: 'dashed',
          borderRadius: 5
        }}
        onPress={pickImage}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          {file ? (
            <Image
              source={{uri: file.uri, width: '100%', height: '100%'}}
              resizeMode={'contain'}
            />
          ) : (
            <>
              <Icon name={icon} size={40} color={color} />
              <Text
                style={{
                  marginEnd: 5,
                  color: color
                }}>
                {title}
              </Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  )
}
