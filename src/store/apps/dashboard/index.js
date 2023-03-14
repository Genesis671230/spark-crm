import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getDashboardStatistics, getSellerID } from 'src/configs/apiConfig'

// ** Fetch Invoices
export const fetchData = createAsyncThunk('appDashboard/fetchData', async () => {
  console.log('Fetch Dashboard')
  const response = await getDashboardStatistics()
  let { data } = response
  data = data.error ? [] : data
  
return data
})

export const appDashboardSlice = createSlice({
  name: 'appDashboard',
  initialState: {
    category_wise_product_count: {},
    counts: [],
    earnings: [],
    currency_symbol: ''
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      console.log('dashboard actions: ', action.payload)
      state.category_wise_product_count = action.payload.category_wise_product_count
      state.earnings = action.payload.earnings
      state.counts = action.payload.counts
      state.currency_symbol = action.payload.currency_symbol
    })
  }
})

export default appDashboardSlice.reducer
