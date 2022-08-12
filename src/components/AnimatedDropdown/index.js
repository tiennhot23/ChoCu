import React, {useState} from 'react'
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  UIManager,
  View
} from 'react-native'
import {Icon} from '@components'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'
import {font} from '@styles'

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default function AnimatedDropdown({
  color = 'black',
  backgroundColor = 'white',
  width = '80%',
  height = 70,
  title,
  required,
  placeHolder = 'Select',
  item,
  items,
  data,
  onSelect
}) {
  const [isShown, setIsShown] = useState(false)
  const val = useSharedValue(0)

  const onClick = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(300, 'easeInEaseOut', 'scaleY')
    )
    setIsShown(!isShown)
    val.value = withSpring(isShown ? 1 : 0)
  }
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${val.value * 180}deg`}]
    }
  })
  return (
    <View
      style={{
        width,
        overflow: 'hidden',
        margin: 5
      }}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          marginTop: 10,
          paddingTop: 20,
          padding: 10,
          borderWidth: 1,
          borderColor: color,
          borderRadius: 5,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: backgroundColor,
          elevation: 3
        }}
        onPress={onClick}>
        <View
          style={{
            flexDirection: 'column'
          }}>
          <View style={{flexDirection: 'row'}}>
            {items ? (
              items.map((item) => (
                <Text
                  style={{
                    fontSize: 18,
                    padding: 2,
                    elevation: 3,
                    borderRadius: 5,
                    marginHorizontal: 5,
                    backgroundColor: '#e6e7e8',
                    color: color
                  }}>
                  {item}
                </Text>
              ))
            ) : item ? (
              <Text style={{color: color}}> {item} </Text>
            ) : (
              <Text style={{color: 'gray'}}> {placeHolder} </Text>
            )}
          </View>
        </View>
        <Animated.View
          style={[
            {
              position: 'absolute',
              right: 10
            },
            animatedStyle
          ]}>
          <Icon name={'caret-down-outline'} size={20} color={color} />
        </Animated.View>
      </TouchableOpacity>
      <Text
        style={{
          paddingHorizontal: 10,
          position: 'absolute',
          backgroundColor: backgroundColor,
          fontSize: font.FONT_SIZE_14,
          left: 10,
          marginHorizontal: 5,
          color: color,
          fontWeight: '800'
        }}>
        {title} {required && <Text style={{color: 'red'}}> * </Text>}
      </Text>
      {isShown && (
        <View
          style={{
            margin: 5,
            padding: 10,
            borderWidth: 1,
            borderColor: color,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            maxHeight: 200,
            backgroundColor: backgroundColor
          }}>
          <ScrollView nestedScrollEnabled={true}>
            {data.map((item) => (
              <Text
                style={{
                  padding: 10,
                  color: color
                }}
                onPress={() => {
                  onSelect(item)
                  setIsShown(false)
                }}
                key={item?.id}>
                {item?.title}
              </Text>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}
