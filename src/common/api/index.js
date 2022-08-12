import {helper, storageHelper} from '@common'
import {STORAGE_CONST} from '@constants'

const baseUrl = 'http://localhost:3000'

export const STATUS_CODE_INVAILD_TOKEN = 401
export const STATUS_CODE_WRONG_PASS = 400
export const STATUS_CODE_FORBIDDEN = 403
export const STATUS_CODE_SUCCESS_200 = 200
export const STATUS_CODE_SUCCESS_300 = 300
export const STATUS_CODE_SEVER_ERROR = 500
export const STATUS_CODE_UNKNOW = -1

export const METHOD_POST = 'POST'
export const METHOD_GET = 'GET'
export const METHOD_PUT = 'PUT'
export const METHOD_DELETE = 'DELETE'
export const CONTENT_TYPE_FORM = 'application/x-www-form-urlencoded'
export const CONTENT_TYPE_JSON = 'application/json'
export const CONTENT_TYPE_MULTIPART = 'multipart/form-data'
export const ACCEPT_JSON = 'application/json'
export const AUTHORIZATION = 'authorization'
export const ACCEPT = 'accept'
export const CONTENT_TYPE = 'content-type'
export const EMPTY = true
export const ERROR = true
export const SUCCESS = true

const ONE_SECOND = 1000
export const TIME_OUT = 60 * ONE_SECOND

export const apiBase = (
  url,
  method,
  body,
  options = {
    setTimeOut: TIME_OUT,
    signal: null,
    navigation: null,
    isUpload: false,
    contentType: CONTENT_TYPE_JSON
  }
) => {
  return new Promise((resolve, reject) => {
    storageHelper
      .getItem(STORAGE_CONST.ACCESS_TOKEN)
      .then((token) => {
        let headers = new Headers()
        if (helper.isNonEmptyString(token)) {
          const authToken = `Bearer ${token}`
          headers.append(AUTHORIZATION, authToken)
        }
        headers.append(CONTENT_TYPE, options.contentType)

        // const params = {
        //   [ACCEPT]: CONTENT_TYPE_JSON,
        //   [CONTENT_TYPE]: options.isUpload
        //     ? CONTENT_TYPE_MULTIPART
        //     : CONTENT_TYPE_JSON
        // }
        // appendHeader(params, headers)

        if (!options.isUpload) {
          switch (method) {
            case METHOD_GET:
              // append params into url
              if (helper.isValidObject(options.params)) {
                url += getQueryString(options.params)
              }
              break
            case METHOD_POST:
              if (
                helper.isValidObject(headers) &&
                helper.isValidObject(headers.map[CONTENT_TYPE])
              ) {
                if (headers.map[CONTENT_TYPE] === CONTENT_TYPE_FORM) {
                  body = getQueryString(body)
                } else if (headers.map[CONTENT_TYPE] === CONTENT_TYPE_JSON) {
                  // add json object into body
                  body = JSON.stringify(body)
                }
              }
              break
            default:
              break
          }
        }

        console.log('API_REQUEST', {
          headers,
          url,
          body
        })

        fetch(url, {
          method: method,
          headers: headers,
          body: body
        })
          .then((res) => res.json())
          .then((json) => {
            console.log('API_RESPONSE SUCCESS: ', json)
            resolve(json)
          })
          .catch((err) => {
            console.log('API_RESPONSE ERROR: ', err)
            reject(err)
          })
      })
      .catch((err) => {
        reject({
          statusCode: STATUS_CODE_INVAILD_TOKEN,
          message: 'invalid token'
        })
      })
  })
}

export const getQueryString = (params) => {
  const esc = encodeURIComponent
  return Object.keys(params)
    .map((k) => `${esc(k)}=${esc(params[k])}`)
    .join('&')
}

// export const appendHeader = (params, headers) => {
//   const keys = Object.keys(params)
//   for (let i = 0; i < keys.length; i++) {
//     const key = keys[i]
//     if (headers.has(key)) {
//       headers.map[key] = params[key]
//     } else {
//       headers.append(key, params[key])
//     }
//   }
// }

// export const getHeaderParams = (token) => ({
//   [AUTHORIZATION]: `Bearer ${token}`,
//   [ACCEPT]: ACCEPT_JSON,
//   [CONTENT_TYPE]: CONTENT_TYPE_JSON
// })

// export const getHeaderAuthen = (token) => {
//   const headers = new Headers()
//   const params = getHeaderParams(token)
//   appendHeader(params, headers)
//   return headers
// }
