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
  const [files, setFiles] = useState([null])

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

  const pickImage = async (index) => {
    try {
      const res = (await launchImageLibrary(options)).assets
      if (res[0]) {
        let a = [...files]
        if (a[index] === null && a.length < 5) a.push(null)
        a[index] = res[0]
        setFiles(a)
        onPicked(a)
      }
    } catch (ignored) {}
  }

  return (
    <View style={{width}}>
      {files.map((file, index) => (
        <TouchableOpacity
          activeOpacity={1}
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: color,
            backgroundColor: backgroundColor,
            borderStyle: 'dashed',
            borderRadius: 5,
            height,
            margin: 5
          }}
          onPress={() => pickImage(index)}>
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
      ))}
    </View>
  )
}
