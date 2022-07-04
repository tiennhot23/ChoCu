import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class KeyboardView extends React.PureComponent {
  render() {
    const { children, style } = this.props

    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        bounces={false}
        overScrollMode="always"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        contentContainerStyle={[{ flex: 1 }, style]}
        extraScrollHeight={60}
      >
        {children}
      </KeyboardAwareScrollView>
    )
  }
}
