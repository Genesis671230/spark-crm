// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Divider } from '@mui/material' //<Divider orientation='vertical' variant='middle' flexItem />

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

const CardStatsHorizontal = props => {
  // ** Props
  const { title, color, icon, stats, trend, chipText, trendNumber } = props
  const TrendIcon = trend === 'positive' ? ChevronUp : ChevronDown

  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant='h6' color={color}>
            {title}
          </Typography>
        }
      />
      <CardContent
        sx={{ width: '100%', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}
      >
        <Box sx={{}}>{icon}</Box>
        <Divider orientation='vertical' variant='middle' flexItem />
        <Box sx={{}}>
          <Typography variant='h6' sx={{ mb: 1 }}>
            {stats}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardStatsHorizontal

CardStatsHorizontal.defaultProps = {
  color: 'primary',
  trend: 'positive'
}
