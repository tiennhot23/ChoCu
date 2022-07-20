import dataLocation from './location.json'

const GET_DATA_PROVINCES = 'GET_DATA_PROVINCES'
const GET_DATA_DISTRICTS = 'GET_DATA_DISTRICTS'
const GET_DATA_WARDS = 'GET_DATA_WARDS'

export const locationAction = {
  GET_DATA_PROVINCES,
  GET_DATA_DISTRICTS,
  GET_DATA_WARDS
}

export const getDataProvinces = () => (dispatch, getState) => {
  if (getState().locationReducer.provinces.length === 0) {
    dispatch({
      type: GET_DATA_PROVINCES,
      provinces: dataLocation.provinces.map((item) => item.name)
    })
  }
}

export const getDataDistricts = (province) => (dispatch, getState) => {
  dispatch({
    type: GET_DATA_DISTRICTS,
    districts: dataLocation.provinces
      .filter((item) => item.name === province)[0]
      .districts.map((item) => item.name)
  })
}

// export const getDataWards = (province, district) => (dispatch, getState) => {
//   if (getState().locationReducer.wards.length === 0) {
//     dispatch({
//       type: GET_DATA_WARDS,
//       wards: dataLocation.provinces
//         .filter((item) => item.name === province)
//         .districts.filter((item) => item.name === district)
//         .wards.map((item) => item.name)
//     })
//   }
// }
