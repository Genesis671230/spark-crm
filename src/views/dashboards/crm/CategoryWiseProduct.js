// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Divider } from '@mui/material'

import DotsVertical from 'mdi-material-ui/DotsVertical'

const data = [
  {
    amount: '12,348',
    title: 'Man Clothing & Fashion',
    imgAlt: 'Fashion',
    chipColor: 'success',
    subtitle: 'Shopping',
    imgSrc: '/images/cards/fashion.png'
  },
  {
    amount: '8,450',
    title: 'Computer & Accessories',
    imgAlt: 'Computer',
    chipColor: 'success',
    subtitle: 'Technology',
    imgSrc: '/images/cards/computer.png'
  },
  {
    amount: '350',
    title: 'Sports & Outdoor',
    imgAlt: 'Sport',
    chipColor: 'error',
    subtitle: 'Sport',
    imgSrc: '/images/cards/sport.png'
  },
  {
    amount: '25,566',
    chipText: '+45%',
    title: 'Softwares',
    imgAlt: 'instagram',
    chipColor: 'success',
    subtitle: 'Software',
    imgSrc: '/images/cards/software.png'
  }
]

const CategoryWiseProduct = () => {
  return (
    <Box>
      <CardHeader
        title='Category Wise Product Count'
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
              key={item.title}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: index !== data.length - 1 ? 7.25 : undefined
              }}
            >
              <img width={34} height={34} alt={item.imgAlt} src={item.imgSrc} />
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
      </CardContent>
    </Box>
  )
}

export default CategoryWiseProduct
