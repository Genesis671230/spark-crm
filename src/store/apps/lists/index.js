import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getCategories, getMedia} from 'src/configs/apiConfig'

// Latest version - v3.0.0 with Tree Shaking to reduce bundle size
import {Country} from 'country-state-city'

async function getCountries() {
  const newcountries = await Country.getAllCountries()
  console.log('Data country list: ', newcountries)

  return newcountries
}

const indicator = [{name: 'None', value:0},{name: 'Veg', value:1}, {name: 'Non-Veg', value:2},]
const deliverableType = [{name: 'None', value:0},{name: 'All', value:1}, {name: 'Included', value:2},{name:'Excluded', value: 3}]
const productType = [{name: 'Simple Product', value:'simple_product'},{name: 'Variable Product', value:'variable_product'}]

// ** Fetch Categories List
export const allList = createAsyncThunk('allList', async params => {
  // console.log('token params: ', params)
  let list = {}

  await Promise.all([getCategories(params), getCountries(), getMedia(params)])
    .then(allResponse => {

      list = { categories: allResponse[0].data?.data, mediaImages: allResponse[2].data?.data, countries: allResponse[1], indicator, deliverableType, productType  }
    })
    .catch(err => {
      console.log('catch: ', err)
    })
  console.log('All Categories: ', list)

  return list
})

// Reducer to Get update data from action and store it in state
export const list = createSlice({
  name: 'lists',
  initialState: {
    categories: [],
    tax: [],
    indicator: [],
    countries: [],
    deliverableType:[],
    productType: [],
    mediaImages: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(allList.fulfilled, (state, action) => {
      console.log(' category actions: ', action.payload)
      state.categories = action.payload.categories
      state.countries = action.payload.countries
      state.indicator = action.payload.indicator
      state.deliverableType = action.payload.deliverableType
      state.productType = action.payload.productType
      state.mediaImages = action.payload.mediaImages
    })
  }
})

export default list.reducer
