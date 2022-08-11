import {AnimatedDropdown, BottomSheet, Input, KeyboardView} from '@components'
import {constant} from '@constants'
import {dimen} from '@styles'
import React, {
  Component,
  createRef,
  forwardRef,
  useImperativeHandle
} from 'react'
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {connect} from 'react-redux'
import BottomSheetView from './components/BottomSheetView'
import FilePicker from './components/FilePicker'

class CreatePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: this.props.route.params,
      address: ''
    }
    this.inputRef = createRef()
    this.bottomSheetRef = null
  }

  openBottomSheet = () => {
    const isActive = this.bottomSheetRef?.isActive()
    if (isActive) {
      this.bottomSheetRef?.scrollTo(0)
    } else {
      this.bottomSheetRef?.scrollTo(-500)
    }
  }

  bindBottomSheet = (ref) => {
    //callback ref
    this.bottomSheetRef = ref
  }

  componentDidUpdate() {
    console.log('renderere')
  }

  //   sendComment = () => {
  //     let formData = new FormData()
  //     formData.append("content", content)
  //     files.forEach(file => {
  //        formData.append('file', { uri: file.uri, name: file.fileName, type: 'image/jpeg' })
  //     })
  //     fetch(`https://one-read-v2.herokuapp.com/comment/${route.params.endpoint}`, {
  //        method: 'post',
  //        headers: {
  //           'Content-Type': 'multipart/form-data',
  //           Authorization: `Bearer ${accessToken}`
  //        },
  //        body: formData
  //     })
  //        .then(async res => {
  //           fetch(`https://one-read-v2.herokuapp.com/comment/${route.params.endpoint}`)
  //              .then(async res => {
  //                 let data = await res.json()
  //                 setComment(data.data)
  //              }).catch(err => {

  //              })
  //           setContent('')
  //           setFiles([])
  //        }).catch(err => {
  //           console.log(err)
  //        })
  //  }

  render() {
    const {theme, address} = this.state
    const {navigate} = this.props.navigation
    const style = initStyle(theme)
    return (
      <GestureHandlerRootView
        style={{flex: 1, backgroundColor: theme.primaryBackground}}>
        <ScrollView>
          <View
            style={[
              {
                backgroundColor: theme.primaryBackground,
                flex: 1,
                alignItems: 'center'
              }
            ]}>
            <AnimatedDropdown
              title={'a'}
              required
              items={['react', 'node', '3']}
              data={['a', 'b', 'c']}
              onSelect={(itemSelected) => {}}
            />
            <FilePicker title={'Pick image'} icon={'image-outline'} />
            <Input title={'abc'} required ref={this.inputRef} />
            <TouchableOpacity
              style={{width: 100, height: 100, backgroundColor: 'red'}}
              onPress={this.openBottomSheet}
            />
            <Input
              title={'Địa chỉ'}
              _text={address}
              placeholder={'Nơi bán'}
              editable={false}
              required
              onPress={this.openBottomSheet}
            />
            <Input title={'abc'} />
            <Input title={'abc'} />
            <Input title={'abc'} />
            <Input title={'abc'} />
            <Input title={'abc'} />
          </View>
        </ScrollView>
        <BottomSheetView
          bind={this.bindBottomSheet}
          setAddress={(address) => {
            console.log(address)
            this.setState({address: address})
            this.bottomSheetRef?.scrollTo(0)
          }}
        />
      </GestureHandlerRootView>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)

const initStyle = (theme) => {
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      padding: dimen.wrapper_padding,
      backgroundColor: theme.primaryBackground,
      padding: dimen.wrapper_padding
    },
    header: {
      paddingVertical: dimen.wrapper_padding,
      borderBottomWidth: 0.7,
      borderBottomColor: theme.primaryForeground,
      flex: 1,
      flexDirection: 'row'
    }
  })
}
