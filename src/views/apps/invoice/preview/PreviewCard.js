// ** React Imports
import { useEffect, useRef, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import TableCell from '@mui/material/TableCell'

// ** Third Party Imports
import ReactToPdf from 'react-to-pdf'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

const MUITableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 0,
  padding: `${theme.spacing(1, 0)} !important`
}))

const CalcWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const PreviewCard = ({ data }) => {
  // ** Hook
  const theme = useTheme()
  const [listedData, setlistedData] = useState([])
  const [allKeys, setallKeys] = useState([])

  const sortData = () => {
    console.log("this is useeffecte")

      const sorted = Object.entries(data)

      const resArr = []

      sorted.forEach(item => {
        const resObj = {}
        resObj[item[0]] = item[1]
        resArr.push(resObj)
      })
      setlistedData(resArr)

      const arr = []
      resArr.forEach(i => {
        const all = Object.entries(i)

        if (typeof all[0][1] == 'string') {
          const reg = /([_])/g
          const updated = all[0][0].replace(reg, ' ').replace(/\b\w/g, c => c.toUpperCase())
          arr.push([updated, all[0][1]])
        }
      })
      setallKeys(arr)
  }
  console.log(allKeys)

  useEffect(() => {
    sortData()
  }, [])

  const PreviewRef = useRef(null)
  if (data) {
    return (
      <Card>
        <Box ref={PreviewRef}>
          <CardContent>
            <Grid container>
              <Grid item sm={6} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                    <svg
                      version='1.0'
                      xmlns='http://www.w3.org/2000/svg'
                      width='80.000000pt'
                      height='44.000000pt'
                      viewBox='0 0 1280.000000 473.000000'
                      preserveAspectRatio='xMidYMid meet'
                    >
                      <g
                        transform='translate(0.000000,473.000000) scale(0.100000,-0.100000)'
                        fill={theme.palette.primary.main}
                        stroke='none'
                      >
                        <path
                          d='M3065 4676 c-104 -49 -251 -200 -330 -341 -96 -170 -227 -537 -330
                              -920 -31 -115 -58 -216 -60 -222 -3 -10 -102 -13 -450 -13 -245 0 -445 2 -445
                              4 0 2 29 105 65 228 70 243 139 516 150 594 4 28 22 73 41 104 43 70 74 192
                              74 288 0 75 0 75 -40 113 -24 23 -54 41 -77 45 -49 9 -326 -2 -488 -21 -596
                              -67 -994 -233 -1106 -461 -58 -118 -48 -279 21 -338 40 -33 55 -27 182 74 158
                              128 291 183 515 214 139 19 265 25 259 11 -64 -133 -255 -672 -312 -877 l-19
                              -68 -95 -31 c-150 -50 -278 -120 -364 -200 -105 -98 -154 -204 -111 -239 21
                              -17 253 -3 419 25 34 6 36 27 -27 -255 -95 -420 -122 -680 -98 -939 20 -221
                              47 -248 231 -237 198 13 313 49 379 121 46 50 61 95 61 185 0 222 63 619 162
                              1027 41 169 42 171 71 177 76 15 893 -12 890 -29 0 -5 -17 -107 -37 -225 -59
                              -363 -70 -460 -70 -675 -1 -182 1 -206 22 -274 13 -40 34 -91 48 -112 58 -92
                              170 -137 359 -146 108 -5 126 -3 167 15 71 31 74 44 81 292 13 440 62 796 276
                              2010 112 639 115 659 116 881 0 180 -2 199 -19 218 -24 27 -49 26 -111 -3z'
                        />
                        <path
                          d='M11817 3548 c-78 -21 -98 -55 -176 -295 -94 -292 -146 -474 -230
                                  -808 -60 -238 -78 -294 -121 -380 -104 -209 -178 -267 -350 -273 -110 -4 -150
                                  10 -187 67 -20 29 -23 47 -23 121 0 138 40 329 175 830 45 167 43 415 -5 544
                                  -25 66 -81 120 -142 137 -89 24 -282 -9 -384 -65 l-59 -33 -67 -539 -66 -539
                                  -42 -90 c-75 -160 -92 -218 -97 -343 -12 -258 69 -408 270 -502 123 -57 215
                                  -75 387 -75 169 0 231 13 360 77 66 32 102 59 172 128 48 48 88 82 88 76 0 -9
                                  -51 -242 -75 -343 -6 -24 -77 -43 -423 -113 -440 -90 -613 -150 -733 -258 -82
                                  -73 -94 -106 -94 -247 0 -101 4 -129 23 -177 55 -137 162 -249 311 -327 144
                                  -75 334 -105 521 -82 134 17 202 36 305 86 209 101 324 265 451 638 l57 168
                                  96 49 c549 275 1030 868 1009 1242 -7 113 -43 145 -112 97 -17 -12 -96 -98
                                  -176 -191 -212 -248 -459 -492 -624 -618 -18 -14 -19 -13 -12 5 4 11 50 168
                                  102 349 188 653 284 1066 285 1230 1 102 -69 247 -172 361 -80 86 -158 117
                                  -242 93z m-767 -2876 c-135 -261 -313 -346 -512 -246 -87 43 -128 92 -128 152
                                  0 65 50 83 366 127 142 20 261 39 263 41 2 2 15 4 28 4 24 0 24 -1 -17 -78z'
                        />
                        <path
                          d='M7567 3500 c-169 -30 -267 -100 -298 -212 -6 -25 -9 -142 -7 -311 2
                                  -265 2 -275 -25 -393 -79 -352 -191 -610 -321 -740 -71 -70 -127 -94 -220 -94
                                  -77 0 -139 27 -166 72 -16 27 -20 50 -20 130 0 127 27 279 95 528 120 442 110
                                  382 109 605 0 167 -3 208 -17 245 -28 71 -64 118 -110 142 -36 20 -56 23 -147
                                  22 -61 -1 -132 -8 -170 -18 -73 -18 -189 -72 -195 -89 -2 -7 -32 -246 -65
                                  -532 l-62 -520 -76 -78 c-121 -122 -214 -171 -350 -184 -61 -6 -65 -5 -58 13
                                  66 168 96 308 96 452 0 126 -19 213 -62 293 -82 154 -214 217 -433 206 -171
                                  -9 -298 -71 -401 -195 -103 -126 -144 -236 -144 -395 0 -248 107 -469 294
                                  -603 l29 -21 -56 -27 c-168 -79 -426 -81 -557 -4 -126 75 -205 217 -217 388
                                  -29 439 266 836 687 925 40 8 158 19 263 24 231 11 300 28 305 75 7 57 -135
                                  157 -308 218 -82 28 -230 48 -365 48 -387 0 -702 -139 -928 -408 -158 -190
                                  -249 -373 -299 -605 -30 -140 -32 -446 -4 -551 46 -171 119 -297 238 -412 172
                                  -166 402 -244 718 -244 156 0 232 10 348 47 168 52 310 141 455 284 l89 88 51
                                  -9 c98 -15 291 -22 354 -12 34 6 89 22 122 35 l61 25 6 -27 c34 -157 116 -258
                                  269 -331 138 -66 305 -96 490 -87 123 5 202 29 301 88 74 45 203 174 250 250
                                  l38 61 22 -90 c50 -205 121 -282 275 -301 76 -10 126 -1 226 38 66 26 252 119
                                  364 182 l86 49 70 -68 c85 -82 156 -125 267 -163 117 -41 254 -59 440 -59 350
                                  0 580 70 747 227 80 76 131 167 154 278 45 215 -11 349 -260 621 l-74 82 45
                                  17 c73 28 188 110 252 180 107 117 159 263 149 420 -18 287 -241 431 -642 412
                                  -223 -11 -389 -77 -536 -215 -82 -77 -139 -164 -176 -269 -25 -70 -28 -92 -28
                                  -218 0 -113 4 -152 20 -200 34 -104 121 -219 348 -457 117 -123 227 -245 246
                                  -271 32 -47 72 -129 86 -176 l7 -24 -88 7 c-233 18 -393 97 -491 244 -23 34
                                  -64 128 -102 232 -44 118 -73 184 -91 202 -61 60 -159 42 -245 -46 -52 -52
                                  -123 -177 -146 -254 -21 -73 -208 -233 -290 -247 -57 -10 -69 9 -69 113 0 109
                                  25 269 94 616 70 345 86 449 93 616 8 203 -11 300 -70 344 -24 18 -44 21 -125
                                  23 -53 1 -119 -2 -145 -7z m1840 -420 c70 -42 83 -137 33 -236 -30 -58 -126
                                  -185 -145 -190 -11 -4 -106 115 -147 184 -30 51 -68 160 -68 197 0 21 9 26 83
                                  43 110 27 202 28 244 2z m-4202 -434 c13 -13 27 -41 31 -61 12 -64 -3 -198
                                  -31 -281 -39 -116 -37 -115 -79 -58 -89 121 -101 319 -24 411 18 22 76 16 103
                                  -11z'
                        />
                      </g>
                    </svg>
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                  <Table sx={{ maxWidth: '200px' }}>
                    <TableBody>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='h6'>Invoice</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='h6'>{`#${data?.id}`}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>Date Issued:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{data?.issuedDate}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>Date Due:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{data?.dueDate}</Typography>
                        </MUITableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Grid>
            </Grid>
          </CardContent>

          <Divider sx={{ mt: 6.5, mb: 0 }} />

          <TableContainer>
            <Table>
              <TableHead></TableHead>
              <TableBody>
                <Box sx={{ display: 'grid', flexWrap: 'wrap', gridTemplateColumns: '1fr 1fr ' }}>
                  
                      {allKeys &&  allKeys.map(item => {
                        return (
                          <>
                            {item[1] && item[0] !== 'Image' && item[0] !== 'Image Sm'&& item[0] !== 'Image Md'&& item[0] !== 'Relative Path'  && (
                              <Box
                                sx={{
                                  display: 'grid',
                                  flexWrap: 'wrap',
                                  gridTemplateColumns: '1fr 1fr ',
                                  justifyContent: 'space-between'
                                }}
                              >
                                <TableCell>{item[0]}</TableCell>
                                <TableCell>{item[1]}</TableCell>
                              </Box>
                            )}
                          </>
                        )
                      })}
                    
                </Box>
              </TableBody>
            </Table>
          </TableContainer>

          <CardContent sx={{ pt: 8 }}>
            <Grid container>
              <Grid item xs={12} sm={7} lg={9} sx={{ order: { sm: 1, xs: 2 } }}>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant='body2'
                    sx={{ mr: 2, color: 'text.primary', fontWeight: 600, letterSpacing: '.25px' }}
                  >
                    Salesperson:
                  </Typography>
                  <Typography variant='body2'>Tommy Shelby</Typography>
                </Box>

                <Typography variant='body2'>Thanks for your business</Typography>
              </Grid>
              <Grid item xs={12} sm={5} lg={3} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
                <CalcWrapper>
                  <Typography variant='body2'>Subtotal:</Typography>
                  <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                    $1800
                  </Typography>
                </CalcWrapper>
                <CalcWrapper>
                  <Typography variant='body2'>Discount:</Typography>
                  <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                    $28
                  </Typography>
                </CalcWrapper>
                <CalcWrapper>
                  <Typography variant='body2'>Tax:</Typography>
                  <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                    21%
                  </Typography>
                </CalcWrapper>
                <Divider sx={{ mt: 5, mb: 3 }} />
                <CalcWrapper>
                  <Typography variant='body2'>Total:</Typography>
                  <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                    $1690
                  </Typography>
                </CalcWrapper>
              </Grid>
            </Grid>
          </CardContent>

          <Divider sx={{ mt: 4.5, mb: 0 }} />

          <CardContent>
            <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
              <strong>Note:</strong> It was a pleasure working with you and your team. We hope you will keep us in mind
              for future freelance projects. Thank You!
            </Typography>
          </CardContent>
        </Box>
        <CardContent>
          <Box sx={{ mt: 0, width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            {/* <Link href={`/apps/invoice/print/${data.invoice.id}`} passHref> */}
            <Button sx={{ mr: 4 }} target='_blank' component='a' variant='contained'>
              Print
            </Button>
            {/* </Link> */}

            <ReactToPdf scale={0.845} targetRef={PreviewRef} filename={`invoice-${data?.id}.pdf`}>
              {({ toPdf }) => {
                return (
                  <Button variant='contained' color='success' onClick={toPdf}>
                    Download
                  </Button>
                )
              }}
            </ReactToPdf>
          </Box>
        </CardContent>
      </Card>
    )
  } else {
    return null
  }
}

export default PreviewCard
