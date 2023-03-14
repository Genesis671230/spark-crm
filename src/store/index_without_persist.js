// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
import dashboard from 'src/store/apps/dashboard'
import sellerProfile from 'src/store/apps/sellerProfile'
import products from 'src/store/apps/products'


export const store = configureStore({
  reducer: {
    chat,
    email,
    invoice,
    calendar,
    permissions,
    dashboard,
    sellerProfile,
    products
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
