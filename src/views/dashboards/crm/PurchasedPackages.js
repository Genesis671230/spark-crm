// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { Divider } from '@mui/material'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'
import { PlusCircleOutline, ShieldCrownOutline, ShieldRemoveOutline } from 'mdi-material-ui'
import CustomAvatar from 'src/@core/components/mui/avatar'

const data = [
  {
    amount: 'Platinum',
    title: 'Current Package',
    imgAlt: 'Fashion',
    chipColor: 'primary',
    imgSrc: <ShieldCrownOutline />
  },
  {
    amount: '500 times',
    title: 'Product Upload Limit',
    imgAlt: 'Fashion',
    chipColor: 'secondary',
    imgSrc: <PlusCircleOutline />
  },
  {
    amount: '2022-03-02',
    title: 'Package Expires at',
    imgAlt: 'Fashion',
    chipColor: 'error',
    imgSrc: <ShieldRemoveOutline />
  }
]

const PurchasedPackages = () => {
  return (
    <Box>
      <CardHeader
        title='Purchased Package'
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options'>
            <DotsVertical />
          </IconButton>
        }
      />
      <Divider style={{ margin: '0px 20px ' }} />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pb: theme => `${theme.spacing(6.5)} !important`
        }}
      >
        {data.map((item, index) => {
          return (
            <Box
              key={item.title}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: index !== data.length - 1 ? 7.25 : undefined
              }}
            >
              {item.imgSrc && (
                <CustomAvatar
                  skin='light'
                  color={item.chipColor}
                  variant='rounded'
                  sx={{ mr: 3, width: 45, height: 45 }}
                >
                  {item.imgSrc}
                </CustomAvatar>
              )}
              <Box
                sx={{ ml: 3, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {item.title}
                  </Typography>
                  <Typography variant='caption'>{item.subtitle}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {item.amount}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        })}
        <Box sx={{ mt: 8 }}>
          <Button fullWidth variant='contained'>
            Upgrade Package
          </Button>
        </Box>
      </CardContent>
    </Box>
  )
}

export default PurchasedPackages
