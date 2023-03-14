// ** React Imports
import { useState, Fragment, forwardRef } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import MuiLink from '@mui/material/Link'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, FormProvider, useFormContext, Controller } from 'react-hook-form'

// ** Third Party Styles Imports
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { Grid } from 'mdi-material-ui'

const IssueDate = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Issue Date' autoComplete='off' />
})

const ExpireDate = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Expire Date' autoComplete='off' />
})

const DocIssueDate = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Issue Date' autoComplete='off' />
})

const DocExpireDate = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Expire Date' autoComplete='off' />
})

const defaultValues = {
  email: '',
  ownername: '',
  password: '',
  date: '',
  terms: false
}

// ** Styled Components
const RegisterIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const RegisterIllustration = styled('img')(({ theme }) => ({
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
    maxWidth: 600
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 800
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
  paddingBottom: '50px',
  textAlign: 'center',
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))
function getStep() {
  return ['General Information', 'Store', 'Documents Detail', 'Bank Detail']
}

const Register = () => {
  // ** States
  const [issueDate, setIssueDate] = useState(null)
  const [expireDate, setExpireDate] = useState(null)
  const [docIssueDate, setDocIssueDate] = useState(null)
  const [docExpireDate, setDocExpireDate] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [skippedSteps, setSkippedSteps] = useState([])
  const steps = getStep()

  // ** Hooks
  const theme = useTheme()
  const { register } = useAuth()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const methods = useForm()

  // ** Vars
  const { skin } = settings

  const schema = yup.object().shape({
    password: yup.string().min(5).required(),
    ownername: yup.string().min(3).required(),
    email: yup.string().email().required(),
    terms: yup.bool().oneOf([true], 'You must accept the privacy policy & terms')
  })

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

  // const isStepOptional = step => {
  //   return step === 1 || step === 2
  // }

  // const isStepSkipped = step => {
  //   return skippedSteps.includes(step)
  // }

  const handleNext = () => {
    setActiveStep(activeStep + 1)
    setSkippedSteps(skippedSteps.filter(skipItem => skipItem !== activeStep))
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  // const handleSkip = () => {
  //   if (!isStepSkipped(activeStep)) {
  //     setSkippedSteps([...skippedSteps, activeStep])
  //   }
  //   setActiveStep(activeStep + 1)
  // }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <>
            {/* <Typography variant='h6' style={{ paddingBottom: '20px', fontWeight: 'bold' }}>
              General Information
            </Typography> */}
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='ownername'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    autoFocus
                    value={value}
                    onBlur={onBlur}
                    label='Owner Name'
                    onChange={onChange}
                    placeholder='johndoe'
                    error={Boolean(errors.ownername)}
                  />
                )}
              />
              {errors.ownername && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.ownername.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='address'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Address'
                    onChange={onChange}
                    placeholder='address'
                    error={Boolean(errors.address)}
                  />
                )}
              />
              {errors.address && <FormHelperText sx={{ color: 'error.main' }}>{errors.address.message}</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='ownermobile'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Owner Mobile'
                    onChange={onChange}
                    placeholder='Mobile Number'
                    error={Boolean(errors.ownermobile)}
                  />
                )}
              />
              {errors.ownermobile && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.ownermobile.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    label='Email'
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    placeholder='user@email.com'
                  />
                )}
              />
              {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='ownertype'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Owner Type'
                    onChange={onChange}
                    placeholder='Owner Type'
                    error={Boolean(errors.ownertype)}
                  />
                )}
              />
              {errors.ownertype && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.ownertype.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='owneridtype'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Owner ID Type'
                    onChange={onChange}
                    placeholder='Owner ID Type'
                    error={Boolean(errors.owneridtype)}
                  />
                )}
              />
              {errors.owneridtype && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.owneridtype.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='owneridproof'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Owner ID Proof'
                    onChange={onChange}
                    placeholder='Owner ID Proof'
                    error={Boolean(errors.owneridproof)}
                  />
                )}
              />
              {errors.owneridproof && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.owneridproof.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <DatePicker
                selected={issueDate}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<IssueDate />}
                id='issueDate'
                onChange={date => setIssueDate(date)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <DatePicker
                selected={expireDate}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<ExpireDate />}
                id='expireDate'
                onChange={date => setExpireDate(date)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='uploadOwnerId'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Upload Owner ID'
                    onChange={onChange}
                    placeholder='Upload Owner ID'
                    error={Boolean(errors.uploadOwnerId)}
                  />
                )}
              />
              {errors.uploadOwnerId && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.uploadOwnerId.message}</FormHelperText>
              )}
            </FormControl>
          </>
        )
      case 1:
        return (
          <>
            {/* <Typography variant='h6' style={{ paddingBottom: '20px', marginTop: '30px', fontWeight: 'bold' }}>
              Store
            </Typography> */}
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='storeName'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Store Name'
                    onChange={onChange}
                    placeholder='Store Name'
                    error={Boolean(errors.storeName)}
                  />
                )}
              />
              {errors.storeName && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.storeName.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='storeAddress'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Store Address'
                    onChange={onChange}
                    placeholder='Store Address'
                    error={Boolean(errors.storeAddress)}
                  />
                )}
              />
              {errors.storeAddress && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.storeAddress.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='pickupAddress'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Pickup Address'
                    onChange={onChange}
                    placeholder='Pickup Address'
                    error={Boolean(errors.pickupAddress)}
                  />
                )}
              />
              {errors.pickupAddress && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.pickupAddress.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='storeGoogleLocation'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    label='Store Google Location'
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.storeGoogleLocation)}
                    placeholder='Store Google Location'
                  />
                )}
              />
              {errors.storeGoogleLocation && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.storeGoogleLocation.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='pickupGoogleLocation'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Pickup Google Location'
                    onChange={onChange}
                    placeholder='Pickup Google Location'
                    error={Boolean(errors.pickupGoogleLocation)}
                  />
                )}
              />
              {errors.pickupGoogleLocation && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.pickupGoogleLocation.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='storeContact'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Store Contact'
                    onChange={onChange}
                    placeholder='Store Contact'
                    error={Boolean(errors.storeContact)}
                  />
                )}
              />
              {errors.storeContact && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.storeContact.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='storeEmail'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Store Email'
                    onChange={onChange}
                    placeholder='Store Email'
                    error={Boolean(errors.storeEmail)}
                  />
                )}
              />
              {errors.storeEmail && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.storeEmail.message}</FormHelperText>
              )}
            </FormControl>
          </>
        )
      case 2:
        return (
          <>
            {/* <Typography variant='h6' style={{ paddingBottom: '20px', marginTop: '30px', fontWeight: 'bold' }}>
              Documents
            </Typography> */}
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='licenseNo'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='License No'
                    onChange={onChange}
                    placeholder='License No'
                    error={Boolean(errors.licenseNo)}
                  />
                )}
              />
              {errors.licenseNo && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.licenseNo.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <DatePicker
                selected={docIssueDate}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<DocIssueDate />}
                id='docIssueDate'
                onChange={date => setDocIssueDate(date)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <DatePicker
                selected={docExpireDate}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<ExpireDate />}
                id='docExpireDate'
                onChange={date => setDocExpireDate(date)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='issueAuthority'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Issue Authority'
                    onChange={onChange}
                    placeholder='Issue Authority'
                    error={Boolean(errors.issueAuthority)}
                  />
                )}
              />
              {errors.issueAuthority && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.issueAuthority.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='licenseActivity'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='License Activity'
                    onChange={onChange}
                    placeholder='License Activity'
                    error={Boolean(errors.licenseActivity)}
                  />
                )}
              />
              {errors.licenseActivity && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.licenseActivity.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='vatRegistered'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    label='Vat Registered'
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.vatRegistered)}
                    placeholder='Vat Registered'
                  />
                )}
              />
              {errors.vatRegistered && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.vatRegistered.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='vatNo'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Vat No'
                    onChange={onChange}
                    placeholder='Vat No'
                    error={Boolean(errors.vatNo)}
                  />
                )}
              />
              {errors.vatNo && <FormHelperText sx={{ color: 'error.main' }}>{errors.vatNo.message}</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='owneridtype'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Owner ID Type'
                    onChange={onChange}
                    placeholder='Owner ID Type'
                    error={Boolean(errors.owneridtype)}
                  />
                )}
              />
              {errors.owneridtype && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.owneridtype.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='owneridproof'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Owner ID Proof'
                    onChange={onChange}
                    placeholder='Owner ID Proof'
                    error={Boolean(errors.owneridproof)}
                  />
                )}
              />
              {errors.owneridproof && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.owneridproof.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <DatePicker
                selected={issueDate}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<IssueDate />}
                id='issueDate'
                onChange={date => setIssueDate(date)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <DatePicker
                selected={expireDate}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<ExpireDate />}
                id='expireDate'
                onChange={date => setExpireDate(date)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='uploadOwnerId'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Upload Owner ID'
                    onChange={onChange}
                    placeholder='Upload Owner ID'
                    error={Boolean(errors.uploadOwnerId)}
                  />
                )}
              />
              {errors.uploadOwnerId && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.uploadOwnerId.message}</FormHelperText>
              )}
            </FormControl>
          </>
        )
      case 3:
        return (
          <>
            {/* <Typography variant='h6' style={{ paddingBottom: '20px', marginTop: '40px', fontWeight: 'bold' }}>
              Bank Details
            </Typography> */}
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='ownername'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Owner Name'
                    onChange={onChange}
                    placeholder='johndoe'
                    error={Boolean(errors.ownername)}
                  />
                )}
              />
              {errors.ownername && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.ownername.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='address'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Address'
                    onChange={onChange}
                    placeholder='address'
                    error={Boolean(errors.address)}
                  />
                )}
              />
              {errors.address && <FormHelperText sx={{ color: 'error.main' }}>{errors.address.message}</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='ownermobile'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Owner Mobile'
                    onChange={onChange}
                    placeholder='Mobile Number'
                    error={Boolean(errors.ownermobile)}
                  />
                )}
              />
              {errors.ownermobile && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.ownermobile.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    label='Email'
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    placeholder='user@email.com'
                  />
                )}
              />
              {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='ownertype'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Owner Type'
                    onChange={onChange}
                    placeholder='Owner Type'
                    error={Boolean(errors.ownertype)}
                  />
                )}
              />
              {errors.ownertype && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.ownertype.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='owneridtype'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Owner ID Type'
                    onChange={onChange}
                    placeholder='Owner ID Type'
                    error={Boolean(errors.owneridtype)}
                  />
                )}
              />
              {errors.owneridtype && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.owneridtype.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='owneridproof'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Owner ID Proof'
                    onChange={onChange}
                    placeholder='Owner ID Proof'
                    error={Boolean(errors.owneridproof)}
                  />
                )}
              />
              {errors.owneridproof && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.owneridproof.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <DatePicker
                selected={issueDate}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<IssueDate />}
                id='issueDate'
                onChange={date => setIssueDate(date)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <DatePicker
                selected={expireDate}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<ExpireDate />}
                id='expireDate'
                onChange={date => setExpireDate(date)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='uploadOwnerId'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Upload Owner ID'
                    onChange={onChange}
                    placeholder='Upload Owner ID'
                    error={Boolean(errors.uploadOwnerId)}
                  />
                )}
              />
              {errors.uploadOwnerId && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.uploadOwnerId.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl sx={{ my: 0 }} error={Boolean(errors.terms)}>
              <Controller
                name='terms'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => {
                  return (
                    <FormControlLabel
                      sx={{
                        ...(errors.terms ? { color: 'error.main' } : null),
                        '& .MuiFormControlLabel-label': { fontSize: '0.875rem' }
                      }}
                      control={
                        <Checkbox
                          checked={value}
                          onChange={onChange}
                          sx={errors.terms ? { color: 'error.main' } : null}
                        />
                      }
                      label={
                        <Fragment>
                          <Typography variant='body2' component='span' sx={{ color: errors.terms ? 'error.main' : '' }}>
                            I agree to{' '}
                          </Typography>
                          <Link href='/' passHref>
                            <Typography
                              variant='body2'
                              component={MuiLink}
                              sx={{ color: 'primary.main' }}
                              onClick={e => e.preventDefault()}
                            >
                              privacy policy & terms
                            </Typography>
                          </Link>
                        </Fragment>
                      }
                    />
                  )
                }}
              />
              {errors.terms && (
                <FormHelperText sx={{ mt: 0, color: 'error.main' }}>{errors.terms.message}</FormHelperText>
              )}
            </FormControl>
          </>
        )
    }
  }

  const onSubmit = data => {
    const { email, ownername, password } = data
    register({ email, ownername, password }, err => {
      if (err.email) {
        setError('email', {
          type: 'manual',
          message: err.email
        })
      }
      if (err.ownername) {
        setError('ownername', {
          type: 'manual',
          message: err.ownername
        })
      }
    })
  }
  const imageSource = skin === 'bordered' ? 'auth-v2-register-illustration-bordered' : 'auth-v2-register-illustration'

  return (
    <Box className='content-right'>
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
        <svg width={47} fill='none' height={26} viewBox='0 0 268 150' xmlns='http://www.w3.org/2000/svg'>
          <rect
            rx='25.1443'
            width='50.2886'
            height='143.953'
            fill={theme.palette.primary.main}
            transform='matrix(-0.865206 0.501417 0.498585 0.866841 195.571 0)'
          />
          <rect
            rx='25.1443'
            width='50.2886'
            height='143.953'
            fillOpacity='0.4'
            fill='url(#paint0_linear_7821_79167)'
            transform='matrix(-0.865206 0.501417 0.498585 0.866841 196.084 0)'
          />
          <rect
            rx='25.1443'
            width='50.2886'
            height='143.953'
            fill={theme.palette.primary.main}
            transform='matrix(0.865206 0.501417 -0.498585 0.866841 173.147 0)'
          />
          <rect
            rx='25.1443'
            width='50.2886'
            height='143.953'
            fill={theme.palette.primary.main}
            transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
          />
          <rect
            rx='25.1443'
            width='50.2886'
            height='143.953'
            fillOpacity='0.4'
            fill='url(#paint1_linear_7821_79167)'
            transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
          />
          <rect
            rx='25.1443'
            width='50.2886'
            height='143.953'
            fill={theme.palette.primary.main}
            transform='matrix(0.865206 0.501417 -0.498585 0.866841 71.7728 0)'
          />
          <defs>
            <linearGradient
              y1='0'
              x1='25.1443'
              x2='25.1443'
              y2='143.953'
              id='paint0_linear_7821_79167'
              gradientUnits='userSpaceOnUse'
            >
              <stop />
              <stop offset='1' stopOpacity='0' />
            </linearGradient>
            <linearGradient
              y1='0'
              x1='25.1443'
              x2='25.1443'
              y2='143.953'
              id='paint1_linear_7821_79167'
              gradientUnits='userSpaceOnUse'
            >
              <stop />
              <stop offset='1' stopOpacity='0' />
            </linearGradient>
          </defs>
        </svg>

        <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
          {themeConfig.templateName}
        </Typography>
      </Box>
      {!hidden ? (
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          <RegisterIllustrationWrapper>
            <RegisterIllustration
              alt='register-illustration'
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </RegisterIllustrationWrapper>
          <FooterIllustrationsV2 image={`/images/pages/auth-v2-register-mask-${theme.palette.mode}.png`} />
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
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 1 }} style={{ height: '15vh' }}>
                <TypographyStyled variant='h5'>Register Your New Shop Here</TypographyStyled>
                <Stepper alternativeLabel activeStep={activeStep}>
                  {steps.map((step, index) => {
                    const labelProps = {}
                    const stepProps = {}
                    
return (
                      <Step {...stepProps} key={index}>
                        <StepLabel {...labelProps}>{step}</StepLabel>
                      </Step>
                    )
                  })}
                </Stepper>
                <Divider style={{ margin: '20px 0px' }} />
              </Box>
              <div className='signup-form' style={{ height: '70vh', overflowY: 'scroll', paddingTop: '20px' }}>
                <DatePickerWrapper>
                  <FormProvider {...methods}>
                    <form noValidate autoComplete='off' onSubmit={methods.handleSubmit(onSubmit)}>
                      <div style={{}}>{getStepContent(activeStep)}</div>
                    </form>
                  </FormProvider>
                </DatePickerWrapper>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', height: '5%' }}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  back
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button size='large' type='submit' variant='contained'>
                    Register Your Shop
                  </Button>
                ) : (
                  <Button variant='contained' color='primary' onClick={handleNext}>
                    Next
                  </Button>
                )}
              </div>

              <Box sx={{ mt: 5, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ mr: 2, color: 'text.secondary' }}>Already a Seller?</Typography>
                <Typography>
                  <Link passHref href='/login'>
                    <Typography component={MuiLink} sx={{ color: 'primary.main' }}>
                      Sign in instead
                    </Typography>
                  </Link>
                </Typography>
              </Box>
            </div>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}
Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true

export default Register
