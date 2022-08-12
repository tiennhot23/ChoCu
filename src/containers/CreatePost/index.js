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
import {bindActionCreators} from 'redux'
import {requestCategories, requestDetails} from '../Categories/action'
import AddressSelection from './components/AddressSelection'
import CategorySelection from './components/CategorySelection'
import FilePicker from './components/FilePicker'
import FormButton from './components/FormButton'

class CreatePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: this.props.route.params,
      address: ''
    }
    this.inputRef = createRef()
    this.categorySelectionRef = createRef()
    this.addressSelectionRef = null
  }

  openAddressSeletion = () => {
    const isActive = this.addressSelectionRef?.isActive()
    if (isActive) {
      this.addressSelectionRef?.scrollTo(0)
    } else {
      this.addressSelectionRef?.scrollTo(-500)
    }
  }

  bindCallbackRef = (ref) => {
    //callback ref
    this.addressSelectionRef = ref
  }

  onSubmit = () => {
    alert(JSON.stringify({...this.categorySelectionRef.current.getData()}))
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
            <CategorySelection ref={this.categorySelectionRef} />
            <FilePicker title={'Pick image'} icon={'image-outline'} />
            <Input title={'abc'} required ref={this.inputRef} />
            <Input
              title={'Địa chỉ'}
              _text={address}
              placeholder={'Nơi bán'}
              editable={false}
              required
              onPress={this.openAddressSeletion}
            />
            <FormButton
              title={'Đăng bài'}
              styleContainer={{flex: 1}}
              onPress={this.onSubmit}
            />
          </View>
        </ScrollView>
        <AddressSelection
          bindCallbackRef={this.bindCallbackRef}
          setAddress={(address) => {
            this.setState({address: address})
            this.addressSelectionRef?.scrollTo(0)
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
