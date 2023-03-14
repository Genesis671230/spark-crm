import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import {
  getProductsList,
  add_Product,
  deleteProductByID
} from 'src/configs/apiConfig'

// ** Fetch Product List
export const fetchData = createAsyncThunk('products/fetchData', async params => {
  // console.log('token params: ', params)
  const response = await getProductsList(params)
  const {data} = response
  console.log('All Products: ', data)

  return data
})

export const setProductObj = createAsyncThunk('products/setProductObj', async (params, {dispatch, getState}) => {
const previous = getState();
console.log("Previous Object: ", previous)

})

// ** Add Product
export const addProduct = createAsyncThunk('products/add', async (params, {getState, dispatch}) => {
console.log("Add Product redux thunk: ", params)
  const response = await add_Product(params)
  console.log('add product response: ', response)

  return response
})

// ** Duplicate Product
export const duplicateProduct = createAsyncThunk('products/duplicate', async ({id, token}, {dispatch}) => {
  const response = await duplicate_Product({id, token})
  dispatch(fetchData({token}))

  return response.data
})

// ** Remaining Uploads
export const remainingUploads = createAsyncThunk('products/remainingUploads', async ({id, token}) => {
  const response = await remaining_Uploads({id, token})

  return response.data
})

// ** Product Reviews
export const productReviews = createAsyncThunk('products/productReviews', async ({id, token}) => {
  const response = await product_Reviews({id, token})

  return response.data
})

// ** Change Status
export const changeSatus = createAsyncThunk('products/changeStatus', async ({body, token}) => {
  const response = await change_Status({body, token})

  return response.data
})

// ** Change Featured
export const changeFeatured = createAsyncThunk('products/ChangeFeatured', async ({body, token}) => {
  const response = await change_Featured({body, token})

  return response
})

// ** Delete Product
export const deleteProduct = createAsyncThunk('products/delete', async ({id, token}, {dispatch}) => {
  console.log('delete product id: ', id)
  const response = await deleteProductByID({id, token})
  dispatch(fetchData({token}))

  return response.data
})

// Reducer to Get update data from action and store it in state
export const product = createSlice({
  name: 'products',
  initialState: {
    list: [],
    setProductObj: {},
    filters: [],
    offset: '',
    total: ''
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      console.log(' product actions: ', action.payload)
      ;(state.list = action.payload.data),
        (state.filters = action.payload.filters),
        (state.offset = action.payload.offset),
        (state.total = action.payload.total)
    })

    builder.addCase(setProductObj.fulfilled, (state, action) => {
      console.log('Set Product Obj: ', action)
      state.setProductObj = action.payload
    })

    // builder.addCase(remainingUploads.fulfilled, (state, action) => {
    //   console.log('remaining Uploads action:  ', action)
    //   state.remaining = action.payload
    // })
    //
    // builder.addCase(productReviews.fulfilled, (state, action) => {
    //   console.log('Product reviews action: ', action)
    //   state.reviews = action.payload
    // })


  }
})

export default product.reducer
