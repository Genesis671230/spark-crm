// ** React Imports
import {useState} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Badge from '@mui/material/Badge'
import {useTheme} from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

const Slides = ({data}) => {
  return (
    <>
      <Box className='keen-slider__slide'>
        <Typography variant='h6' sx={{color: 'common.white'}}>
          Orders Of This Month
        </Typography>
        <Box sx={{mb: 4, display: 'flex', alignItems: 'center'}}>
          <Typography variant='caption' sx={{mr: 1.5, color: 'common.white'}}>
            {/*Total $23.5k Earning*/}
          </Typography>
          <Typography variant='subtitle2' sx={{color: 'success.main'}}>
            {/*+62%*/}
          </Typography>
          {/*<ChevronUp fontSize='small' sx={{color: 'success.main'}}/>*/}
        </Box>
        <Grid container>
          <Grid item xs={12} sm={6} lg={8} sx={{order: [2, 1]}}>
            <Typography sx={{mb: 4.5, color: 'common.white'}}>{data.title}</Typography>
            <Grid container spacing={4}>
              {Object.keys(data.details).map((key, index) => {
                return (
                  <Grid item key={index} xs={4}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                      <CustomAvatar
                        color='primary'
                        variant='rounded'
                        sx={{
                          mr: 2,
                          width: 40,
                          height: 30,
                          fontSize: '0.875rem',
                          color: 'common.white',
                          backgroundColor: 'primary.dark'
                        }}
                      >
                        {data.details[key]}
                      </CustomAvatar>
                      <Typography variant='caption' sx={{color: 'common.white'}}>
                        {key}
                      </Typography>
                    </Box>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            lg={4}
            sx={{
              order: [1, 2],
              textAlign: 'center',
              '& img': {
                top: 0,
                right: 0,
                height: '200px !important',
                maxWidth: 'none !important',
                position: ['static', 'absolute']
              }
            }}
          >
            <img src={data.img} alt={data.title}/>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

const DashboardOrders = ({data}) => {

  let nw, re, od, d, r, c;
  if (data && data.length > 0) {
    nw = data[0].order_counter
    re = data[0].received_orders_counter
    od = data[0].delivered_orders_counter
    d = data[0].delivered_orders_counter
    r = data[0].delivered_orders_counter
    c = data[0].cancelled_orders_counter
  } else {
    nw = 0
    od = 0
    d = 0
    r = 0
    c = 0
  }

  const orderDatails =
    {
      title: 'Orders Detail',
      img: '/images/cards/apple-watch-green-lg.png',
      details: {
        'New Order': nw,
        'Received': re,
        'On Delivery': od,
        'Delivered': d,
        'Returned': r,
        'Cancelled': c
      }
    }

  return (
    <Card sx={{position: 'relative', backgroundColor: 'primary.main'}}>
      <CardContent>

        <Box className='swiper-dots' sx={{top: 7, right: 13, position: 'absolute'}}>
          <Badge
            key={''}
            variant='dot'
            component='div'
            sx={{
              mr: theme => `${theme.spacing(2.5)} !important`,
              '&.active': {
                '& .MuiBadge-dot': {
                  backgroundColor: theme => `${theme.palette.common.white} !important`
                }
              },
              '& .MuiBadge-dot': {
                height: '6px !important',
                width: '6px !important',
                minWidth: '6px !important'
              }
            }}
          >

          </Badge>
        </Box>
        <Box className='keen-slider'>
          <Slides data={orderDatails}/>
        </Box>
      </CardContent>
    </Card>
  )
}

export default DashboardOrders
