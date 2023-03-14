// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { MapMarkerOutline, EmailOutline, CreditCardSettingsOutline } from 'mdi-material-ui'

// ** Demo Tabs Imports
import TabAddress from 'src/views/pages/account-settings/TabAddress'
import TabAccount from 'src/views/pages/account-settings/TabAccount'
import TabBilling from 'src/views/pages/account-settings/TabBilling'
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

const AccountSettings = () => {
  // ** State
  const [value, setValue] = useState('info')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='profile-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='info'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline sx={{ fontSize: '1.125rem' }} />
                <TabName>Basic Information</TabName>
              </Box>
            }
          />
          <Tab
            value='billing'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CreditCardSettingsOutline sx={{ fontSize: '1.125rem' }} />
                <TabName>Payment Setting</TabName>
              </Box>
            }
          />
          <Tab
            value='address'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MapMarkerOutline sx={{ fontSize: '1.125rem' }} />
                <TabName>Address</TabName>
              </Box>
            }
          />
          <Tab
            value='changeEmail'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailOutline sx={{ fontSize: '1.125rem' }} />
                <TabName>Change Your Email</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='info'>
          <TabAccount />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='billing'>
          <TabBilling />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='address'>
          <TabAddress />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='changeEmail'>
          <TabChangeEmail />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default AccountSettings
