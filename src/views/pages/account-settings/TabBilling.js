// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Switch from '@mui/material/Switch'
import FormHelperText from '@mui/material/FormHelperText'
import Card from '@mui/material/Card'

// ** Icons Imports
import CloudOutline from 'mdi-material-ui/CloudOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import { BankPlus } from 'mdi-material-ui'

// ** Third Party Imports
import Payment from 'payment'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import Cards from 'react-credit-cards'

// ** DataDialog to show form data
import DataDialog from 'src/pages/components/data_dialog'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Styled Component Imports
import CardWrapper from 'src/@core/styles/libs/react-credit-cards'

// ** Util Import
import { formatCVC, formatExpirationDate, formatCreditCardNumber } from 'src/@core/utils/format'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'
import { mt } from 'date-fns/locale'

// ** Styled Component
const StyledGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(5),
  [theme.breakpoints.down('md')]: {
    order: -1
  }
}))

const Chip = styled(CustomChip)(({ theme }) => ({
  height: 20,
  fontWeight: 600,
  fontSize: '0.75rem',
  marginTop: theme.spacing(2.25),
  marginBottom: theme.spacing(5.5),
  '& .MuiChip-label': {
    padding: theme.spacing(0, 1.7)
  }
}))

const CreditCardWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('xl')]: {
    '& > div:first-of-type': {
      marginBottom: theme.spacing(6)
    }
  },
  [theme.breakpoints.up('xl')]: {
    alignItems: 'center',
    flexDirection: 'row',
    '& > div:first-of-type': {
      marginRight: theme.spacing(6)
    }
  }
}))

const TabBilling = ({ shop }) => {
  console.log('Billing: ', shop)

  // ** States
  const [cashPayment, setCashPayment] = useState(true)
  const [bankPayment, setBankPayment] = useState(true)

  const [defaultValues, setDefaultValues] = useState({
    bankname: '',
    bankaccountname: '',
    bankaccountnumber: '',
    bankroutingnumber: ''
  })

  const handleBlur = () => setFocus(undefined)

  // effect runs on component mount
  useEffect(() => {
    // simulate async api call with set timeout
    setTimeout(
      () =>
        setDefaultValues({
          bankname: shop.bank_name,
          bankaccountname: shop.bank_acc_name,
          bankaccountnumber: shop.bank_acc_no,
          bankroutingnumber: shop.bank_routing_no
        }),
      1000
    )
  }, [shop])

  // effect runs when user state is updated
  useEffect(() => {
    // reset form with user data
    reset(defaultValues)
  }, [defaultValues])

  const schema = yup.object().shape({
    // bankname: yup.string(),
    // bankaccountname: yup.string(),
    // bankaccountnumber: yup.string(),
    // bankroutingnumber: yup.string()
  })

  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data, event) => {
    event.preventDefault()
    const content = modelContent(data)
    setModalData(content)
  }

  const handleCashPayment = event => {
    setCashPayment(event.target.checked)
  }

  const handleBankPayment = event => {
    setBankPayment(event.target.checked)
  }

  return (
    <Card sx={{ mb: 6 }}>
      <CardContent>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={12} sx={{ mt: 6 }}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel sx={{ mb: 1, color: 'text.secondary' }}>Payment Method</FormLabel>
                    <FormGroup row>
                      <FormControlLabel
                        control={<Switch checked={cashPayment} onChange={handleCashPayment} />}
                        label='Cash Payment'
                      />
                      <FormControlLabel
                        control={<Switch checked={bankPayment} onChange={handleBankPayment} />}
                        label='Bank Payment'
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
                {bankPayment === true ? (
                  <Grid item xs={12}>
                    <CreditCardWrapper>
                      <Grid xs={12} container direction='row' justifyContent='center'>
                        <CardWrapper sx={{ '& .rccs': { m: '0 auto' } }}>
                          <Cards
                            cvc='cvc'
                            focused={focus}
                            expiry='Expiry'
                            name='Bank Card'
                            number='**** **** **** ****'
                          />
                        </CardWrapper>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
                          <FormControl fullWidth sx={{ mb: 4 }}>
                            <Controller
                              name='bankname'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                  autoFocus
                                  value={value}
                                  onBlur={onBlur}
                                  label='Bank Name'
                                  onChange={onChange}
                                  placeholder='Bank Name'
                                  error={Boolean(errors.bankname)}
                                />
                              )}
                            />
                            {errors.bankname && (
                              <FormHelperText sx={{ color: 'error.main' }}>{errors.bankname.message}</FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl fullWidth sx={{ mb: 4 }}>
                            <Controller
                              name='bankaccountname'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                  value={value}
                                  onBlur={onBlur}
                                  label='Bank Account Name'
                                  onChange={onChange}
                                  placeholder='Bank Account Name'
                                  error={Boolean(errors.bankaccountname)}
                                />
                              )}
                            />
                            {errors.bankaccountname && (
                              <FormHelperText sx={{ color: 'error.main' }}>
                                {errors.bankaccountname.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl fullWidth sx={{ mb: 4 }}>
                            <Controller
                              name='bankaccountnumber'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                  value={value}
                                  onBlur={onBlur}
                                  label='Bank Account Number'
                                  onChange={onChange}
                                  placeholder='Bank Account Number'
                                  error={Boolean(errors.bankaccountnumber)}
                                />
                              )}
                            />
                            {errors.bankaccountnumber && (
                              <FormHelperText sx={{ color: 'error.main' }}>
                                {errors.bankaccountnumber.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl fullWidth sx={{ mb: 4 }}>
                            <Controller
                              name='bankroutingnumber'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                  value={value}
                                  onBlur={onBlur}
                                  label='Bank Routing Number'
                                  onChange={onChange}
                                  placeholder='Bank Routing Number'
                                  error={Boolean(errors.bankroutingnumber)}
                                />
                              )}
                            />
                            {errors.bankroutingnumber && (
                              <FormHelperText sx={{ color: 'error.main' }}>
                                {errors.bankroutingnumber.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                      </Grid>
                    </CreditCardWrapper>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>

            {/* <StyledGrid item xs={12} md={4}>
            <Box
              sx={{
                p: 5,
                borderRadius: 1,
                border: theme => `1px solid ${theme.palette.divider}`
              }}
            >
              <Typography variant='h6' sx={{ mb: 4, color: 'text.secondary' }}>
                Your Current Plan
              </Typography>
              <Chip skin='light' size='small' color='primary' label='Basic Plan' />
              <Box sx={{ my: 4, display: 'flex', alignItems: 'center' }}>
                <AccountOutline sx={{ mr: 1.5 }} />
                <Typography variant='body2' sx={{ fontSize: '1rem', lineHeight: 1.5 }}>
                  5 Users
                </Typography>
              </Box>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <CloudOutline sx={{ mr: 1.5 }} />
                <Typography variant='body2' sx={{ fontSize: '1rem', lineHeight: 1.5 }}>
                  10 GB storage
                </Typography>
              </Box>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <HelpCircleOutline sx={{ mr: 1.5 }} />
                <Typography variant='body2' sx={{ fontSize: '1rem', lineHeight: 1.5 }}>
                  Basic Support
                </Typography>
              </Box>
              <Button fullWidth variant='contained'>
                Upgrade Plan
              </Button>
            </Box>
          </StyledGrid> */}

            <Grid
              container
              item
              direction='row'
              justifyContent='end'
              xs={12}
              sx={{ mt: bankPayment === true ? 3 : undefined }}
              style={{}}
            >
              <Button
                type='submit'
                variant='contained'
                sx={{ mr: 4 }}
                disabled={cashPayment === false && bankPayment === false ? 'disabled' : ''}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default TabBilling
