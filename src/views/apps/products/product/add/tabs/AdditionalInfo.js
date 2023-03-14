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
import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('src/views/apps/products/shared-component/Editor'), {ssr: false})


// ** Store & Actions Imports
import {useDispatch, useSelector} from 'react-redux'
import {allList} from 'src/store/apps/lists'

const AdditionalInfo = ({value, setValue, setFormData, formData}) => {
  const {productType} = useSelector(state => state.lists)

  // ** State
  const [producttype, setProductType] = useState('')
  const [isEnabledStockManagementSP, setIsEnableStockManagementSP] = useState(false)
  const [isEnabledStockManagementVP, setIsEnableStockManagementVP] = useState(false)
  const [stockManagementType, setStockManagementType] = useState('')
  const [EData, setEData] = useState('')

  let [defaultValues, setDefaultValues] = useState({
    pro_input_description: '',
    product_type: '',
    variant_stock_level_type: '',
    variants_ids: [],
    variant_price: '',
    variant_special_price: '',
    variant_images: [],
    sku_variant_type: '',
    total_stock_variant_type: '',
    variant_status: '',
    variant_sku: '',
    variant_total_stock: '',
    variant_level_stock_status: '',
    simple_product_stock_status: '',
    simple_price: '',
    simple_special_price: '',
    product_sku: '',
    product_total_stock: '',
    variant_stock_status: '',
  })

  useEffect(() => {
    setEData(formData.pro_input_description)
    setProductType(formData.product_type)
    setIsEnableStockManagementSP(formData.enablestockmanagement)
    reset(formData)
  }, [])

  console.log("Edata", EData)

  const onSubmit = (data, event) => {
    event.preventDefault()
    let newData = {...data, pro_input_description: EData}
    setFormData(prevState => ({...prevState, ...newData}))
    setValue(value + 1)
  }


  const handleEditorData = (data) => {
    setEData(data)
  }

  const schema = yup.object().shape({
    pro_input_name: yup.string().required(),
    category_id: yup.string().required(),
    short_description: yup.string().required(),
    deliverable_type: yup.string().required(),
    deliverable_zipcodes: yup.string().required(),
  })

  const {
    control, setError, reset, handleSubmit, formState: {errors}
  } = useForm({
    defaultValues, mode: 'onBlur', resolver: yupResolver(schema)
  })


  const SimpleProduct = () => {
    return (
      <>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='simple_price'
              control={control}
              rules={{required: true}}
              render={({field: {value, onChange, onBlur}}) => (<TextField
                type='number'
                InputProps={{inputProps: {min: 0,}}}
                value={value}
                onBlur={onBlur}
                label='Price'
                onChange={onChange}
                placeholder='Price'
                error={Boolean(errors.simple_price)}
              />)}
            />
            {errors.simple_price && (
              <FormHelperText sx={{color: 'error.main'}}>{errors.simple_price.message}</FormHelperText>)}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='simple_special_price'
              control={control}
              rules={{required: true}}
              render={({field: {value, onChange, onBlur}}) => (<TextField
                type='number'
                InputProps={{inputProps: {min: 1,}}}
                value={value}
                onBlur={onBlur}
                label='Special Price'
                onChange={onChange}
                placeholder='Special Price'
                error={Boolean(errors.simple_special_price)}
              />)}
            />
            {errors.simple_special_price && (
              <FormHelperText sx={{color: 'error.main'}}>{errors.simple_special_price.message}</FormHelperText>)}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Controller
              name='enablestockmanagement'
              control={control}
              rules={{required: true}}
              render={({field: {value, onChange, onBlur}}) => (
                <FormControlLabel
                  sx={{display: 'flex', justifyContent: 'start', m: 0}}
                  labelPlacement='start'
                  label={
                    <Typography sx={{fontSize: '0.8rem', mr: 4}} color='textSecondary'>
                      Enable Stock Management
                    </Typography>
                  }
                  control={
                    <Switch
                      checked={isEnabledStockManagementSP}
                      onBlur={onBlur}
                      onChange={(e) => {
                        onChange(e)
                        setIsEnableStockManagementSP(e.target.checked)
                      }}
                      error={Boolean(errors.enablestockmanagement)}
                    />
                  }
                />
              )}
            />
            {errors.enablestockmanagement && (
              <FormHelperText sx={{color: 'error.main'}}>{errors.enablestockmanagement.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        {
          isEnabledStockManagementSP &&
          <>
            <Grid item xs={12} lg={4}>
              <FormControl fullWidth>
                <Controller
                  name='product_sku'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange, onBlur}}) => (<TextField
                    type='text'
                    value={value}
                    onBlur={onBlur}
                    label='SKU'
                    onChange={onChange}
                    placeholder='SKU'
                    error={Boolean(errors.product_sku)}
                  />)}
                />
                {errors.product_sku && (
                  <FormHelperText sx={{color: 'error.main'}}>{errors.product_sku.message}</FormHelperText>)}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <FormControl fullWidth>
                <Controller
                  name='product_total_stock'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange, onBlur}}) => (<TextField
                    type='number'
                    InputProps={{inputProps: {min: 0,}}}
                    value={value}
                    onBlur={onBlur}
                    label='Total Stock'
                    onChange={onChange}
                    placeholder='Total Stock'
                    error={Boolean(errors.product_total_stock)}
                  />)}
                />
                {errors.product_total_stock && (
                  <FormHelperText sx={{color: 'error.main'}}>{errors.product_total_stock.message}</FormHelperText>)}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <FormControl fullWidth>
                <InputLabel>Stock Status</InputLabel>
                <Controller
                  name='simple_product_stock_status'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange, onBlur}}) => (
                    <Select label={'Stock Status'} value={value} onChange={onChange} onBlur={onBlur}
                            error={Boolean(errors.simple_product_stock_status)}>
                      <MenuItem value={''} disabled>Select Stock Status</MenuItem>
                      <MenuItem value={0}>In Stock</MenuItem>
                      <MenuItem value={1}>Out Of Stock</MenuItem>
                    </Select>
                  )}
                />
                {errors.simple_product_stock_status && (
                  <FormHelperText
                    sx={{color: 'error.main'}}>{errors.simple_product_stock_status.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </>
        }
      </>)
  }

  const VariableProduct = () => {
    return (<>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Controller
              name='enablestockmanagementvp'
              control={control}
              rules={{required: true}}
              render={({field: {value, onChange, onBlur}}) => (
                <FormControlLabel
                  sx={{display: 'flex', justifyContent: 'start', m: 0}}
                  labelPlacement='start'
                  label={
                    <Typography sx={{fontSize: '0.8rem', mr: 4}} color='textSecondary'>
                      Enable Stock Management
                    </Typography>
                  }
                  control={
                    <Switch
                      checked={isEnabledStockManagementVP}
                      onBlur={onBlur}
                      onChange={(e) => {
                        onChange(e)
                        setIsEnableStockManagementVP(e.target.checked)
                      }}
                      error={Boolean(errors.enablestockmanagementvp)}
                    />
                  }
                />
              )}
            />
            {errors.enablestockmanagementvp && (
              <FormHelperText sx={{color: 'error.main'}}>{errors.enablestockmanagementvp.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        {
          isEnabledStockManagementVP &&
          <>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Choose Stock Management Type</InputLabel>
                <Controller
                  name='stockmanagmenttype'
                  control={control}
                  rules={{required: true}}
                  render={({field: {value, onChange, onBlur}}) => (
                    <Select label={'Choose Stock Management Type'} value={value} onChange={(e) => {
                      onChange(e)
                      setStockManagementType(e.target.value)
                    }} onBlur={onBlur}
                            error={Boolean(errors.stockmanagementtype)}>
                      <MenuItem value={''} disabled>Select Stock Type</MenuItem>
                      <MenuItem value={0}>Product Level (Stock Will Be Managed Generally )</MenuItem>
                      <MenuItem value={1}>Variable Level (Stock Will Be Managed Variant Wise)</MenuItem>
                    </Select>
                  )}
                />
                {errors.stockmanagementtype &&
                  <FormHelperText sx={{color: 'error.main'}}>{errors.stockmanagementtype.message}</FormHelperText>}
              </FormControl>
            </Grid>
            {
              stockManagementType === 0 ? <>
                <Grid item xs={12} lg={4}>
                  <FormControl fullWidth>
                    <Controller
                      name='variant_sku'
                      control={control}
                      rules={{required: true}}
                      render={({field: {value, onChange, onBlur}}) => (<TextField
                        type='text'
                        value={value}
                        onBlur={onBlur}
                        label='SKU'
                        onChange={onChange}
                        placeholder='SKU'
                        error={Boolean(errors.variant_sku)}
                      />)}
                    />
                    {errors.variant_sku && (
                      <FormHelperText sx={{color: 'error.main'}}>{errors.variant_sku.message}</FormHelperText>)}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <FormControl fullWidth>
                    <Controller
                      name='variant_total_stock'
                      control={control}
                      rules={{required: true}}
                      render={({field: {value, onChange, onBlur}}) => (<TextField
                        type='number'
                        InputProps={{inputProps: {min: 0,}}}
                        value={value}
                        onBlur={onBlur}
                        label='Total Stock'
                        onChange={onChange}
                        placeholder='Total Stock'
                        error={Boolean(errors.variant_total_stock)}
                      />)}
                    />
                    {errors.variant_total_stock && (
                      <FormHelperText sx={{color: 'error.main'}}>{errors.variant_total_stock.message}</FormHelperText>)}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <FormControl fullWidth>
                    <InputLabel>Stock Status</InputLabel>
                    <Controller
                      name='variant_level_stock_status'
                      control={control}
                      rules={{required: true}}
                      render={({field: {value, onChange, onBlur}}) => (
                        <Select label={'Stock Status'} value={value} onChange={onChange} onBlur={onBlur}
                                error={Boolean(errors.variant_level_stock_status)}>
                          <MenuItem value={''} disabled>Select Stock Status</MenuItem>
                          <MenuItem value={0}>In Stock</MenuItem>
                          <MenuItem value={1}>Out Of Stock</MenuItem>
                        </Select>
                      )}
                    />
                    {errors.variant_level_stock_status && (
                      <FormHelperText
                        sx={{color: 'error.main'}}>{errors.variant_level_stock_status.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </> : ''
            }

          </>
        }</>
    )
  }

  const SelectDD = ({list, value, onChange, error, onBlur, label}) => {
    return (<>
      <Select label={label} value={value} onChange={onChange} onBlur={onBlur} error={error}>
        <MenuItem value={''} disabled>{`Select ${label}`}</MenuItem>
        {list && list.map((item, index) => (<MenuItem key={index} value={item.value}>
          {item.name}
        </MenuItem>))}
      </Select>
    </>)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography variant='body1' sx={{}}>
              Description
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{}}>
            <Editor value={EData} onChange={(data) => handleEditorData(data)}/>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{mb: 0}}/>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' sx={{}}>
              General
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Type Of Product *</InputLabel>
              <Controller
                name='product_type'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}}) => (
                  <SelectDD
                    list={productType}
                    value={value}
                    onChange={(e) => {
                      onChange(e)
                      setProductType(e.target.value)
                      console.log(e.target.value)
                    }}
                    onBlur={onBlur}
                    error={Boolean(errors.product_type)}
                    label='Type Of Product *'
                  />)}
              />
              {errors.product_type &&
                <FormHelperText sx={{color: 'error.main'}}>{errors.product_type.message}</FormHelperText>}
            </FormControl>
          </Grid>
          {
            producttype === 'simple_product'
              ? SimpleProduct()
              : producttype === 'variable_product'
                ? VariableProduct() : ''
          }

        </Grid>
      </CardContent>
      <Divider sx={{m: 0}}/>
      <CardActions>
        <Button size='large' sx={{mr: 2}} color='secondary' variant='outlined' onClick={() => setValue(value - 1)}>
          Back
        </Button>
        <Button type='submit' size='large' variant='contained'>
          Next
        </Button>
      </CardActions>
    </form>)
}

export default AdditionalInfo
