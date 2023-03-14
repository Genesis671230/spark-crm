// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Divider } from '@mui/material'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

const data = [
  {
    amount: '8,450',
    title: 'Current Month',
    chipColor: 'success',
    chipLabel: '+42%'
  },

  {
    amount: '566',
    title: 'Last Month',
    chipColor: 'error',
    chipLabel: '+20%'
  }
]

const VarificationStatus = () => {
  return (
    <Box>
      <CardHeader
        sx={{ textAlign: 'center' }}
        title='Verification Status'
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options'>
            <DotsVertical />
          </IconButton>
        }
      />
      <Divider style={{ margin: '0px 20px ' }} />
      <CardContent sx={{ pb: theme => `${theme.spacing(6.5)} !important` }}>
        <Box sx={{ minHeight: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src='/images/cards/verified.png' alt='' />
        </Box>
      </CardContent>
    </Box>
  )
}

export default VarificationStatus
