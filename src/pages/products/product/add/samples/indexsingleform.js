// ** React Imports
import {useState} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'

import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import {styled} from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import {MapMarkerOutline, EmailOutline, CreditCardSettingsOutline} from 'mdi-material-ui'

// ** Demo Tabs Imports
import TabAddress from 'src/views/pages/account-settings/TabAddress'
import TabAccount from 'src/views/pages/account-settings/TabAccount'
import TabBilling from 'src/views/pages/account-settings/TabBilling'
import AddActions from 'src/views/apps/products/product/add/samples/AddActions'
import AddNewProduct from 'src/views/apps/products/product/add/samples/AddNewProduct'

import TabChangeEmail from 'src/views/pages/account-settings/TabChangeEmail'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Tab = styled(MuiTab)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({theme}) => ({
  lineHeight: 1.71,
  marginLeft: theme.spacing(2.5),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const Add = () => {
  // ** State
  const [value, setValue] = useState('english')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <Card>
            <CardHeader title='Add New Product' titleTypographyProps={{variant: 'h6'}}/>
            <Divider sx={{m: 0}}/>
            <TabContext value={value}>
              <TabList
                onChange={handleChange}
                aria-label='add-product tabs'
                sx={{borderBottom: theme => `1px solid ${theme.palette.divider}`}}
              >
                <Tab
                  value='english'
                  label={
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                      {/* <AccountOutline sx={{ fontSize: '1.125rem' }} /> */}
                      <img src='/images/flags/en.png' sx={{fontSize: '1.125rem'}}/>
                      <TabName>English</TabName>
                    </Box>
                  }
                />
                <Tab
                  value='bangla'
                  label={
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                      <img src='/images/flags/bd.png' sx={{fontSize: '1.125rem'}}/>
                      <TabName>Bangla</TabName>
                    </Box>
                  }
                />
                <Tab
                  value='arabic'
                  label={
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                      <img src='/images/flags/sa.png' sx={{fontSize: '1.125rem'}}/>
                      <TabName>Arabic</TabName>
                    </Box>
                  }
                />
              </TabList>

              <TabPanel sx={{p: 0}} value='english'>
                <AddNewProduct/>
              </TabPanel>
              <TabPanel sx={{p: 0}} value='bangla'></TabPanel>
              <TabPanel sx={{p: 0}} value='arabic'></TabPanel>
            </TabContext>
          </Card>
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <AddActions/>
        </Grid>
      </Grid>
    </>
  )
}

export default Add
