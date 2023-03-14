// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Third Party Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** DataDialog to show form data
import DataDialog from 'src/pages/components/data_dialog'
import CardImgTop from 'src/views/ui/cards/basic/CardImgTop'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = ({ data }) => {
  console.log('Data form db: ', data)

  // ** State
  const [openAlert, setOpenAlert] = useState(true)

  const [defaultValues, setDefaultValues] = useState({
    yourname: '',
    yourphone: '',
    newpassword: '',
    confirmpassword: ''
  })
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword] = useState('')
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [modalData, setModalData] = useState(null)

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  // effect runs on component mount
  useEffect(() => {
    // simulate async api call with set timeout
    setTimeout(
      () =>
        setDefaultValues({
          yourname: data?.name,
          yourphone: data?.phone ? data.phone : '',
          newpassword: '',
          confirmpassword: ''
        }),
      1000
    )
  }, [data])

  // effect runs when user state is updated
  useEffect(() => {
    // reset form with user data
    reset(defaultValues)
  }, [defaultValues])

  console.log('defaultvalues: ', defaultValues)

  const schema = yup.object().shape({
    yourname: yup.string().min(3).required()

    // yourphone: yup.string().min(9).required(),
    // newpassword: yup.string().min(5).required(),
    // confirmpassword: yup
    //   .string()
    //   .min(5)
    //   .required()
    //   .oneOf([yup.ref('newpassword'), null], 'Passwords must match')
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

  return (
    <Card>
      <CardContent>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sx={{ my: 5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImgStyled src={data?.avatar} alt='Profile Pic' />
                <Box>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    Upload New Photo
                    <input
                      hidden
                      type='file'
                      onChange={onChange}
                      accept='image/png, image/jpeg'
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                  <Typography sx={{ mt: 4 }} component='p' variant='caption'>
                    Allowed PNG or JPEG. Max size of 800K.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='yourname'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      value={value}
                      onBlur={onBlur}
                      label='Your Name'
                      onChange={onChange}
                      placeholder='Your Name'
                      error={Boolean(errors.yourname)}
                    />
                  )}
                />
                {errors.yourname && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.yourname.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* defaultValue='John Doe' */}
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='yourphone'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoComplete='off'
                      value={value}
                      onBlur={onBlur}
                      label='Your Phone'
                      onChange={onChange}
                      placeholder='Your Phone'
                      error={Boolean(errors.yourphone)}
                    />
                  )}
                />
                {errors.yourphone && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.yourphone.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='newpassword' error={Boolean(errors.newpassword)}>
                  New Password
                </InputLabel>
                <Controller
                  name='newpassword'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      autoComplete='off'
                      value={value}
                      label='New Password'
                      onBlur={onBlur}
                      onChange={onChange}
                      id='newpasswordId'
                      error={Boolean(errors.newpassword)}
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
                {errors.newpassword && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.newpassword.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='confirmpasswordId' error={Boolean(errors.confirmpassword)}>
                  Confirm Password
                </InputLabel>
                <Controller
                  name='confirmpassword'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      label='Confirm Password'
                      onBlur={onBlur}
                      onChange={onChange}
                      id='confirmpasswordId'
                      error={Boolean(errors.confirmpassword)}
                      type={showConfirmPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.confirmpassword && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.confirmpassword.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            {/* style={{ display: 'flex', justifyContent: 'end' }} */}
            <Grid item xs={12}>
              <Button type='submit' variant='contained' sx={{ mr: 4 }}>
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default TabAccount
