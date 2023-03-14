import { useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import SendOutline from 'mdi-material-ui/SendOutline'
import { CardHeader, FormLabel, InputAdornment, Typography } from '@mui/material'

const OptionsWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

const EditActions = () => {
  const [LSQW, setLSQW] = useState('')

  const handleOnChange = event => {
    setLSQW(event.target.value)
  }

  return (
    <>
      <Card>
        <CardHeader
          sx={{ px: '0.7rem', py: '0.7rem' }}
          title={
            <Typography variant='body1' sx={{ fontWeight: '600' }}>
              Shipping Configuration
            </Typography>
          }
        />
        <Divider sx={{ m: 0 }} />
        <CardContent sx={{ px: '0.7rem' }}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Typography sx={{ fontSize: '0.8rem', mb: 5 }}>Shipping Configuration is maintained by Admin</Typography>
            </Grid>
            <Divider sx={{ py: 0 }} />
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 4 }}>
        <CardHeader
          sx={{ px: '0.8rem', py: '0.7rem' }}
          title={
            <Typography variant='body1' sx={{ fontWeight: '600' }}>
              Low Stock Quantity Warning
            </Typography>
          }
        />
        <Divider sx={{ m: 0 }} />
        <CardContent sx={{ px: '0.8rem' }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                value={LSQW}
                onChange={handleOnChange}
                label='Quantity'
                placeholder='Quantity'
                InputProps={{ inputProps: { min: 1 }, type: 'number' }}
              />
            </FormControl>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 4 }}>
        <CardHeader
          sx={{ px: '0.8rem', py: '0.7rem' }}
          title={
            <Typography variant='body1' sx={{ fontWeight: '600' }}>
              Stock Visibility State
            </Typography>
          }
        />
        <Divider sx={{ m: 0 }} />
        <CardContent sx={{ px: '0.8rem' }}>
          <OptionsWrapper sx={{ mb: 1 }}>
            <InputLabel
              htmlFor='show-stock-quantity'
              sx={{ cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}
            >
              Show Stock Quantity
            </InputLabel>
            <Switch defaultChecked id='show-stock-quantity' />
          </OptionsWrapper>
          <OptionsWrapper sx={{ mb: 1 }}>
            <InputLabel
              htmlFor='show-stock-with-text-only'
              sx={{ cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}
            >
              Show Stock With Text Only
            </InputLabel>
            <Switch id='show-stock-with-text-only' />
          </OptionsWrapper>
          <OptionsWrapper>
            <InputLabel htmlFor='hide-stock' sx={{ cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}>
              Hide Stock
            </InputLabel>
            <Switch id='hide-stock' />
          </OptionsWrapper>
        </CardContent>
      </Card>
      <Card sx={{ mt: 4 }}>
        <CardHeader
          sx={{ px: '0.8rem', py: '0.7rem' }}
          title={
            <Typography variant='body1' sx={{ fontWeight: '600' }}>
              Cash On Delivery
            </Typography>
          }
        />
        <Divider sx={{ m: 0 }} />
        <CardContent sx={{ px: '0.8rem' }}>
          <OptionsWrapper sx={{ mb: 1 }}>
            <InputLabel
              htmlFor='cash-on-delivery'
              sx={{ cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}
            >
              Status
            </InputLabel>
            <Switch defaultChecked id='cash-on-delivery' />
          </OptionsWrapper>
        </CardContent>
      </Card>
      <Card sx={{ mt: 4 }}>
        <CardHeader
          sx={{ px: '0.8rem', py: '0.7rem' }}
          title={
            <Typography variant='body1' sx={{ fontWeight: '600' }}>
              Estimate Shipping Time
            </Typography>
          }
        />
        <Divider sx={{ m: 0 }} />
        <CardContent sx={{ px: '0.8rem' }}>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <TextField
                label='Shipping Days'
                placeholder='Shipping Days'
                InputProps={{ type: 'number', endAdornment: <InputAdornment position='end'>Days</InputAdornment> }}
              />
            </FormControl>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 4 }}>
        <CardHeader
          sx={{ px: '0.8rem', py: '0.7rem' }}
          title={
            <Typography variant='body1' sx={{ fontWeight: '600' }}>
              Vat & TAX
            </Typography>
          }
        />
        <Divider sx={{ m: 0 }} />
        <CardContent sx={{ px: '0.8rem' }}>
          <Grid item xs={12}>
            <FormLabel sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>Tax</FormLabel>
            <Box sx={{ display: 'flex' }}>
              <Grid xs={6} sx={{ mr: '0.2rem' }}>
                <FormControl fullWidth>
                  <TextField type='number' placeholder='Tax' InputProps={{ inputProps: { min: 0 }, type: 'number' }} />
                </FormControl>
              </Grid>
              <Grid xs={6} sx={{ ml: '0.2rem' }}>
                <Select placeholder='Flat' fullWidth defaultValue='Flat' sx={{ mb: 4 }}>
                  <MenuItem value='Flat'>Flat</MenuItem>
                  <MenuItem value='Percent'>Percent</MenuItem>
                </Select>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <FormLabel sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>Vat</FormLabel>
            <Box sx={{ display: 'flex' }}>
              <Grid xs={6} sx={{ mr: '0.2rem' }}>
                <FormControl fullWidth>
                  <TextField type='number' placeholder='Tax' InputProps={{ inputProps: { min: 0 }, type: 'number' }} />
                </FormControl>
              </Grid>
              <Grid xs={6} sx={{ ml: '0.2rem' }}>
                <Select placeholder='Flat' fullWidth defaultValue='Flat' sx={{ mb: 4 }}>
                  <MenuItem value='Flat'>Flat</MenuItem>
                  <MenuItem value='Percent'>Percent</MenuItem>
                </Select>
              </Grid>
            </Box>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default EditActions
