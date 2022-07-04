import {useSelector} from 'react-redux'
import {ENUM} from '@constants'
import {theme} from '@styles'

const useAppTheme = () => {
  const appTheme = useSelector((state) => state.appThemeReducer)

  return appTheme.currentTheme === ENUM.TAG_THEME.light
    ? theme.LightTheme
    : theme.DarkTheme
}

export default useAppTheme
