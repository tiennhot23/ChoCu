const SAVE_USER = 'SAVE_USER'
const REMOVE_USER = 'REMOVE_USER'
export const currentUserAction = {
  SAVE_USER,
  REMOVE_USER
}

export const saveUser = ({userData, accessToken, fcmToken}) => {
  return {
    type: SAVE_USER,
    userData,
    accessToken,
    fcmToken
  }
}

export const removeUser = () => {
  return {
    type: REMOVE_USER
  }
}
