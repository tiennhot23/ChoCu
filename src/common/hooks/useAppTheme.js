import {useSelector} from 'react-redux'
import {ENUM} from '@constants'
import {theme} from '@styles'

const useAppTheme = () => {
  const appTheme = useSelector((state) => state.appThemeReducer)

  return appTheme.currentTheme === ENUM.TAG_THEME.light ||
    appTheme.currentTheme === undefined
    ? theme.LightTheme.colors
    : theme.DarkTheme.colors
}

export default useAppTheme
