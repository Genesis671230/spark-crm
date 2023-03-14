// ** React Imports
import {useState, useEffect} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import {styled} from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'

import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm, Controller} from 'react-hook-form'

// ** DataDialog to show form data
import DataDialog from 'src/pages/components/data_dialog'
import CardImgTop from 'src/views/ui/cards/basic/CardImgTop'
import UploadMultipleFiles from 'src/views/apps/products/shared-component/UploadMultipleFiles'
import UploadSingleFile from 'src/views/apps/products/shared-component/UploadSingleFile'

// import Editor from '../shared-component/Editor'
import DateRangePicker from 'src/views/apps/products/shared-component/DateRangePicker'
import {ConsoleLogger} from '@aws-amplify/core'
import dynamic from 'next/dynamic'

// ** Store & Actions Imports
import {useDispatch, useSelector} from 'react-redux'
import {allList} from 'src/store/apps/lists'

// const ImgStyled = styled('img')(({ theme }) => ({
//   width: 120,
//   height: 120,
//   marginRight: theme.spacing(5),
//   borderRadius: theme.shape.borderRadius
// }))

// const ButtonStyled = styled(Button)(({ theme }) => ({
//   [theme.breakpoints.down('sm')]: {
//     width: '100%',
//     textAlign: 'center'
//   }
// }))

// const ResetButtonStyled = styled(Button)(({ theme }) => ({
//   marginLeft: theme.spacing(4),
//   [theme.breakpoints.down('sm')]: {
//     width: '100%',
//     marginLeft: 0,
//     textAlign: 'center',
//     marginTop: theme.spacing(4)
//   }
// }))

const General = ({value, setValue, setFormData, formData}) => {
  const dispatch = useDispatch()
  const {categories, countries, indicator, deliverableType} = useSelector(state => state.lists)

  // ** State
  const [tags, setTags] = useState([])
  const [input, setInput] = useState('')
  const [warrantyPeriod, setWarrantyPeriod] = useState('')
  const [guaranteePeriod, setGuaranteePeriod] = useState('')

  const [deliverableValue, setDeliverableValue] = useState('0')

  let [defaultValues, setDefaultValues] = useState({
    pro_input_name: '',
    category_id: '',
    short_description: '',
    tags: [],
    pro_input_tax: '',
    indicator: '',
    made_in: '',
    total_allowed_quantity: '',
    minimum_order_quantity: '',
    quantity_step_size: '',
    warranty_period: '',
    guarantee_period: '',
    deliverable_type: '',
    deliverable_zipcodes: '',
    is_prices_inclusive_tax: '',
    cod_allowed: '',
    is_returnable: '',
    is_cancelable: '',

  })

  useEffect(() => {
    dispatch(allList())
    setTags(formData.tags)
    setWarrantyPeriod(formData.warranty_period)
    setGuaranteePeriod(formData.guarantee_period)
    reset(formData)
  }, [dispatch])

  const onSubmit = (data, event) => {
    event.preventDefault()
    console.log("General: ", data)
    let newData = {...data, tags, warranty_period: warrantyPeriod, guarantee_period: guaranteePeriod}
    setFormData(prevState => ({...prevState, ...newData}))
    console.log("onSubmit :", newData)
    setValue(value + 1)
  }

  const schema = yup.object().shape({
    // pro_input_name: yup.string().required(),
    // category_id: yup.string().required(),
    // short_description: yup.string().required(),
    // deliverable_type: yup.string().required(),
    // deliverable_zipcodes: yup.string().required(),
  })

  const {
    control, setError, reset, handleSubmit, formState: {errors}
  } = useForm({
    defaultValues, mode: 'onBlur', resolver: yupResolver(schema)
  })

  const handleTagOnChange = e => {
    const {value} = e.target
    setInput(value)
  }

  const handleDelete = tagToDelete => () => {
    setTags(tags => tags.filter((tag, index) => index !== tagToDelete))
  }

  const onKeyDown = e => {
    // console.log('Key: ', e.key)
    const {key} = e
    const trimmedInput = input.trim()

    if (key === 'Enter' && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault()
      setTags(prevState => [...prevState, trimmedInput])
      setInput('')
    }
  }

  const SelectDD = ({list, value, onChange, error, onBlur, label}) => {
    return (<>
        <Select label={label} value={value} onChange={onChange} onBlur={onBlur} error={error}>
          <MenuItem value={''} disabled>{`Select ${label}`}</MenuItem>
          {list && list.map((item, index) => (
            <MenuItem key={index} value={label === 'Category' ? `${item.id}` : `${item.value}`}>
              {item.name}
            </MenuItem>))}
        </Select>
      </>)
  }

  const SelectCountry = ({list, value, onChange, error, onBlur, label}) => {
    return (<>
        <Select label={label} value={value} onChange={onChange} onBlur={onBlur} error={error}>
          <MenuItem value={''} disabled>{`Select ${label}`} Country</MenuItem>
          {list && list.map((item, index) => (
            <MenuItem sx={{py: 2,}} key={index} value={`${item.isoCode}-${item.name}`}>
              <Box sx={{width: '100%', display: 'flex'}}>
                <Box sx={{mr: 3}}>{item.flag}</Box>
                <Box>{item.name}</Box>
              </Box>

            </MenuItem>))}
        </Select>
      </>)
  }

  return (<form onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='pro_input_name'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}}) => (<TextField
                    autoFocus
                    value={value}
                    onBlur={onBlur}
                    label='Product Name *'
                    onChange={onChange}
                    placeholder='Product Name'
                    error={Boolean(errors.pro_input_name)}
                  />)}
              />
              {errors.pro_input_name && (
                <FormHelperText sx={{color: 'error.main'}}>{errors.pro_input_name.message}</FormHelperText>)}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel required={true}>Category</InputLabel>
              <Controller
                name='category_id'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}}) => (<SelectDD
                    list={categories}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors.category_id)}
                    label='Category'
                  />)}
              />
              {errors.category_id && (
                <FormHelperText sx={{color: 'error.main'}}>{errors.category_id.message}</FormHelperText>)}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Controller
                name='short_description'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}}) => (<TextField
                    multiline
                    minRows={3}
                    maxRows={5}
                    value={value}
                    onBlur={onBlur}
                    label='Short Description *'
                    onChange={onChange}
                    placeholder='Short description'
                    error={Boolean(errors.short_description)}
                  />)}
              />
              {errors.short_description && (
                <FormHelperText sx={{color: 'error.main'}}>{errors.short_description.message}</FormHelperText>)}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormLabel sx={{fontSize: '0.8rem', color: 'text.secondary'}}>
              Tags <span>( These tags help you in search result )</span>
            </FormLabel>
            <Box
              border={1}
              borderColor='#E6E6E9'
              sx={{
                mt: 1, display: 'flex', flexFlow: 'wrap', alignItems: 'center', padding: '1rem', borderRadius: '0.4rem'
              }}
            >
              {tags && tags.map((tag, index) => (
                <Chip sx={{mr: 2, mb: 2}} key={index} label={tag} onDelete={handleDelete(index)}/>))}
              <FormControl fullWidth>
                <Controller
                  name='tags'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange, onBlur}}) => (<TextField
                      variant='standard'
                      value={input}
                      onKeyDown={onKeyDown}
                      onBlur={onBlur}
                      onChange={((e) => {
                        onChange(e), handleTagOnChange(e)
                      })}
                      placeholder='Type to add a tag'
                      InputProps={{disableUnderline: true}}
                      error={Boolean(errors.tags)}
                    />)}
                />
                {errors.tags && <FormHelperText sx={{color: 'error.main'}}>{errors.tags.message}</FormHelperText>}
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider/>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Tax</InputLabel>
              <Controller
                name='pro_input_tax'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}}) => (<SelectDD
                    list={[]}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors.pro_input_tax)}
                    label='Tax'
                  />)}
              />
              {errors.pro_input_tax &&
                <FormHelperText sx={{color: 'error.main'}}>{errors.pro_input_tax.message}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Indicator</InputLabel>
              <Controller
                name='indicator'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}}) => (<SelectDD
                    list={indicator}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors.indicator)}
                    label='Indicator'
                  />)}
              />
              {errors.indicator && (
                <FormHelperText sx={{color: 'error.main'}}>{errors.indicator.message}</FormHelperText>)}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Made In</InputLabel>
              <Controller
                name='made_in'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}}) => (<SelectCountry
                    list={countries}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors.made_in)}
                    label='Made In'
                  />)}
              />
              {errors.made_in && <FormHelperText sx={{color: 'error.main'}}>{errors.made_in.message}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name='total_allowed_quantity'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}}) => (<TextField
                    type='number'
                    InputProps={{inputProps: {min: 1,}}}
                    value={value}
                    onBlur={onBlur}
                    label='Total Allowed Quantity'
                    onChange={onChange}
                    placeholder='Total Allowed Quantity'
                    error={Boolean(errors.total_allowed_quantity)}
                  />)}
              />
              {errors.total_allowed_quantity && (
                <FormHelperText sx={{color: 'error.main'}}>{errors.total_allowed_quantity.message}</FormHelperText>)}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name='minimum_order_quantity'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}}) => (<TextField
                    type='number'
                    InputProps={{inputProps: {min: 1,}}}
                    value={value}
                    onBlur={onBlur}
                    label='Minimum Order Quantity'
                    onChange={onChange}
                    placeholder='Minimum Order Quantity'
                    error={Boolean(errors.minimum_order_quantity)}
                  />)}
              />
              {errors.minimum_order_quantity && (
                <FormHelperText sx={{color: 'error.main'}}>{errors.minimum_order_quantity.message}</FormHelperText>)}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name='quantity_step_size'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}}) => (<TextField
                    type='number'
                    InputProps={{inputProps: {min: 1,}}}
                    value={value}
                    onBlur={onBlur}
                    label='Quantity Step Size'
                    onChange={onChange}
                    placeholder='Quantity Step Size'
                    error={Boolean(errors.quantity_step_size)}
                  />)}
              />
              {errors.quantity_step_size && (
                <FormHelperText sx={{color: 'error.main'}}>{errors.quantity_step_size.message}</FormHelperText>)}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Divider/>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='warranty_period'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}}) => (
                  <DateRangePicker label={'Warranty Period'} warrantyPeriod={warrantyPeriod}
                                   setWarrantyPeriod={setWarrantyPeriod}/>)}
              />
              {/*setWarrantyPeriod={setWarrantyPeriod}*/}
              {errors.warranty_period && (
                <FormHelperText sx={{color: 'error.main'}}>{errors.warranty_period.message}</FormHelperText>)}

            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='guarantee_period'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}}) => (
                  <DateRangePicker label={'Guarantee Period'} guaranteePeriod={guaranteePeriod}
                                   setGuaranteePeriod={setGuaranteePeriod}/>)}
              />
              {errors.warranty_period && (
                <FormHelperText sx={{color: 'error.main'}}>{errors.warranty_period.message}</FormHelperText>)}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Deliverable Type</InputLabel>
              <Controller
                name='deliverable_type'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}}) => (<SelectDD
                    list={deliverableType}
                    value={value}
                    onChange={(e) => {
                      onChange(e)
                      console.log("deliverType: ", e.target.value)
                      setDeliverableValue(e.target.value)
                    }}
                    onBlur={onBlur}
                    error={Boolean(errors.deliverable_type)}
                    label='Deliverable Type'
                  />)}
              />
              {errors.deliverable_type && (
                <FormHelperText sx={{color: 'error.main'}}>{errors.deliverable_type.message}</FormHelperText>)}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='deliverable_zipcodes'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}}) => (<TextField
                    disabled={deliverableValue <= 1}
                    value={value}
                    onBlur={onBlur}
                    label='Deliverable Zipcodes'
                    onChange={onChange}
                    placeholder='Deliverable Zipcodes'
                    error={Boolean(errors.deliverable_zipcodes)}
                  />)}
              />
              {errors.deliverable_zipcodes && (
                <FormHelperText sx={{color: 'error.main'}}>{errors.deliverable_zipcodes.message}</FormHelperText>)}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Divider/>
          </Grid>

          <Grid item xs={6} sm={3}>
            <FormControl fullWidth>
              <Controller
                name='is_prices_inclusive_tax'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}}) => (<FormControlLabel
                    sx={{display: 'flex', justifyContent: 'start', margin: 0}}
                    labelPlacement='start'
                    label={<Typography sx={{fontSize: '0.8rem'}} color='textSecondary'>
                      Tax included in prices?
                    </Typography>}
                    control={<Switch
                      checked={value}
                      onBlur={onBlur}
                      onChange={e => {
                        onChange(e)

                        // setTax(e.target.checked)
                      }}
                      error={Boolean(errors.is_prices_inclusive_tax)}
                    />}
                  />)}
              />
              {errors.is_prices_inclusive_tax && (
                <FormHelperText sx={{color: 'error.main'}}>{errors.is_prices_inclusive_tax.message}</FormHelperText>)}
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormControl fullWidth>
              <Controller
                name='cod_allowed'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}}) => (<FormControlLabel
                    sx={{display: 'flex', justifyContent: 'start', margin: 0}}
                    labelPlacement='start'
                    label={<Typography sx={{fontSize: '0.8rem'}} color='textSecondary'>
                      Is COD allowed?
                    </Typography>}
                    control={<Switch
                      checked={value}
                      onBlur={onBlur}
                      onChange={e => {
                        onChange(e);

                        // setCod_allowed(e.target.checked);
                      }}
                      error={Boolean(errors.cod_allowed)}
                    />}
                  />)}
              />
              {errors.cod_allowed && (
                <FormHelperText sx={{color: 'error.main'}}>{errors.cod_allowed.message}</FormHelperText>)}
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormControl fullWidth>
              <Controller
                name='is_returnable'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}}) => (<FormControlLabel
                    sx={{display: 'flex', justifyContent: 'start', margin: 0}}
                    labelPlacement='start'
                    label={<Typography sx={{fontSize: '0.8rem'}} color='textSecondary'>
                      IS Returnable ?
                    </Typography>}
                    control={<Switch
                      checked={value}
                      onBlur={onBlur}
                      onChange={(e) => {
                        onChange(e)

                        // setIsReturnable(e.target.checked)
                      }}
                      error={Boolean(errors.is_returnable)}
                    />}
                  />)}
              />
              {errors.is_returnable && (
                <FormHelperText sx={{color: 'error.main'}}>{errors.is_returnable.message}</FormHelperText>)}
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormControl fullWidth>
              <Controller
                name='is_cancelable'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}}) => (<FormControlLabel
                    sx={{display: 'flex', justifyContent: 'start', margin: 0}}
                    labelPlacement='start'
                    label={<Typography sx={{fontSize: '0.8rem'}} color='textSecondary'>
                      Is Cancelable ?
                    </Typography>}
                    control={<Switch
                      checked={value}
                      onBlur={onBlur}
                      onChange={(e) => {
                        onChange(e)

                        // setIsCancelable(e.target.checked)
                      }}
                      error={Boolean(errors.is_cancelable)}
                    />}
                  />)}
              />
              {errors.is_cancelable && (
                <FormHelperText sx={{color: 'error.main'}}>{errors.is_cancelable.message}</FormHelperText>)}
            </FormControl>
          </Grid>

        </Grid>
      </CardContent>
      <Divider sx={{m: 0}}/>
      <CardActions>
        <Button size='large' sx={{mr: 2}} color='secondary' variant='outlined' disabled>
          Back
        </Button>
        <Button type='submit' size='large' variant='contained'>
          Next
        </Button>
      </CardActions>
    </form>)
}

export default General
