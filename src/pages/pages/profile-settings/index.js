// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Third Party Components
import axios from 'axios'
import { useAuth } from 'src/hooks/useAuth'

// ** Demo Components Imports
import UserViewLeft from 'src/views/apps/user/view/UserViewLeft'
import UserViewRight from 'src/views/apps/user/view/UserViewRight'

// ** Config
import authConfig from 'src/configs/auth'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from 'src/store/apps/sellerProfile'

const UserView = () => {
  const token = localStorage.getItem(authConfig.storageTokenKeyName)
  const dispatch = useDispatch()
  const store = useSelector(state => state.sellerProfile)
  console.log('store: ', store)

  useEffect(() => {
    dispatch(fetchData({ token }))
  }, [dispatch])

  // ** State
  const [error, setError] = useState(false)

  if (store?.data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
          <UserViewLeft data={store?.data} />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <UserViewRight data={store?.data} />
        </Grid>
      </Grid>
    )
  } else if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            User with the id: {id} does not exist. Please check the list of users:{' '}
            <Link href='/apps/user/list'>User List</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default UserView
