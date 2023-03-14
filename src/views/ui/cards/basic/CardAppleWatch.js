// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const CardAppleWatch = ({ product }) => {
  console.log('Product: ', product)
  
return (
    <Card>
      <CardMedia sx={{ height: 160 }} image={product.thumbnail_img} />
      <CardContent sx={{ p: theme => `${theme.spacing(4, 5)} !important` }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          {product.name}
        </Typography>
        <Typography sx={{ mb: 2 }}>{product.price}</Typography>
        <Typography variant='body2'>Current Stock {product.current_stock}</Typography>
      </CardContent>
    </Card>
  )
}

export default CardAppleWatch
