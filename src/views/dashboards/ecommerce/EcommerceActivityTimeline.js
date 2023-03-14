// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline from '@mui/lab/Timeline'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { BasketPlusOutline, TruckDeliveryOutline, TextBoxCheckOutline, CashRefund, Cancel } from 'mdi-material-ui'

// Styled Timeline component
const Timeline = styled(MuiTimeline)({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

const EcommerceActivityTimeline = ({ data }) => {
  console.log('Orders: ', data)

  return (
    <Card>
      <CardHeader
        title='Order of this month'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options'>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.5)} !important` }}>
        <Timeline sx={{ my: 0, py: 0 }}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='warning' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ mt: 0, mb: theme => `${theme.spacing(3)} !important` }}>
              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography sx={{ mr: 2, fontWeight: 600 }}>New Orders</Typography>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  Wednesday
                </Typography>
              </Box>
              {/* <Typography variant='body2' sx={{ mb: 2 }}>
                Invoices have been paid to the company.
              </Typography> */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* <img width={24} height={24} alt='invoice.pdf' src='/images/icons/file-icons/pdf.png' /> */}
                <CustomAvatar skin='light' color='warning' variant='rounded' sx={{ mr: 3, width: 45, height: 45 }}>
                  <BasketPlusOutline />
                </CustomAvatar>
                <Typography variant='subtitle2' sx={{ ml: 2, fontWeight: 600 }}>
                  {data?.length > 0 ? data[0].order_counter : '0.00'}
                </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='primary' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ mt: 0, mb: theme => `${theme.spacing(3)} !important` }}>
              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography sx={{ mr: 2, fontWeight: 600 }}>On Delivery</Typography>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  April, 18
                </Typography>
              </Box>
              {/* <Typography variant='body2' sx={{ mb: 2 }}>
                Invoices have been paid to the company.
              </Typography> */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CustomAvatar skin='light' color='primary' variant='rounded' sx={{ mr: 3, width: 45, height: 45 }}>
                  <TruckDeliveryOutline />
                </CustomAvatar>
                <Typography variant='body2' sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  {data?.length > 0 ? data[0].received_orders_counter : '0.00'}
                </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem sx={{ minHeight: 0 }}>
            <TimelineSeparator>
              <TimelineDot color='info' />
              <TimelineConnector sx={{ mb: 3 }} />
            </TimelineSeparator>
            <TimelineContent sx={{ mt: 0, mb: theme => `${theme.spacing(0.5)} !important` }}>
              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography sx={{ mr: 2, fontWeight: 600 }}>Delivered</Typography>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  January, 10
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CustomAvatar skin='light' color='info' variant='rounded' sx={{ mr: 3, width: 45, height: 45 }}>
                  <TextBoxCheckOutline />
                </CustomAvatar>
                <Typography variant='body2' sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  {data?.length > 0 ? data[0].delivered_orders_counter : '0.00'}
                </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='secondary' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ mt: 0, mb: theme => `${theme.spacing(3)} !important` }}>
              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography sx={{ mr: 2, fontWeight: 600 }}>Returned</Typography>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  April, 18
                </Typography>
              </Box>
              {/* <Typography variant='body2' sx={{ mb: 2 }}>
                Invoices have been paid to the company.
              </Typography> */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CustomAvatar skin='light' color='secondary' variant='rounded' sx={{ mr: 3, width: 45, height: 45 }}>
                  <CashRefund />
                </CustomAvatar>
                <Typography variant='body2' sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  {data?.length > 0 ? data[0].returned_orders_counter : '0.00'}
                </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem sx={{ minHeight: 0 }}>
            <TimelineSeparator>
              <TimelineDot color='error' />
              <TimelineConnector sx={{ mb: 3 }} />
            </TimelineSeparator>
            <TimelineContent sx={{ mt: 0, mb: theme => `${theme.spacing(0.5)} !important` }}>
              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography sx={{ mr: 2, fontWeight: 600 }}>Cancelled</Typography>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  January, 10
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CustomAvatar skin='light' color='error' variant='rounded' sx={{ mr: 3, width: 45, height: 45 }}>
                  <Cancel />
                </CustomAvatar>
                <Typography variant='body2' sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  {data?.length > 0 ? data[0].cancelled_orders_counter : '0.00'}
                </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </CardContent>
    </Card>
  )
}

export default EcommerceActivityTimeline
