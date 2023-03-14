// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import CardStatisticsCharacter from 'src/@core/components/card-statistics/card-stats-with-image'

import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import EcommerceTotalVisits from 'src/views/dashboards/ecommerce/EcommerceTotalVisits'
import EcommerceLiveVisitors from 'src/views/dashboards/ecommerce/EcommerceLiveVisitors'
import EcommerceSalesOverview from 'src/views/dashboards/ecommerce/EcommerceSalesOverview'
import DashboardOrders from 'src/views/dashboards/ecommerce/DashboardOrders'
import EcommerceSalesThisMonth from 'src/views/dashboards/ecommerce/EcommerceSalesThisMonth'
import EcommerceMarketingSales from 'src/views/dashboards/ecommerce/EcommerceMarketingSales'
import EcommerceActivityTimeline from 'src/views/dashboards/ecommerce/EcommerceActivityTimeline'
import EcommerceImpressionsOrders from 'src/views/dashboards/ecommerce/EcommerceImpressionsOrders'
import EcommerceSalesOverviewWithTabs from 'src/views/dashboards/ecommerce/EcommerceSalesOverviewWithTabs'
import {useEffect} from 'react'


// ** Store & Actions Imports
import {useDispatch, useSelector} from 'react-redux'
import {fetchData} from 'src/store/apps/dashboard'

const EcommerceDashboard = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.dashboard)
  const user = useSelector(state => state.sellerProfile.user)
  console.log("Store Dashboard ", store, user, "this is cash")
  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12} md={9}>
          <EcommerceSalesOverview earnings={store.earnings} counts={store.counts}/>
        </Grid>
        <Grid item xs={12} md={3}>
          <CardStatisticsCharacter
            data={{
              stats1: user && (user.rating),
              title1: 'Ratings',
              chipColor: 'primary',
              title2: 'No Of Rating',// trendNumber: '+15.6%',
              status2: user && (user.no_of_ratings),
              src: '/images/cards/card-stats-img-1.png'
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <DashboardOrders data={store.counts}/>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <EcommerceTotalVisits/>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <EcommerceSalesThisMonth data={store.earnings}/>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <EcommerceImpressionsOrders data={user && user}/>
        </Grid>
        <Grid item xs={12} md={5}>
          <EcommerceMarketingSales data={store.counts}/>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <EcommerceSalesOverviewWithTabs data={store.category_wise_product_count}/>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default EcommerceDashboard
