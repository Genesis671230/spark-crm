const axios = require('axios')
var FormData = require('form-data')

// import fs from 'fs'



// const BASE_URL = 'http://localhost:8000/housy/api/v2'
const BASE_URL = 'http://dev.housy.ae/seller/app/v1/api'

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

const setHeaderToken = token => {
  return {
    headers: {Authorization: `Bearer ${token}`}
  }
}

const seller = {
  seller_id: 2
}

const createAddProductBody = (data) => {
  var fd = new FormData();
  fd.append('seller_id', '2')

  for (var key in data) {
    console.log(`${key} :`, data[key])
    fd.append(key, data[key])
  }

  return fd
}

const getBody = data => {
  let fd = new FormData()
  for (var key in data) {
    console.log(`${key} :`, data[key])
    fd.append(key, data[key])
  }

  return fd
}

// Add a response interceptor
client.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response
  },
  function (error) {
    // Do something with response error
    if (error.response) {
      // Request made and server responded
      console.log('Response error1 = ', error)
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)

      return {status: false, data: error.message}
    } else if (error.request) {
      // The request was made but no response was received
      console.log('Request error2 = ', error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Unknown Error3', error.message)
    }

    return Promise.reject(error)
  }
)

const ENDPOINTS = {
  AUTH: {
    SINGUP: '/signup',
    LOGIN: '/login',
    LOGOUT: '/logout'
  },
  DASHBOARD: {
    GET_DASHBOARD_STATISTICS: '/get_statistics'
  },
  USER: {
    VERIFY_USER: '/verify_user',
    UPDATE_USER: '/update_user',
    FORGOT_PASSWORD: 'forgot_password',
    UPDATE_FCM: '/update_fcm',
    GET_SETTINGS: '/get_settings'
  },
  LISTS: {
    CATEGORY_LIST: '/get_categories'
  },
  Media: {
    GET_MEDIA: '/get_media',
  },
  PRODUCTS: {
    LIST: 'get_products',
    ADD_PRODUCT: '/add_products',
    UPDATE_PRODUCTS: '/update_products',
    DELETE_BY_ID: `/delete_product`
  }
}

export const signup = async data => {
  const response = await client.post(ENDPOINTS.AUTH.SINGUP, data)

  return response
}

export const login = async data => {
  const response = await client.post(ENDPOINTS.AUTH.LOGIN, data)

  return response
}

export const logout = async token => {
  const brtoken = setHeaderToken
  console.log('brtoken: ', brtoken)
  const response = await client.get(ENDPOINTS.AUTH.LOGOUT, brtoken)

  return response
}

export const getDashboardStatistics = async () => {
  // const brtoken = setHeaderToken
  console.log('Dashboard API')
  const response = await client.post(ENDPOINTS.DASHBOARD.GET_DASHBOARD_STATISTICS, getBody(seller))

  return response
}

export const getProductsList = async () => {
  // const brtoken = setHeaderToken(token)
  const response = await client.post(ENDPOINTS.PRODUCTS.LIST, getBody(seller))

  return response
}

export const add_Product = async (data) => {
  // const brtoken = setHeaderToken(token)
  const data1 = createAddProductBody(data)
  console.log("Created prodect data:", data1)
  const response = await client.post(ENDPOINTS.PRODUCTS.ADD_PRODUCT, data1)
console.log("Response add_Product", response)

  return response
}

export const deleteProductByID = async ({id}) => {
  // const brtoken = setHeaderToken(token)
  const response = await client.post(ENDPOINTS.PRODUCTS.DELETE_BY_ID, getBody({product_id: id}))

  return response
}

export const getCategories = async () => {
  // const brtoken = setHeaderToken(token)
  const response = await client.post(ENDPOINTS.LISTS.CATEGORY_LIST, getBody(seller))

  return response
}

export const getMedia = async () => {
  // const brtoken = setHeaderToken(token)
  const response = await client.post(ENDPOINTS.Media.GET_MEDIA, getBody(seller))

  return response
}

// export const getDashboardStatistics = async ({ token }) => {
//   //
//   let response = []
//   const brtoken = setHeaderToken(token)
//   await Promise.all([
//     client.get(ENDPOINTS.PRODUCTS.LIST, brtoken),
//     client.get(ENDPOINTS.ORDERS, brtoken),
//     client.get(ENDPOINTS.CATEGORY_WISE_PRODUCT, brtoken),
//     client.get(ENDPOINTS.SALE_STAT, brtoken),
//     client.get(ENDPOINTS.TOP_12_PRODUCT, brtoken),
//     client.get(ENDPOINTS.PACKAGE_INFO, brtoken)
//   ])
//     .then(allResponse => {
//       const products = allResponse[0].status === 200 ? allResponse[0].data : 'Error'
//       const orders = allResponse[1].status === 200 ? allResponse[1].data : 'Error'
//       const catetory_wise_products = allResponse[2].status === 200 ? allResponse[2].data : 'Error'
//       const sale_stat = allResponse[3].status === 200 ? allResponse[3].data : 'Error'
//       const top_12_product = allResponse[4].status === 200 ? allResponse[4].data : 'Error'
//       response = {
//         products,
//         orders,
//         catetory_wise_products,
//         sale_stat,
//         top_12_product
//       }
//     })
//     .catch(err => {
//       console.log('catch: ', err)
//     })

//   return response
// }

// export const getProfile = async ({ token }) => {
//   let response = []
//   const brtoken = setHeaderToken(token)
//   await Promise.all([
//     client.get(ENDPOINTS.PROFILE.GET_PROFILE, brtoken),
//     client.get(ENDPOINTS.PROFILE.GET_SHOP_INFO, brtoken)
//   ])
//     .then(allResponse => {
//       console.log('Get profile response:  ', allResponse)
//       const profile = allResponse[0].status === 200 ? allResponse[0].data : 'Error'
//       const shop = allResponse[1].status === 200 ? allResponse[1].data.data : 'Error'
//       response = {
//         profile,
//         shop
//       }
//     })
//     .catch(err => {
//       console.log('catch: ', err)
//     })

//   return response
// }
