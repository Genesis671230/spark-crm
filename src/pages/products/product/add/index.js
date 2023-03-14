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
import General from 'src/views/apps/products/product/add/tabs/General'
import PriceStock from 'src/views/apps/products/product/add/tabs/PriceStock'
import AdditionalInfo from 'src/views/apps/products/product/add/tabs/AdditionalInfo'
import Description from 'src/views/apps/products/product/add/tabs/Description'
import SEOMetaTags from 'src/views/apps/products/product/add/tabs/SEOMetaTags'
import ImagesVideosFiles from 'src/views/apps/products/product/add/tabs/ImagesVideosFiles'

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
  const [formData, setFormData] = useState({
    pro_input_name: '',
    short_description: '',
    tags: [],
    pro_input_tax: '',
    indicator: '',
    made_in: '',
    total_allowed_quantity: '',
    minimum_order_quantity: '',
    quantity_step_size: '',
    warranty_period: '',
    guarantee_period: '',
    deliverable_type: '',
    deliverable_zipcodes: '',
    is_prices_inclusive_tax: '',
    cod_allowed: '',
    is_returnable: '',
    is_cancelable: '',
    cancelable_till: '',
    pro_input_image: '',
    other_images: [],
    video_type: '',
    video: '',
    pro_input_video: '',
    pro_input_description: '',
    product_type: '',
    variant_stock_level_type: '',
    variants_ids: [],
    variant_price: '',
    variant_special_price: '',
    variant_images: [],
    sku_variant_type: '',
    total_stock_variant_type: '',
    variant_status: '',
    variant_sku: '',
    variant_total_stock: '',
    variant_level_stock_status: '',
    simple_product_stock_status: '',
    simple_price: '',
    simple_special_price: '',
    product_sku: '',
    product_total_stock: '',
    variant_stock_status: '',
  })
  const [value, setValue] = useState(0)
  const tabList = ['general', 'additional_info', 'images']


  const handleChange = (event, newValue) => {
    setValue(newValue)
    console.log('Tab View =>', newValue)
  }

  return (
    <>
      <Grid container spacing={6}>
        {/* xl={9} md={8} */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Add New Product' titleTypographyProps={{variant: 'h6'}}/>
            <Divider sx={{m: 0}}/>
            <TabContext value={value}>
              <TabList
                variant='scrollable'
                onChange={handleChange}
                aria-label='add-product tabs'
                sx={{borderBottom: theme => `1px solid ${theme.palette.divider}`}}
              >
                <Tab
                  value={0}
                  disabled={true}
                  label={
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                      {/* <AccountOutline sx={{ fontSize: '1.125rem' }} /> */}
                      {/* <img src='/images/flags/en.png' sx={{ fontSize: '1.125rem' }} /> */}
                      <TabName sx={value === 0 ? {fontSize: 'h6', color: '#656CFF'} : ' '}>General Detail</TabName>
                    </Box>
                  }
                />
                <Tab
                  value={1}
                  disabled={true}
                  label={
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                      {/* <img src='/images/flags/sa.png' sx={{ fontSize: '1.125rem' }} /> */}
                      <TabName sx={value === 1 ? {fontSize: 'h6', color: '#656CFF'} : ' '}>Additional Info</TabName>
                    </Box>
                  }
                />
                <Tab
                  value={2}
                  disabled={true}
                  label={
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                      {/* <img src='/images/flags/sa.png' sx={{ fontSize: '1.125rem' }} /> */}
                      <TabName sx={value === 2 ? {fontSize: 'h6', color: '#656CFF'} : ' '}>Images | Videos |
                        files</TabName>
                    </Box>
                  }
                />
              </TabList>
              <TabPanel sx={{p: 0, mt: 4}} value={0}>
                <General setValue={setValue} value={value} setFormData={setFormData} formData={formData}/>
              </TabPanel>
              <TabPanel sx={{p: 0, mt: 4}} value={1}>
                <AdditionalInfo setValue={setValue} value={value} setFormData={setFormData} formData={formData}/>
              </TabPanel>
              <TabPanel sx={{p: 0, mt: 4}} value={2}>
                <ImagesVideosFiles setValue={setValue} value={value} setFormData={setFormData} formData={formData} />
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
