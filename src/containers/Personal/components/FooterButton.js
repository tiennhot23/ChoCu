import {Button} from '@components'
import {font} from '@styles'
import React from 'react'

export default function FooterButton({
  color = 'black',
  backgroundColor = 'white',
  width = '80%',
  height = 70,
  styleContainer,
  styleText,
  title,
  onPress
}) {
  return (
    <Button
      onPress={onPress}
      text={title}
      styleContainer={[
        styleContainer,
        {
          width,
          height,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: backgroundColor,
          borderRadius: 10,
          margin: 5,
          borderWidth: 1,
          borderColor: color
        }
      ]}
      styleText={[
        {
          fontWeight: 'bold',
          fontSize: font.FONT_SIZE_16,
          color: color
        },
        styleText
      ]}
    />
  )
}
