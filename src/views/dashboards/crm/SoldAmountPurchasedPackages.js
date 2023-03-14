// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'

// ** Util Import
import SoldAmount from 'src/views/dashboards/crm/SoldAmount'
import PurchasedPackages from 'src/views/dashboards/crm/PurchasedPackages'
import VerificationStatus from 'src/views/dashboards/crm/VerificationStatus'

// Styled Grid component
const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('md')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const SoldAmountPurchasedPackages = () => {
  // ** Hook
  const theme = useTheme()

  return (
    <Card>
      <Grid container spacing={6}>
        <StyledGrid item xs={12} md={4}>
          <SoldAmount />
        </StyledGrid>
        <StyledGrid item xs={12} md={4}>
          <PurchasedPackages />
        </StyledGrid>
        <StyledGrid item xs={12} md={4}>
          <VerificationStatus />
        </StyledGrid>
      </Grid>
    </Card>
  )
}

export default SoldAmountPurchasedPackages
