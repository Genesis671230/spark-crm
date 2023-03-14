// ** React Imports
import {createContext, useEffect, useState} from 'react'

// ** Next Import
import {useRouter} from 'next/router'

import {signup, login, logout} from 'src/configs/apiConfig'

// ** Config
import authConfig from 'src/configs/auth'
import {useDispatch} from 'react-redux'
import {storeUser} from 'src/store/apps/sellerProfile'

// // ** Store & Actions Imports
// import { useDispatch } from 'react-redux'
// import { fetchData } from 'src/store/apps/dashboard'
// import { getDashboard } from 'src/configs/apiConfig'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  register: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({children}) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)
  const [isInitialized, setIsInitialized] = useState(defaultProvider.isInitialized)

  const dispatch = useDispatch()

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = () => {
      setIsInitialized(true)
      const storedToken = localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)
        const userData = localStorage.getItem('userData')
        if (userData) {
          setLoading(false)
          setUser(JSON.parse(userData))
        } else {
          console.log('Remove Stroage Data')
          localStorage.removeItem('userData')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('accessToken')
          setUser(null)
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }
    initAuth()
  }, [])

  const handleLogin = async ({mobile, password}, errorCallback) => {
    try {
      let formData = new FormData()
      formData.append('mobile', mobile)
      formData.append('password', password)

      // const formdata = JSON.stringify(userData)
      console.log('loginForm data: ', formData)
      const response = await login(formData)

      console.log('Login response: ', response)
      if (response?.status === 200) {
        let {data} = response.data
        let user = data && data[0]

        // const { user, access_token } = response.data
        localStorage.setItem(authConfig.storageTokenKeyName, '184|0Oqf0GhkGu1CBqDM9RbLCpBdBXhryBfpUlnGPpFo')
        const returnUrl = router.query.returnUrl
        user.role = 'admin'
        setUser(user)
        console.log('user', user)
        dispatch(storeUser(user))
        localStorage.setItem('userData', JSON.stringify(user))
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL)
      } else if (!response.status) {
        console.log('Error', response.data)
        if (errorCallback) errorCallback(response?.data)
      }
    } catch (error) {
      console.log('catch error: ', error)
      if (errorCallback) return errorCallback(error)
    }
  }

  const handleLogout = async token => {
    console.log('logout token: ', token)

    const res = await logout(token)
    console.log('logout response: ', res)

    setUser(null)
    setIsInitialized(false)
    localStorage.removeItem('userData')
    localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const handleRegister = async (params, errorCallback) => {
    try {
      console.log('form data: ', params)
      const formdata = JSON.stringify(params)
      const {data} = await signup(formdata)
      if (data?.result) {
        console.log('result true: ', data)
        handleLogin(params)
      } else {
        const {message} = data

        return errorCallback(message)
      }
    } catch (error) {
      return errorCallback ? errorCallback(error) : null
    }
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export {AuthContext, AuthProvider}


