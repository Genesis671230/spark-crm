// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Divider } from '@mui/material'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

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

const SoldAmount = () => {
  return (
    <Box>
      <CardHeader
        title='Sold Amount'
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options'>
            <DotsVertical />
          </IconButton>
        }
      />
      <Divider style={{ margin: '0px 20px ' }} />
      <CardContent sx={{ pb: theme => `${theme.spacing(6.5)} !important` }}>
        {data.map((item, index) => {
          return (
            <Box
              sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly'
              }}
            >
              <Box sx={{ mb: 1.25, display: 'flex', alignItems: 'center' }}>
                <Typography variant='h3' sx={{ mr: 3.5 }}>
                  {item.amount}
                </Typography>
                <CustomChip
                  skin='light'
                  size='small'
                  label={item.chipLabel}
                  color={item.chipColor}
                  sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500 }}
                />
              </Box>
              <Typography variant='body1'>{item.title}</Typography>
            </Box>
          )
        })}
      </CardContent>
    </Box>
  )
}

export default SoldAmount
