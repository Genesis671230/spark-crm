// ** MUI Imports
import Grid from '@mui/material/Grid'

// import CardSnippet '@mui/material/CardSnippet'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import CartPlus from 'mdi-material-ui/CartPlus'
import { StarOutline, ClipboardListOutline, Finance } from 'mdi-material-ui'
import NextLink from 'next/link'
import { Link as MUILink } from '@mui/material'

// ** Custom Component Import
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'
import CardSettingsButton from 'src/@core/components/card-statistics/card-settings-button'

// ** Styled Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import TopProductSwiper from 'src/views/components/swiper/TopProductSwiper'

// ** Demo Components Imports
import SalesStatics from 'src/views/dashboards/crm/SalesStatics'
import CategoryOrderInfo from 'src/views/dashboards/crm/CategoryOrderInfo'
import SoldAmountPurchasedPackages from 'src/views/dashboards/crm/SoldAmountPurchasedPackages'

const CrmDashboard = () => {
  return (
    <>
      <ApexChartWrapper>
        <Grid container spacing={6} className='match-height'>
          {/* First Row */}
          <Grid item xs={12} sm={6} md={3}>
            <CardStatisticsHorizontal
              stats='155k'
              color='success'
              trendNumber='+22%'
              icon={<CartPlus style={{ fontSize: '50px' }} />}
              title='Products'

              // chipText='Last 4 Month'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardStatisticsHorizontal
              stats='5.0'
              color='success'
              trendNumber='+38%'
              title='Rating'
              icon={<StarOutline style={{ fontSize: '50px' }} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardStatisticsHorizontal
              stats='105'
              color='success'
              trendNumber='+38%'
              title='Total Orders'
              icon={<ClipboardListOutline style={{ fontSize: '50px' }} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardStatisticsHorizontal
              stats='$5908.4'
              color='success'
              trendNumber='+38%'
              title='Total Sales'
              icon={<Finance style={{ fontSize: '50px' }} />}
            />
          </Grid>
          {/* Second Row */}
          <Grid item xs={12} md={4}>
            <SalesStatics />
          </Grid>
          <Grid item xs={12} md={8}>
            <CategoryOrderInfo />
          </Grid>
          {/* Third Row */}
          <Grid item xs={12}>
            <SoldAmountPurchasedPackages />
          </Grid>
          {/* Fourth Row */}
          <Grid item xs={12} sm={6} md={3}>
            <NextLink href='/dashboards/crm/' passHref>
              <MUILink sx={{ textDecoration: 'none' }}>
                <CardSettingsButton
                  color='#666CFF'
                  bgColor='#ECEDFF'
                  title='Money Withdraw'
                  icon={
                    <svg
                      id='Group_22725'
                      data-name='Group 22725'
                      xmlns='http://www.w3.org/2000/svg'
                      width='48'
                      height='48'
                      viewBox='0 0 48 48'
                    >
                      <path
                        id='Path_108'
                        d='M24,28.5A1.538,1.538,0,0,1,25.5,30v6a1.5,1.5,0,0,1-3,0V30A1.538,1.538,0,0,1,24,28.5'
                        fill='#666CFF'
                      ></path>
                      <path
                        id='Path_109'
                        d='M36,21H33V43.5A1.538,1.538,0,0,1,31.5,45h-15A1.538,1.538,0,0,1,15,43.5V21H12V43.5A4.481,4.481,0,0,0,16.5,48h15A4.481,4.481,0,0,0,36,43.5Z'
                        fill='#666CFF'
                      ></path>
                      <path
                        id='Path_110'
                        d='M43.5,0H4.5A4.481,4.481,0,0,0,0,4.5v9A4.481,4.481,0,0,0,4.5,18h39A4.481,4.481,0,0,0,48,13.5v-9A4.481,4.481,0,0,0,43.5,0M45,13.5A1.538,1.538,0,0,1,43.5,15H4.5A1.538,1.538,0,0,1,3,13.5v-9A1.538,1.538,0,0,1,4.5,3h39A1.538,1.538,0,0,1,45,4.5Z'
                        fill='#666CFF'
                      ></path>
                      <path id='Path_111' d='M28.5,21h-9a4.5,4.5,0,0,0,9,0' fill='#666CFF'></path>
                    </svg>
                  }
                />
              </MUILink>
            </NextLink>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <NextLink href='/dashboards/crm/' passHref>
              <MUILink sx={{ textDecoration: 'none' }}>
                <CardSettingsButton
                  color='#6D788D'
                  bgColor='#EDEFF1'
                  title='Add New Product'
                  icon={
                    <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'>
                      <g id='Group_22724' data-name='Group 22724' transform='translate(-1284 -875)'>
                        <rect
                          id='Rectangle_17080'
                          data-name='Rectangle 17080'
                          width='2'
                          height='48'
                          rx='1'
                          transform='translate(1307 875)'
                          fill='#6D788D'
                        ></rect>
                        <rect
                          id='Rectangle_17081'
                          data-name='Rectangle 17081'
                          width='2'
                          height='48'
                          rx='1'
                          transform='translate(1332 898) rotate(90)'
                          fill='#6D788D'
                        ></rect>
                      </g>
                    </svg>
                  }
                />
              </MUILink>
            </NextLink>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <NextLink href='/dashboards/crm/' passHref>
              <MUILink sx={{ textDecoration: 'none' }}>
                <CardSettingsButton
                  color='#666CFF'
                  bgColor='#ECEDFF'
                  title='Shop Setting'
                  icon={
                    <svg
                      id='Group_31'
                      data-name='Group 31'
                      xmlns='http://www.w3.org/2000/svg'
                      width='48'
                      height='48'
                      viewBox='0 0 32 32'
                    >
                      <path
                        id='Path_78'
                        data-name='Path 78'
                        d='M2,25.723a1,1,0,0,0,.629.928L16,32l3.361-1.344a.5.5,0,0,0-.186-.965.491.491,0,0,0-.185.036L16,30.923l-13-5.2v-11.6a4.428,4.428,0,0,1-1-.2Z'
                        fill='#666CFF'
                      ></path>
                      <path
                        id='Path_79'
                        data-name='Path 79'
                        d='M19.681,24.189a.5.5,0,0,0-.5-.5.493.493,0,0,0-.186.036l-3,1.2L7.432,21.5a.5.5,0,0,0-.65.278.512.512,0,0,0-.035.186.5.5,0,0,0,.314.464L16,26l3.367-1.347a.5.5,0,0,0,.314-.464'
                        fill='#666CFF'
                      ></path>
                      <path
                        id='Path_80'
                        data-name='Path 80'
                        d='M31.5,25.126h-.087a1.368,1.368,0,0,1-.967-2.336l.061-.061a.5.5,0,0,0,0-.707l-.265-.265-.264-.264a.5.5,0,0,0-.707,0l-.061.06a1.368,1.368,0,0,1-2.336-.967V20.5a.5.5,0,0,0-.5-.5h-.748a.5.5,0,0,0-.5.5v.086a1.368,1.368,0,0,1-2.336.967l-.061-.06a.5.5,0,0,0-.707,0l-.265.264-.265.265a.5.5,0,0,0,0,.707l.061.061a1.368,1.368,0,0,1-.967,2.336H20.5a.5.5,0,0,0-.5.5v.748a.5.5,0,0,0,.5.5h.086a1.368,1.368,0,0,1,.967,2.336l-.061.061a.5.5,0,0,0,0,.707l.265.264.265.265a.5.5,0,0,0,.707,0l.061-.061a1.368,1.368,0,0,1,2.336.968V31.5a.5.5,0,0,0,.5.5h.748a.5.5,0,0,0,.5-.5v-.086a1.368,1.368,0,0,1,2.336-.968l.061.061a.5.5,0,0,0,.707,0l.264-.265.265-.264a.5.5,0,0,0,0-.707l-.061-.061a1.368,1.368,0,0,1,.967-2.336H31.5a.5.5,0,0,0,.5-.5v-.748a.5.5,0,0,0-.5-.5M29.171,29a2.373,2.373,0,0,0,.118.285,2.368,2.368,0,0,0-3.171,1.078,2.22,2.22,0,0,0-.118.285,2.369,2.369,0,0,0-3-1.481,2.516,2.516,0,0,0-.285.118A2.367,2.367,0,0,0,21.348,26a2.369,2.369,0,0,0,1.48-3,2.344,2.344,0,0,0-.118-.285,2.37,2.37,0,0,0,3.172-1.077A2.516,2.516,0,0,0,26,21.348a2.367,2.367,0,0,0,3,1.48,2.28,2.28,0,0,0,.285-.118,2.37,2.37,0,0,0,1.077,3.172,2.457,2.457,0,0,0,.286.118,2.367,2.367,0,0,0-1.481,3'
                        fill='#666CFF'
                      ></path>
                      <path
                        id='Path_81'
                        data-name='Path 81'
                        d='M27.5,26A1.5,1.5,0,1,0,26,27.5,1.5,1.5,0,0,0,27.5,26'
                        fill='#666CFF'
                      ></path>
                      <path
                        id='Path_82'
                        data-name='Path 82'
                        d='M16,0A46.43,46.43,0,0,1,0,8.4v2a3.451,3.451,0,0,0,5.333,2.133,3.452,3.452,0,0,0,5.333,2.134A3.453,3.453,0,0,0,16,16.8a3.451,3.451,0,0,0,5.333-2.133,3.451,3.451,0,0,0,5.333-2.134A3.454,3.454,0,0,0,32,10.4v-2A46.421,46.421,0,0,1,16,0M31.021,10.194a2.452,2.452,0,0,1-3.788,1.515,1,1,0,0,0-1.545.618A2.453,2.453,0,0,1,21.9,13.843a1,1,0,0,0-1.545.618A2.451,2.451,0,0,1,16,15.434a2.452,2.452,0,0,1-4.355-.973,1,1,0,0,0-1.545-.618,2.454,2.454,0,0,1-3.789-1.516,1,1,0,0,0-1.184-.772,1.015,1.015,0,0,0-.361.154A2.451,2.451,0,0,1,.978,10.194V9.148A47.458,47.458,0,0,0,16,1.277,47.442,47.442,0,0,0,31.021,9.148Z'
                        fill='#666CFF'
                      ></path>
                    </svg>
                  }
                />
              </MUILink>
            </NextLink>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <NextLink href='/dashboards/crm/' passHref>
              <MUILink sx={{ textDecoration: 'none' }}>
                <CardSettingsButton
                  color='#6D788D'
                  bgColor='#EDEFF1'
                  title='Payment Setting'
                  icon={
                    <svg
                      id='Group_30'
                      data-name='Group 30'
                      xmlns='http://www.w3.org/2000/svg'
                      width='48'
                      height='48'
                      viewBox='0 0 31.999 32'
                    >
                      <path
                        id='Path_83'
                        data-name='Path 83'
                        d='M96.2,30.593a.5.5,0,0,1,.314-.464L103.6,27.3a.484.484,0,0,1,.185-.036.5.5,0,0,1,.185.965l-7.087,2.831a.5.5,0,0,1-.686-.464'
                        transform='translate(-92.946 -10)'
                        fill='#6D788D'
                      ></path>
                      <path
                        id='Path_84'
                        data-name='Path 84'
                        d='M96.2,33.537a.5.5,0,0,1,.314-.464l4.615-1.844a.493.493,0,0,1,.186-.036.5.5,0,0,1,.186.964L96.887,34a.5.5,0,0,1-.686-.464'
                        transform='translate(-92.946 -10)'
                        fill='#6D788D'
                      ></path>
                      <path
                        id='Path_85'
                        data-name='Path 85'
                        d='M117.171,10a2.017,2.017,0,0,0-.744.143L94.205,19.021a2,2,0,0,0-1.259,1.857V40a2,2,0,0,0,2.746,1.857l15.795-6.31a.5.5,0,1,0-.372-.929L95.32,40.928a.985.985,0,0,1-.372.072,1,1,0,0,1-1-1V28.7l24.225-9.679v8.306a.5.5,0,0,0,1,0V12a2,2,0,0,0-2-2m1,5.82L93.947,25.5v-4.62a1,1,0,0,1,.63-.928L116.8,11.071a1,1,0,0,1,1.373.929Z'
                        transform='translate(-92.946 -10)'
                        fill='#6D788D'
                      ></path>
                      <path
                        id='Path_86'
                        data-name='Path 86'
                        d='M123.686,32.181,115.1,28.752a4.007,4.007,0,0,0-7.193-1.8l2.671,1.067a1,1,0,1,1-.744,1.857l-2.671-1.067a4.005,4.005,0,0,0,6.449,3.654L122.2,35.9a2,2,0,1,0,1.487-3.714m.186,2.228a1,1,0,0,1-1.3.557L113.4,31.3a3.006,3.006,0,0,1-5.08-.952l1.149.459a2,2,0,1,0,1.488-3.714l-1.149-.459a3,3,0,0,1,4.336,2.809l9.173,3.665a1,1,0,0,1,.558,1.3'
                        transform='translate(-92.946 -10)'
                        fill='#6D788D'
                      ></path>
                    </svg>
                  }
                />
              </MUILink>
            </NextLink>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardHeader title={'Top 12 Products'} />
              <CardContent sx={{ bgcolor: '#EDEFF1', padding: '20px !important' }}>
                <KeenSliderWrapper>
                  <TopProductSwiper />
                </KeenSliderWrapper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ApexChartWrapper>
    </>
  )
}

export default CrmDashboard
