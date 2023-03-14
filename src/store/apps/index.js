import { combineReducers } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
import dashboard from 'src/store/apps/dashboard'
import sellerProfile from 'src/store/apps/sellerProfile'
import products from 'src/store/apps/products'
import lists from 'src/store/apps/lists'

const allReducers = combineReducers({
  chat,
  email,
  invoice,
  calendar,
  permissions,
  dashboard,
  sellerProfile,
  products,
  lists
})

export default allReducers
