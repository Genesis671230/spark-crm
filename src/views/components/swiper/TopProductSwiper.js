import Box from '@mui/material/Box'
import CardAppleWatch from 'src/views/ui/cards/basic/CardAppleWatch'

// ** Third Party Components
import { useKeenSlider } from 'keen-slider/react'

const TopProductSwiper = ({ direction, data }) => {
  // ** Hook
  const [ref] = useKeenSlider({
    loop: true,
    mode: 'free',
    rtl: direction === 'ltr',
    slides: {
      perView: 4,
      spacing: 16
    }
  })
  
return (
    <Box ref={ref} className='keen-slider'>
      {data && data !== 'Error' && data.length > 0 ? (
        data.map(product => (
          <Box className='keen-slider__slide'>
            <CardAppleWatch product={product} />
          </Box>
        ))
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <Box>Products Not Found</Box>
        </Box>
      )}
    </Box>
  )
}

export default TopProductSwiper
