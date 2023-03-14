import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'http://localhost:8000/housy/api/v2'

// const BASE_URL = 'http://dev.housy.ae/api/v2'

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    login: builder.mutation({
      query: params => {
        return { url: `/auth/login`, method: 'POST', body: params }
      },
      transformResponse: response => {
        console.log('transformResponse: ', response)
        
return response
      }
    }),

    signup: builder.mutation({
      query: params => {
        return { url: `/auth/signup`, method: 'POST', body: params }
      },
      transformResponse: response => {
        return response
      }
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useSignupMutation } = api
