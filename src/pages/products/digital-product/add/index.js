// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { MapMarkerOutline, EmailOutline, CreditCardSettingsOutline } from 'mdi-material-ui'

// ** Demo Tabs Imports

import AddActions from 'src/views/apps/products/digital-product/add/AddActions'
import AddDigitalProduct from 'src/views/apps/products/digital-product/add/AddDigitalProduct'

import TabChangeEmail from 'src/views/pages/account-settings/TabChangeEmail'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  marginLeft: theme.spacing(2.5),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const Add = () => {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <AddDigitalProduct />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Add
