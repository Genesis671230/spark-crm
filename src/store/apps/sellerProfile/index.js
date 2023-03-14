import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {getProfile} from 'src/configs/apiConfig'

// ** Axios Imports
import axios from 'axios'

// ** Fetch Seller Profile
export const fetchData = createAsyncThunk('sellerProfile/fetchData', async params => {
  console.log('token params: ', params)
  const response = await getProfile(params)
  const data = response
  console.log('seller profile: ', data)

  return data
})

export const storeUser = createAsyncThunk('seller/storeProfile', async (params, {dispatch}) => {
  console.log("Store User:", params)

  return params;
})

// ** Add User
export const addUser = createAsyncThunk('sellerProfile/add', async (data, {getState, dispatch}) => {
  const response = await axios.post('/apps/users/add-user', {
    data
  })
  dispatch(fetchData(getState().user.params))

  return response.data
})

// ** Delete User
export const deleteUser = createAsyncThunk('sellerProfile/delete', async (id, {getState, dispatch}) => {
  const response = await axios.delete('/apps/users/delete', {
    data: id
  })
  dispatch(fetchData(getState().user.params))

  return response.data
})

export const appUsersSlice = createSlice({
  name: 'sellerProfile',
  initialState: {
    data: [],
    user: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      console.log(' seller actions: ', action.payload)
      state.data = action.payload
    })

    builder.addCase(storeUser.fulfilled, (state, action) => {
      console.log(' Store user: ', action.payload)
      state.user = action.payload
    })
  }
})

export default appUsersSlice.reducer
