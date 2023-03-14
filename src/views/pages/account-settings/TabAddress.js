// ** React Imports
import { forwardRef, useEffect, useState, Fragment } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Alert from '@mui/material/Alert'
import Table from '@mui/material/Table'
import Dialog from '@mui/material/Dialog'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import LinearProgress from '@mui/material/LinearProgress'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** DataDialog to show form data
import DataDialog from 'src/pages/components/data_dialog'

// Latest version - v3.0.0 with Tree Shaking to reduce bundle size
import { Country, State, City } from 'country-state-city'


const TabAddress = ({ data }) => {
  const { profile, shop } = data
  console.log('Shop : ', shop)

  // ** State
  const [countriesList, setCountriesList] = useState(null)
  const [stateList, setStateList] = useState(null)
  const [cityList, setCityList] = useState(null)
  const [country, setCountry] = useState('United Arab Emirates-AE')
  const [state, setState] = useState('Fujairah-FU')
  const [city, setCity] = useState('Dibba Al-Hisn')
  const [modalData, setModalData] = useState(null)
  const [openAddressCard, setOpenAddressCard] = useState(false)
  const [addressFrom, setAddressForm] = useState(false)

  // Get country list at page load
  useEffect(() => {
    getCountries()
    state !== null ? getStates() : ''
    city !== null ? getCities() : ''
  }, [])

  // Get state list of specific country when it select
  useEffect(() => {
    getStates()
  }, [country])

  // Get city list of specific state when it select
  useEffect(() => {
    getCities()
  }, [country, state])

  async function getCountries() {
    const data = await Country.getAllCountries()
    setCountriesList(data)
  }

  async function getStates() {
    const data = await State.getStatesOfCountry(country.split('-')[1])
    setStateList(data)
  }

  async function getCities() {
    const data = await City.getCitiesOfState(country.split('-')[1], state.split('-')[1])
    setCityList(data)
  }

  const handleCountryChange = event => {
    setCountry(event.target.value)
  }

  const handleStateChange = event => {
    setState(event.target.value)
  }

  const handleCityChange = event => {
    setCity(event.target.value)
  }

  const handleAddressFrom = event => {
    setAddressForm(event.target.checked)
  }

  const defaultValues = {
    address: 'Write your address here',
    country: 'United Arab Emirates-AE',
    state: 'Fujairah-FU',
    city: 'Dibba Al-Hisn',
    postalcode: '0000000',
    phone: '123456789'
  }

  const schema = yup.object().shape({
    address: yup.string().required(),
    country: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    postalcode: yup.number().required(),
    phone: yup.number().required()
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

  const onSubmit = (data, event) => {
    event.preventDefault()
    const content = modelContent(data)
  }

  const SelectDD = ({ list, value, cb, onChange, error, onBlur, label }) => {
    return (
      <>
        <Select
          label={label}
          value={value}
          onChange={e => {
            onChange(e)
            cb(e)
          }}
          onBlur={onBlur}
          error={error}
        >
          {list &&
            list.map((item, index) =>
              label === 'city' ? (
                <MenuItem key={index} value={item.name}>
                  {item.name}
                </MenuItem>
              ) : (
                <MenuItem key={index} value={`${item.name}-${item.isoCode}`}>
                  {item.name}
                </MenuItem>
              )
            )}
        </Select>
      </>
    )
  }

  return (
    <Fragment>
      {/* Address List */}
      <Card>
        <CardHeader
          title='Billing Address'
          titleTypographyProps={{ variant: 'h6' }}
          action={
            <>
              <FormControlLabel
                control={<Switch checked={addressFrom} onChange={e => handleAddressFrom(e)} />}
                label='Add New Address'
              />
              <Button variant='contained' onClick={() => setOpenAddressCard(true)}>
                Edit Address
              </Button>
            </>
          }
        />
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} lg={6}>
              <TableContainer>
                <Table size='small' sx={{ width: '95%' }}>
                  <TableBody
                    sx={{
                      '& .MuiTableCell-root': {
                        border: 0,
                        pt: 2,
                        pb: 2,
                        pl: '0 !important',
                        pr: '0 !important',
                        '&:first-of-type': {
                          width: 148
                        }
                      }
                    }}
                  >
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                          Shop Name:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>{shop.name ? shop.name : ''}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                          Billing Email:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>{shop.email ? shop.email : '----'}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                          Tax ID:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>{shop.tax_id ? shop.tax_id : '----'}</Typography>
                      </TableCell>
                    </TableRow>
                    {/* <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                          VAT Number:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>{shop.vat_no? shop.va</Typography>
                      </TableCell>
                    </TableRow> */}
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                          Billing Address:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>{shop.address}</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12} lg={6}>
              <TableContainer>
                <Table size='small'>
                  <TableBody
                    sx={{
                      '& .MuiTableCell-root': {
                        border: 0,
                        pt: 2,
                        pb: 2,
                        pl: '0 !important',
                        pr: '0 !important',
                        '&:first-of-type': {
                          width: 148
                        }
                      }
                    }}
                  >
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                          Contact:
                        </Typography>
                      </TableCell>
                      <TableCell>{shop.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                          Country:
                        </Typography>
                      </TableCell>
                      <TableCell>{shop.country ? shop.country : '----'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                          State:
                        </Typography>
                      </TableCell>
                      <TableCell>{shop.state ? shop.state : '----'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                          Zip Code:
                        </Typography>
                      </TableCell>
                      <TableCell>{shop.zip_code ? shop.zip_code : '----'}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>

        <Dialog
          open={openAddressCard}
          onClose={() => setOpenAddressCard(false)}
          aria-labelledby='user-address-edit'
          sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
          aria-describedby='user-address-edit-description'
        >
          <DialogTitle id='user-address-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
            Edit Address
          </DialogTitle>
          <DialogContent>
            <DialogContentText variant='body2' id='user-address-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
              Edit Address for future billing
            </DialogContentText>
            <form>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='Pixinvent' label='Company Name' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type='email' size='small' defaultValue='gertrude@gmail.com' label='Email' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='TAX-875623' label='Tax ID' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='SDF754K77' label='VAT Number' />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    size='small'
                    label='Billing Address'
                    defaultValue='100 Water Plant Avenue, Building 1303 Wake Island'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='+1(609) 933-44-22' label='Contact' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl size='small' fullWidth>
                    <InputLabel id='country-select'>Country</InputLabel>
                    <Select labelId='country-select' defaultValue='usa' label='Country'>
                      <MenuItem value='usa'>USA</MenuItem>
                      <MenuItem value='uk'>UK</MenuItem>
                      <MenuItem value='france'>France</MenuItem>
                      <MenuItem value='germany'>Germany</MenuItem>
                      <MenuItem value='japan'>Japan</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='Capholim' label='State' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type='number' size='small' defaultValue='403114' label='Zip Code' />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button variant='contained' sx={{ mr: 1 }} onClick={() => setOpenAddressCard(false)}>
              Submit
            </Button>
            <Button variant='outlined' color='secondary' onClick={() => setOpenAddressCard(false)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Card>

      {/* Address From */}
      {addressFrom === true ? (
        <Card sx={{ mt: 6 }}>
          <CardHeader title='Add New Address' titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            {!!modalData && <DataDialog setModalData={setModalData} modalData={modalData} />}
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={6}>
                <Grid item xs={12} sx={{ mt: 5 }}>
                  <FormControl fullWidth>
                    <Controller
                      name='address'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          multiline
                          minRows={3}
                          value={value}
                          onBlur={onBlur}
                          label='Address'
                          onChange={onChange}
                          placeholder='Write here your address'
                          error={Boolean(errors.address)}
                        />
                      )}
                    />
                    {errors.address && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.address.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Controller
                      name='country'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <SelectDD
                          list={countriesList}
                          value={value}
                          cb={e => handleCountryChange(e)}
                          onChange={onChange}
                          onBlur={onBlur}
                          error={Boolean(errors.country)}
                          label='country'
                        />
                      )}
                    />
                    {errors.country && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.country.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>State</InputLabel>
                    <Controller
                      name='state'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <SelectDD
                          list={stateList}
                          value={value}
                          cb={e => handleStateChange(e)}
                          onChange={onChange}
                          onBlur={onBlur}
                          error={Boolean(errors.state)}
                          label='state'
                        />
                      )}
                    />
                    {errors.state && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.state.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>City</InputLabel>
                    <Controller
                      name='city'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <SelectDD
                          list={cityList}
                          value={value}
                          cb={e => handleCityChange(e)}
                          onChange={onChange}
                          onBlur={onBlur}
                          error={Boolean(errors.city)}
                          label='city'
                        />
                      )}
                    />
                    {errors.city && <FormHelperText sx={{ color: 'error.main' }}>{errors.city.message}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='postalcode'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          type='number'
                          value={value}
                          onBlur={onBlur}
                          label='Postal Code'
                          onChange={onChange}
                          placeholder='Your postal code'
                          error={Boolean(errors.postalcode)}
                        />
                      )}
                    />
                    {errors.postalcode && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.postalcode.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='phone'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          type='number'
                          value={value}
                          onBlur={onBlur}
                          label='Phone'
                          onChange={onChange}
                          placeholder='(123) 456-7890'
                          error={Boolean(errors.phone)}
                        />
                      )}
                    />
                    {errors.phone && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.phone.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid
                  item
                  container
                  justifyContent='end'
                  xs={12}
                  sx={{ pt: theme => `${theme.spacing(7)} !important` }}
                >
                  <Button type='submit' variant='contained' sx={{ px: 8 }}>
                    Add
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      ) : (
        ''
      )}
    </Fragment>
  )
}

export default TabAddress
