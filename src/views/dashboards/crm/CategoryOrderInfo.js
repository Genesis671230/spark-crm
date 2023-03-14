// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'

// ** Icons Imports
import Creation from 'mdi-material-ui/Creation'
import Cellphone from 'mdi-material-ui/Cellphone'
import PencilRuler from 'mdi-material-ui/PencilRuler'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import { BasketPlusOutline, TruckDeliveryOutline, TextBoxCheckOutline, CloseCircleOutline } from 'mdi-material-ui'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import CategoryWiseProduct from 'src/views/dashboards/crm/CategoryWiseProduct'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// Styled Grid component
const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))
const labels = ['Development Apps', 'UI Design', 'IOS Application', 'Web App Wireframing', 'Prototyping']

const series = [
  {
    data: [
      {
        x: 'Catherine',
        y: [
          new Date(`${new Date().getFullYear()}-01-01`).getTime(),
          new Date(`${new Date().getFullYear()}-04-02`).getTime()
        ]
      },
      {
        x: 'Janelle',
        y: [
          new Date(`${new Date().getFullYear()}-02-18`).getTime(),
          new Date(`${new Date().getFullYear()}-05-30`).getTime()
        ]
      },
      {
        x: 'Wellington',
        y: [
          new Date(`${new Date().getFullYear()}-02-07`).getTime(),
          new Date(`${new Date().getFullYear()}-04-31`).getTime()
        ]
      },
      {
        x: 'Blake',
        y: [
          new Date(`${new Date().getFullYear()}-01-14`).getTime(),
          new Date(`${new Date().getFullYear()}-06-30`).getTime()
        ]
      },
      {
        x: 'Quinn',
        y: [
          new Date(`${new Date().getFullYear()}-04-01`).getTime(),
          new Date(`${new Date().getFullYear()}-07-31`).getTime()
        ]
      }
    ]
  }
]

const CategoryOrderInfo = () => {
  // ** Hook
  const theme = useTheme()

  return (
    <Card>
      <Grid container>
        <StyledGrid item xs={12} sm={6}>
          <CategoryWiseProduct />
        </StyledGrid>
        <Grid item xs={12} sm={6}>
          <CardHeader
            title='Orders'
            subheader='This Month'
            subheaderTypographyProps={{ sx: { lineHeight: 1.429 } }}
            titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }}
            action={
              <IconButton size='small' aria-label='settings' className='card-more-options'>
                <DotsVertical />
              </IconButton>
            }
          />
          <CardContent>
            <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3, width: 45, height: 45 }}>
                <BasketPlusOutline />
              </CustomAvatar>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                  New Order
                </Typography>
                <Typography variant='caption'>105</Typography>
              </Box>
            </Box>
            <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' color='secondary' variant='rounded' sx={{ mr: 3, width: 45, height: 45 }}>
                <TruckDeliveryOutline />
              </CustomAvatar>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                  On Delivery
                </Typography>
                <Typography variant='caption'>50</Typography>
              </Box>
            </Box>
            <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' color='success' variant='rounded' sx={{ mr: 3, width: 45, height: 45 }}>
                <TextBoxCheckOutline />
              </CustomAvatar>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                  Delivered
                </Typography>
                <Typography variant='caption'>506</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' color='error' variant='rounded' sx={{ mr: 3, width: 45, height: 45 }}>
                <CloseCircleOutline />
              </CustomAvatar>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                  Cancelled
                </Typography>
                <Typography variant='caption'>0</Typography>
              </Box>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default CategoryOrderInfo
