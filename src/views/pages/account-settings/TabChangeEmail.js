// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import Card from '@mui/material/Card'

import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Key from 'mdi-material-ui/Key'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** DataDialog to show form data
import DataDialog from 'src/pages/components/data_dialog'

const TabChangeEmail = ({ data }) => {
  const [defaultValues, setDefaultValues] = useState({
    email: ''
  })

  // effect runs on component mount
  useEffect(() => {
    // simulate async api call with set timeout
    setTimeout(() => setDefaultValues({ email: data.email }), 1000)
  }, [data])

  // effect runs when user state is updated
  useEffect(() => {
    // reset form with user data
    reset(defaultValues)
  }, [defaultValues])
  console.log('billing email: ', data)

  const schema = yup.object().shape({
    email: yup.string().email().required()
  })

  const {
    control,
    reset,
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
    const content = modelContent(data)
    setModalData(content)
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Grid container spacing={6}>
            <Grid
              item
              sm={6}
              xs={12}
              sx={{ display: 'flex', mt: 2.5, alignItems: 'flex-end', justifyContent: 'center' }}
            >
              <img alt='avatar' src='/images/pages/account-settings-security-illustration.png' />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mt: 5, mb: [0, 6] }}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name='email'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          type='email'
                          value={value}
                          onBlur={onBlur}
                          label='Email'
                          onChange={onChange}
                          placeholder='seller@housy.com'
                          error={Boolean(errors.email)}
                        />
                      )}
                    />
                    {errors.email && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <Button variant='outlined' sx={{ mr: 4, mb: [3, 0] }}>
                    Verify
                  </Button>
                  <Button variant='contained' color='primary'>
                    Update Email
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  )
}

export default TabChangeEmail
