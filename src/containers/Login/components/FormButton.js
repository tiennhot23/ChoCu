import React from 'react'
import {constant} from '@constants'
import {Button} from '@components'

const FormButton = ({
  title,
  color,
  textColor = 'black',
  onPress,
  width = constant.calcWidth(189)
}) => {
  return (
    <Button
      onPress={onPress}
      text={title}
      styleContainer={{
        width: width,
        height: constant.calcHeight(35),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color,
        borderRadius: constant.calcWidth(50),
        marginBottom: constant.calcWidth(20),
        marginHorizontal: constant.calcWidth(10)
      }}
      styleText={{
        fontWeight: 'bold',
        color: textColor
      }}
    />
  )
}

export default FormButton
