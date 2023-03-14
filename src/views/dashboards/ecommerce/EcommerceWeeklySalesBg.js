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

// ** Third Party Components
import clsx from 'clsx'
import {useKeenSlider} from 'keen-slider/react'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import {BasketPlusOutline, Cancel, CashRefund, TextBoxCheckOutline, TruckDeliveryOutline} from "mdi-material-ui";

const data = [
  {
    title: 'Fashion',
    img: '/images/cards/apple-watch-green-lg.png',
    details: {
      'T-shirts': '16',
      Shoes: '43',
      Watches: '29',
      SunGlasses: '7'
    }
  },
]


const EcommerceWeeklySalesBg = ({data}) => {

  let nw, od, d, r, c;
  {
    data?.length > 0 ? data[0].order_counter : '0.00'
  }
  if (data && data.length > 0) {
    nw = data[0].order_counter
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

  const orderData = [
    {
      name: 'New Orders',
      counter: nw,
      bgColor: '#FFF6E5',
      color: '#fdb528',
      icon: <BasketPlusOutline/>,
    },
    {
      name: 'On Delivery',
      bgColor: '#ecefff',
      color: '#656cff',
      counter: od,
      icon: <TruckDeliveryOutline/>
    },
    {
      name: 'Delivered',
      bgColor: '#e5f8fe',
      color: '#26c6f9',
      counter: d,
      icon: <TextBoxCheckOutline/>
    },
    {
      name: 'Returned',
      bgColor: '#edeff1',
      color: '#717c90',
      counter: r,
      icon: <CashRefund/>
    },
    {
      name: 'Cancelled',
      bgColor: '#ffe9e9',
      color: '#ff4d49',
      counter: c,
      icon: <Cancel/>
    }
  ]

  return (
    <Card sx={{position: 'relative', backgroundColor: 'white'}}>
      <CardContent>
        <Box>
          <Typography variant='h6' sx={{color: 'text.primary'}}>
            Orders Of This Month
          </Typography>
          <Box sx={{display: 'flex', justifyContent: 'space-between', my: 1}}>
            {orderData.map((item, index) => {
              return (
                <Box key={index}>
                  <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography sx={{my: 2, color: item.color}}> <Box
                      sx={{display: 'flex', alignItems: 'center'}}>
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 70,
                        height: 70,
                        background: item.bgColor,
                        borderRadius: 1
                      }}>
                        {item.icon}
                      </Box>
                    </Box>
                    </Typography>
                    <Typography>
                      {item.counter}
                    </Typography>
                    <Typography sx={{color: 'text.primary'}}>
                      {item.name}
                    </Typography>
                  </Box>
                </Box>
              )
            })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default EcommerceWeeklySalesBg
