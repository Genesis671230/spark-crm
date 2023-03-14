// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import { buttonGroupClasses } from '@mui/material'

const CardSettingsButton = props => {
  // ** Props
  const { title, color, icon, bgColor, onClick } = props

  return (
    <Card sx={{ bgcolor: bgColor }}>
      <CardHeader
        title={
          <Typography sx={{ textAlign: 'center' }} variant='h6' color={color}>
            {title}
          </Typography>
        }
      />
      <CardContent
        sx={{ width: '100%', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}
      >
        <Box sx={{}}>{icon}</Box>
      </CardContent>
    </Card>
  )
}

export default CardSettingsButton

CardSettingsButton.defaultProps = {
  color: 'warning'
}
