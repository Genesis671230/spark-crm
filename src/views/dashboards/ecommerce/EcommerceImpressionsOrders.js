// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import Cash100 from 'mdi-material-ui/Cash100'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import ShoppingOutline from 'mdi-material-ui/ShoppingOutline'

const EcommerceImpressionsOrders = ({data}) => {
  console.log(data);

  return (
    <Card>
      <CardContent sx={{py: theme => `${theme.spacing(6.625)} !important`}}>
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
              value={data&&data.cash_received}
              thickness={5}
              color='primary'
              variant='determinate'
              sx={{'& .MuiCircularProgress-circle': {strokeWidth: 4, strokeLinecap: 'round'}}}
            />
            <Box sx={{mt: -3, ml: -2.5, top: '50%', left: '50%', display: 'flex', position: 'absolute'}}>
              <Cash100 fontSize='small' sx={{color: 'primary.main'}}/>
            </Box>
          </Box>
          <div>
            <Box sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
              <Typography variant='h6' sx={{mr: 1.75}}>
                {data&&data.cash_received}
              </Typography>
              {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant='subtitle2' sx={{ color: 'error.main' }}>
                  -24%
                </Typography>
                <ChevronDown sx={{ color: 'error.main', fontSize: '1.25rem' }} />
              </Box> */}
            </Box>
            <Typography variant='body2'>Cash Received</Typography>
            {/*<Typography variant='body2'>{data&&data.cash_received}</Typography>*/}
          </div>
        </Box>
      </CardContent>
      <Divider sx={{my: 0}}/>
      <CardContent sx={{py: theme => `${theme.spacing(6.625)} !important`}}>
        <Box sx={{my: 1.375, display: 'flex', alignItems: 'center'}}>
          <Box sx={{mr: 6.5, position: 'relative'}}>
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
              thickness={5}
              value={data&& data.commission}
              color='warning'
              variant='determinate'
              sx={{'& .MuiCircularProgress-circle': {strokeWidth: 4, strokeLinecap: 'round'}}}
            />
            <Box sx={{mt: -3, ml: -2.5, position: 'absolute', top: '50%', left: '50%'}}>
              <ShoppingOutline fontSize='small' sx={{color: 'warning.main'}}/>
            </Box>
          </Box>
          <div>
            <Box sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
              <Typography variant='h6' sx={{mr: 1.75}}>
                {data&& data.commission}
              </Typography>
            </Box>
            <Typography variant='body2'>Commission</Typography>
            {/*<Typography variant='body2'>{data&& data.commission}%</Typography>*/}
          </div>
        </Box>
      </CardContent>
    </Card>
  )
}

export default EcommerceImpressionsOrders
