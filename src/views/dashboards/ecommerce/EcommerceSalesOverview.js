import {useState, useEffect} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Custom Components Imports

import CircularProgress from "@mui/material/CircularProgress";
import CellphoneLink from "mdi-material-ui/CellphoneLink";
import {ShoppingOutline} from "mdi-material-ui";

const renderStats = (statData) => {
  return statData.map((item, index) => (
    <Grid item xs={12} sm={4} key={index}>
      <Box sx={{my: 1.375, display: 'flex', alignItems: 'center'}}>
        <Box sx={{mr: 6.5, display: 'flex', position: 'relative'}}>
          <CircularProgress
            size={60}
            value={100}
            thickness={5}
            variant='determinate'
            sx={{
              position: 'absolute',
              '& .MuiCircularProgress-circle': {strokeWidth: 4},
              color: theme =>
                theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.customColors.bodyBg
            }}
          />
          <CircularProgress
            size={60}
            value={item.counter}
            thickness={5}
            color={item.color}
            variant='determinate'
            sx={{'& .MuiCircularProgress-circle': {strokeWidth: 4, strokeLinecap: 'round'}}}
          />
          <Box sx={{mt: -3, ml: -2.5, top: '50%', left: '50%', display: 'flex', position: 'absolute'}}>
            {item.icon}
          </Box>
        </Box>
        <div>
          <Box sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
            <Typography variant='h6' sx={{mr: 1.75}}>
              {item.counter}
            </Typography>
          </Box>
          <Typography variant='body2'>{item.name}</Typography>
        </div>
      </Box>
    </Grid>
  ))
}


const EcommerceSalesOverview = ({earnings, counts}) => {
  console.log("Counts:", counts)
  let customer, product, order;
  if (counts && counts.length > 0) {
    customer = counts[0].user_counter
    product = counts[0].product_counter
    order = counts[0].order_counter
  } else {
    customer = 0
    product = 0
    order = 0
  }

  let statData = [
    {
      name: 'Total Customers',
      counter: customer,
      color: 'primary',
      icon: <AccountOutline fontSize='small' sx={{color: 'primary.main'}}/>
    },
    {
      name: 'Total Products',
      counter: product,
      color: 'warning',
      icon: <CellphoneLink fontSize='small' sx={{color: '#fdb528'}}/>
    },
    {
      name: 'Total Orders',
      counter: order,
      color: 'info',
      icon: <ShoppingOutline fontSize='small' sx={{color: '#26c6f9'}}/>
    }
  ]


  return (
    <Card>
      <CardHeader
        sx={{pb: 3.25}}
        title='Sales Overview'
        titleTypographyProps={{variant: 'h6'}}
        action={
          <IconButton aria-label='settings' className='card-more-options'>
            <DotsVertical/>
          </IconButton>
        }
        subheader={
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Typography variant='caption' sx={{mr: 1.5}}>
              Total ${earnings && earnings.length > 0 ? earnings[0].overall_sale : '0.00'} Sales
            </Typography>
            <ChevronUp fontSize='small' sx={{color: 'success.main'}}/>
          </Box>
        }
      />
      <CardContent>
        <Grid container spacing={6}>
          {renderStats(statData)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default EcommerceSalesOverview
