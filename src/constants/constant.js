import {Dimensions} from 'react-native'

// Navigator
export const HOME_SCR = 'Home'
export const HOME_NAV = 'HomeNav'
export const POSTS_MANAGER_SCR = 'PostsManager'
export const CREATE_POST_SCR = 'CreatePost'
export const CREATE_DEAL_SCR = 'CreateDeal'
export const SELL_DEALS_MANAGER_SCR = 'SellDealsManager'
export const BUY_DEALS_MANAGER_SCR = 'BuyDealsManager'
export const DEALS_MANAGER_SCR = 'DealsManager'
export const PERSONAL_SCR = 'Personal'
export const POST_SCR = 'Post'
export const DEAL_SCR = 'Deal'
export const PROFILE_SCR = 'Profile'
export const LOGIN_SCR = 'Login'
export const SIGN_UP_SCR = 'SignUp'
export const FORGOT_PASSWORD_SCR = 'ForgotPassword'
export const OTP_SCR = 'OTP'
export const NOTIFICATION_SCR = 'Notification'
export const USER_INFO_SCR = 'UserInfo'
export const EDIT_INFO_SCR = 'EditInfo'
export const CHAT_SCR = 'Chat'
export const CHAT_BOX_SCR = 'ChatBox'
export const SEARCH_SCR = 'Search'
export const ADMIN_LOGIN_SCR = 'AdminLogin'
export const ADMIN_DASHBOARD_SCR = 'AdminDashboard'
export const ADMIN_POST_SCR = 'AdminPostManager'
export const ADMIN_REPORT_SCR = 'AdminReportManager'
export const ADMIN_ACCOUNT_SCR = 'AdminAccountManager'
export const ADMIN_CATEGORY_SCR = 'AdminCategoryManager'
export const MAIN_NAV = 'MainNav'
export const AUTH_NAV = 'AuthNav'
export const ADMIN_NAV = 'AdminNav'

export const width = Dimensions.get('window').width
export const height = Dimensions.get('window').height

const standardWidth = 375
const standardHeight = 667

export const calcWidth = (size) => Math.round((width / standardWidth) * size)

export const calcHeight = (size) => Math.round((height / standardHeight) * size)

export const headerHeight = calcHeight(45)

export const smallIcon = 20
export const normalIcon = 28
export const largeIcon = 40

export const default_user =
  'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg'
