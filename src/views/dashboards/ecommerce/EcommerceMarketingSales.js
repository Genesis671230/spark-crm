// ** React Imports
import {useState} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import {useTheme} from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Components
import clsx from 'clsx'
import {useKeenSlider} from 'keen-slider/react'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'


const Slides = ({data}) => {
  return (
    <>
      {data.map((slide, index) => {
        return (
          <Box key={index} className='keen-slider__slide'>
            <Box sx={{mb: 5, display: 'flex', alignItems: 'center'}}>
              <Box component='img' src={slide.img} alt={slide.title} sx={{mr: 5, width: 84, borderRadius: 1}}/>
              <Box sx={{width: '100%'}}>
                <Typography sx={{mb: 2.5, fontWeight: 600}}>{slide.title}</Typography>
                <Grid container spacing={2.5} sx={{mt:5}}>
                  {slide['details'].map((item, index) => (
                    <Grid item xs={6} key={index}>
                      <Box sx={{display: 'flex', alignItems: 'center', }}>
                        <CustomAvatar
                          skin='light'
                          color='secondary'
                          variant='rounded'
                          sx={{
                            mr: 1.5,
                            width: 36,
                            height: 24,
                            fontSize: '0.75rem',
                            borderRadius: '6px',
                            color: 'text.primary'
                          }}
                        >
                          {item.value}
                        </CustomAvatar>
                        <Typography variant='caption'>{item.name}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </Box>
        )
      })}
    </>
  )
}

const EcommerceMarketingSales = ({data}) => {


  const newData = [
    {
      title: 'Products Detail',
      img: '/images/cards/marketing-expense-logo.png',
      details: [
        {
          name: 'Low Products Count', value: data?.length > 0 ? data[0].count_products_low_status : '0'
        },
        {
          name: 'Sold Products Count', value: data?.length > 0 ? data[0].count_products_sold_out_status : '0'
        },

      ]
    },
  ]

  // ** States
  const [loaded, setLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  // ** Hook
  const theme = useTheme()

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    rtl: theme.direction === 'rtl',
    slides: {
      spacing: 16
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    }
  })

  return (
    <Card>
      <CardHeader
        title='Products Status'
        titleTypographyProps={{variant: 'h6'}}
        sx={{'& .swiper-dots': {mt: 0.75, mr: -1.75}}}
        subheader={
          <Box sx={{display: 'flex', alignItems: 'center'}}>
          </Box>
        }
        action={
          loaded &&
          instanceRef.current && (
            <Box className='swiper-dots'>
              {[...Array(instanceRef.current.track.details.slides.length).keys()].map(idx => {
                return (
                  <Badge
                    key={idx}
                    variant='dot'
                    component='div'
                    className={clsx({
                      active: currentSlide === idx
                    })}
                    onClick={() => {
                      instanceRef.current?.moveToIdx(idx)
                    }}
                    sx={{
                      mr: theme => `${theme.spacing(2.5)} !important`,
                      '& .MuiBadge-dot': {
                        height: '6px !important',
                        width: '6px !important',
                        minWidth: '6px !important'
                      }
                    }}
                  ></Badge>
                )
              })}
            </Box>
          )
        }
      />
      <CardContent sx={{mt:5}}>
        <Box ref={sliderRef} className='keen-slider'>
          <Slides data={newData}/>
        </Box>
      </CardContent>
    </Card>
  )
}

export default EcommerceMarketingSales
