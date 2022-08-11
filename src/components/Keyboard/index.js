import React from 'react'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

export default class KeyboardView extends React.PureComponent {
  render() {
    const {children, style} = this.props

    return (
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        contentContainerStyle={[{flexGrow: 1}, style]}
        extraScrollHeight={0}>
        {children}
      </KeyboardAwareScrollView>
    )
  }
}
