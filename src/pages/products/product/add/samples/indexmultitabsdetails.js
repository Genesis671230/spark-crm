// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
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
import General from 'src/views/apps/products/product/add/tabs/General'
import PriceStock from 'src/views/apps/products/product/add/tabs/PriceStock'
import Variation from 'src/views/apps/products/product/add/tabs/AdditionalInfo'
import Description from 'src/views/apps/products/product/add/tabs/Description'
import SEOMetaTags from 'src/views/apps/products/product/add/tabs/SEOMetaTags'
import ImagesVideosFiles from 'src/views/apps/products/product/add/tabs/ImagesVideosFiles'

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
  // ** State
  const [value, setValue] = useState('general')
  const tabList = ['general', 'price_stock', 'variation', 'description', 'seo_tags', 'images']

  const handleChange = (event, newValue) => {
    console.log('Tab View =>', newValue)
    setValue(newValue)
  }

  console.log('list index ', tabList.indexOf(value))

  return (
    <>
      <Grid container spacing={6}>
        {/* xl={9} md={8} */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Add New Product' titleTypographyProps={{ variant: 'h6' }} />
            <Divider sx={{ m: 0 }} />
            <TabContext value={value}>
              <TabList
                variant='scrollable'
                onChange={handleChange}
                aria-label='add-product tabs'
                sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
              >
                <Tab
                  value='general'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {/* <AccountOutline sx={{ fontSize: '1.125rem' }} /> */}
                      {/* <img src='/images/flags/en.png' sx={{ fontSize: '1.125rem' }} /> */}
                      <TabName>General</TabName>
                    </Box>
                  }
                />
                <Tab
                  value='price_stock'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {/* <img src='/images/flags/sa.png' sx={{ fontSize: '1.125rem' }} /> */}
                      <TabName>Price | Stock</TabName>
                    </Box>
                  }
                />
                <Tab
                  value='variation'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {/* <img src='/images/flags/sa.png' sx={{ fontSize: '1.125rem' }} /> */}
                      <TabName>Variation</TabName>
                    </Box>
                  }
                />
                <Tab
                  value='description'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {/* <img src='/images/flags/sa.png' sx={{ fontSize: '1.125rem' }} /> */}
                      <TabName>Description</TabName>
                    </Box>
                  }
                />
                <Tab
                  value='seo_tags'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {/* <img src='/images/flags/sa.png' sx={{ fontSize: '1.125rem' }} /> */}
                      <TabName>SEO Meta Tags</TabName>
                    </Box>
                  }
                />
                <Tab
                  value='images'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {/* <img src='/images/flags/bd.png' sx={{ fontSize: '1.125rem' }} /> */}
                      <TabName>Images | Videos | files</TabName>
                    </Box>
                  }
                />
              </TabList>
              <TabPanel sx={{ p: 0 }} value='general'>
                <General setValue={setValue} />
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value='price_stock'>
                <PriceStock setValue={setValue} />
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value='variation'>
                <Variation setValue={setValue} />
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value='description'>
                <Description setValue={setValue} />
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value='seo_tags'>
                <SEOMetaTags setValue={setValue} />
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value='images'>
                <ImagesVideosFiles setValue={setValue} />
              </TabPanel>
            </TabContext>
          </Card>
        </Grid>
        {/* <Grid item xl={3} md={4} xs={12}>
          <AddActions />
        </Grid> */}
      </Grid>
    </>
  )
}

export default Add
