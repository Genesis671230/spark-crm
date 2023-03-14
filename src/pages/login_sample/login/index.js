// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import MuiLink from '@mui/material/Link'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import DataDialog from 'src/pages/components/data_dialog'

import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

import { useLoginMutation } from 'src/RTKQ_store/api'

// ** Styled Components
const LoginIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const LoginIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 400
  }
}))

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  email: 'admin@housy.com',
  password: 'admin'
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const bgClasses = useBgColor()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
 

  // ** Vars
  const { skin } = settings

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data, event) => {
    event.preventDefault()
    auth.login({ email_or_phone: data.email, password: data.password })
  }
  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          <LoginIllustrationWrapper>
            <LoginIllustration
              alt='login-illustration'
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </LoginIllustrationWrapper>
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={{
            p: 7,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg
                version='1.0'
                xmlns='http://www.w3.org/2000/svg'
                width='48.000000pt'
                height='22.000000pt'
                viewBox='0 0 1280.000000 473.000000'
                preserveAspectRatio='xMidYMid meet'
              >
                <g transform='translate(0.000000,473.000000) scale(0.100000,-0.100000)' fill='#666CFF' stroke='none'>
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
              {/* <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
                {themeConfig.templateName}
              </Typography> */}
            </Box>
            <Box sx={{ mb: 6 }}>
              <TypographyStyled variant='h5'>{`Welcome to Seller Pannel! 👋🏻`}</TypographyStyled>
              <Typography variant='body2'>Please sign-in as seller and start your business</Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label='Email'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder='admin@housy.com'
                    />
                  )}
                />
                {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                  Password
                </InputLabel>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      onBlur={onBlur}
                      label='Password'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: 'error.main' }} id=''>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Box
                sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
              >
                <FormControlLabel
                  label='Remember Me'
                  control={<Checkbox />}
                  sx={{ '& .MuiFormControlLabel-label': { color: 'text.primary' } }}
                />
                <Link passHref href='/forgot-password'>
                  <Typography component={MuiLink} variant='body2' sx={{ color: 'primary.main' }}>
                    Forgot Password?
                  </Typography>
                </Link>
              </Box>
              <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                Login
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ mr: 2, color: 'text.secondary' }}>Be a seller?</Typography>
                <Typography>
                  <Link passHref href='/register'>
                    <Typography component={MuiLink} sx={{ color: 'primary.main' }}>
                      Apply Now
                    </Typography>
                  </Link>
                </Typography>
              </Box>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage
