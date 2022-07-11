import {Dimensions} from 'react-native'

// Navigator
export const HOME_SCR = 'Home'
export const HOME_NAV = 'HomeNav'
export const POSTS_MANAGER_SCR = 'PostsManager'
export const CREATE_POST_SCR = 'CreatePost'
export const PERSONAL_SCR = 'Personal'
export const POST_SCR = 'Post'
export const PROFILE_SCR = 'Profile'
export const LOGIN_SCR = 'Login'
export const SIGN_UP_SCR = 'SignUp'
export const FORGOT_PASSWORD_SCR = 'ForgotPassword'
export const OTP_SCR = 'OTP'
export const NOTIFICATION_SCR = 'Notification'
export const USER_INFO_SCR = 'UserInfo'
export const EDIT_INFO_SCR = 'EditInfo'

export const width = Dimensions.get('window').width
export const height = Dimensions.get('window').height

const standardWidth = 375
const standardHeight = 667

export const calcWidth = (size) => Math.round((width / standardWidth) * size)

export const calcHeight = (size) => Math.round((height / standardHeight) * size)
