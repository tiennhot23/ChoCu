import React, {Component} from 'react'
import {Text, View} from 'react-native'
import BaseButton from 'src/components/BaseButton'
import ThemeContext, {ThemeConsumer} from 'src/context/ThemeContext'
import FilePicker from './components/FilePicker'
import Header from './components/Header'
import InputBox from './components/InputBox'
import SelectBox from './components/SelectBox'
import dynamicStyle from './style'

export default class CreatePost extends Component {
  static contextType = ThemeContext

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <ThemeConsumer>
        {(theme) => {
          const style = dynamicStyle(theme)
          const colors = style.colors
          return (
            <View style={style.wrapper}>
              <Header colors={colors} />
              <View style={{padding: 10}}>
                <SelectBox
                  colors={colors}
                  title={'Danh mục'}
                  required
                  content={'adas'}
                />
                <InputBox colors={colors} title={'Giá'} required content={''} />
                <FilePicker
                  colors={colors}
                  title={'Tải ảnh lên'}
                  icon={'image-outline'}
                />
                <View
                  style={{
                    flexDirection: 'row'
                  }}>
                  <BaseButton
                    text={'Huỷ bỏ'}
                    styleContainer={{
                      flex: 1,
                      backgroundColor: colors.primaryBackground,
                      borderWidth: 2,
                      borderColor: colors.primaryForeground,
                      padding: 20,
                      justifyContent: 'center',
                      borderRadius: 5,
                      margin: 5,
                      elevation: 4
                    }}
                    styleText={{
                      color: colors.primaryText,
                      fontWeight: '800',
                      fontSize: 18
                    }}
                  />
                  <BaseButton
                    text={'Đăng tin'}
                    styleContainer={{
                      flex: 1,
                      backgroundColor: colors.primaryForeground,
                      padding: 20,
                      justifyContent: 'center',
                      borderRadius: 5,
                      margin: 5,
                      elevation: 4
                    }}
                    styleText={{
                      color: colors.primaryText,
                      fontWeight: '800',
                      fontSize: 18
                    }}
                  />
                </View>
              </View>
            </View>
          )
        }}
      </ThemeConsumer>
    )
  }
}
