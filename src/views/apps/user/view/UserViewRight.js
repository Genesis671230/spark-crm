// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import LockOutline from 'mdi-material-ui/LockOutline'
import BellOutline from 'mdi-material-ui/BellOutline'
import LinkVariant from 'mdi-material-ui/LinkVariant'

// import AccountOutline from 'mdi-material-ui/AccountOutline'
import BookmarkOutline from 'mdi-material-ui/BookmarkOutline'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { MapMarkerOutline, EmailOutline, CreditCardSettingsOutline } from 'mdi-material-ui'

// ** Demo Components Imports
import UserViewBilling from 'src/views/apps/user/view/UserViewBilling'
import UserViewOverview from 'src/views/apps/user/view/UserViewOverview'
import UserViewSecurity from 'src/views/apps/user/view/UserViewSecurity'
import UserViewConnection from 'src/views/apps/user/view/UserViewConnection'
import UserViewNotification from 'src/views/apps/user/view/UserViewNotification'

// ** Demo Tabs Imports
import TabAddress from 'src/views/pages/account-settings/TabAddress'
import TabAccount from 'src/views/pages/account-settings/TabAccount'
import TabBilling from 'src/views/pages/account-settings/TabBilling'
import TabChangeEmail from 'src/views/pages/account-settings/TabChangeEmail'

// ** Styled Tab component
const Tab = styled(MuiTab)(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  }
}))

const UserViewRight = ({ data }) => {
  const { profile, shop } = data

  // ** State
  const [value, setValue] = useState('info')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <TabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleChange}
        aria-label='forced scroll tabs example'
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
      >
        <Tab value='info' label='Basic Information' icon={<AccountOutline sx={{ fontSize: '18px' }} />} />
        <Tab value='billing' label='Payment Setting' icon={<CreditCardSettingsOutline sx={{ fontSize: '18px' }} />} />
        <Tab value='address' label='Address' icon={<MapMarkerOutline sx={{ fontSize: '18px' }} />} />
        <Tab value='changeEmail' label='Change Your Email' icon={<EmailOutline sx={{ fontSize: '18px' }} />} />
      </TabList>

      <Box sx={{ mt: 3 }}>
        <TabPanel sx={{ p: 0 }} value='info'>
          <TabAccount data={profile} />
          {/* <UserViewOverview invoiceData={invoiceData} /> */}
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='billing'>
          <TabBilling shop={shop} />
          <UserViewBilling />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='address'>
          <TabAddress data={data} />
          {/* <UserViewBilling /> */}
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='changeEmail'>
          <TabChangeEmail data={profile} />
        </TabPanel>
      </Box>
    </TabContext>
  )
}

export default UserViewRight
