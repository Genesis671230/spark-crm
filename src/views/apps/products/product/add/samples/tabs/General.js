// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
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
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** DataDialog to show form data
import DataDialog from 'src/pages/components/data_dialog'
import CardImgTop from 'src/views/ui/cards/basic/CardImgTop'
import UploadMultipleFiles from 'src/views/apps/products/shared-component/UploadMultipleFiles'
import UploadSingleFile from 'src/views/apps/products/shared-component/UploadSingleFile'

// import Editor from '../shared-component/Editor'
import DateRangePicker from 'src/views/apps/products/shared-component/DateRangePicker'
import { ConsoleLogger } from '@aws-amplify/core'
import dynamic from 'next/dynamic'

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

const General = ({ setValue }) => {
  // ** State
  const [refundable, setRefundable] = useState(true)
  const [tags, setTags] = useState(['New', 'old', 'current'])
  const [input, setInput] = useState('')
  const [colors, setColors] = useState([])
  const [attributes, setAttributes] = useState([])
  const [attributesValues, setAttributesValues] = useState({ Size: [], Fabric: [], Sleeve: [], Wheel: [], Liter: [] })
  const [EData, setEData] = useState('')

  const defaultValues = {
    productname: 'XYZ',
    category: 59,
    brand: 1,
    unit: 'pc',
    weight: 10,
    minimumpurchaseqty: 2,
    tags: [''],
    barcode: 'xxxxxxxxxx',
    refundable: true
  }

  const schema = yup.object().shape({
    productname: yup.string().min(3).required(),
    category: yup.number().required(),
    newpassword: yup.string().min(5).required(),
    confirmpassword: yup
      .string()
      .min(5)
      .required()
      .oneOf([yup.ref('newpassword'), null], 'Passwords must match')
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

  const handleRefundable = event => {
    setRefundable(event.target.checked)
  }

  const handleTagOnChange = e => {
    const { value } = e.target
    setInput(value)
  }

  const handleDelete = tagToDelete => () => {
    setTags(tags => tags.filter((tag, index) => index !== tagToDelete))
  }

  const onKeyDown = e => {
    // console.log('Key: ', e.key)
    const { key } = e
    const trimmedInput = input.trim()

    if (key === 'Enter' && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault()
      setTags(prevState => [...prevState, trimmedInput])
      setInput('')
    }
  }

  const handleColorSwitch = e => {
    setColorSwitch(e.target.checked)
  }

  const handleColors = e => {
    // console.log('Options: ', e.target.value)
    setColors(e.target.value)
  }

  const handleAttributs = e => {
    setAttributes(e.target.value)
  }

  const findColorName = () => {
    const isAvailable = colorsList.find(color => color.code === colors[0])

    return isAvailable ? isAvailable.name : ''
  }

  const onSubmit = (data, event) => {
    event.preventDefault()
    const content = modelContent(data)
    setModalData(content)
  }

  const colorsList = [
    {
      name: 'AlicBlue',

      code: '#F0F8FF'
    },
    {
      name: 'Amethyst',

      code: '#9966CC'
    },
    {
      name: 'AntiqueWhite',

      code: '#FAEBD7'
    },
    {
      name: 'Aqua',

      code: '#00FFFF'
    },
    {
      name: 'Aquamarine',

      code: '#7FFFD4'
    }
  ]

  const attributesList = ['Size', 'Fabric', 'Sleeve', 'Wheel', 'Liter']

  const videoProviderList = [
    {
      name: 'Youtube',
      value: 'Youtube'
    },
    {
      name: 'Dailymotion',
      value: 'Dalimotion'
    },
    {
      name: 'Vimeo',
      value: 'Vimeo'
    }
  ]

  const categoryList = [
    {
      name: 'Party Dress',
      value: '59'
    },
    {
      name: 'Wedding Dresses',
      value: '64'
    },
    {
      name: 'Skirts',
      value: '68'
    },
    {
      name: 'T-shirts',
      value: '70'
    },
    {
      name: 'Tops & sets',
      value: '71'
    },
    {
      name: 'Accessories',
      value: '72'
    }
  ]

  const brandList = [
    {
      name: 'Ford',
      value: '1'
    },
    {
      name: 'Chevrolet',
      value: '2'
    },
    {
      name: 'Audi',
      value: '3'
    },
    {
      name: 'Hyundai',
      value: '4'
    },
    {
      name: 'Nissan',
      value: '5'
    },
    {
      name: 'BMW',
      value: '6'
    }
  ]

  const SelectDD = ({ list, value, onChange, error, onBlur, label }) => {
    return (
      <>
        <Select
          label={label}
          value={value}
          onChange={e => {
            onChange(e)
          }}
          onBlur={onBlur}
          error={error}
        >
          <MenuItem value='' disabled>{`Select ${label}`}</MenuItem>
          {list &&
            list.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </>
    )
  }

  const ColorsSelect = ({ list, value, onChange, label }) => {
    const ColorBox = props => {
      return <Box sx={{ width: '3rem', height: '1rem', backgroundColor: props.bgColor, marginRight: '0.5rem' }} />
    }

    return (
      <>
        <Select
          multiple
          name='colors'
          label={label}
          value={value}
          MenuProps
          onChange={e => {
            onChange(e)
          }}
          renderValue={() =>
            colors.length === 1 ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ColorBox bgColor={colors[0]} />
                {findColorName()}
              </Box>
            ) : colors.length > 1 ? (
              <Box>{`${colors.length} items selected`}</Box>
            ) : (
              ''
            )
          }
          InputProps={{ name: 'colors', id: 'select-colors' }}
        >
          <MenuItem value='' selected disabled>{`Select ${label}`}</MenuItem>
          {list &&
            list.map((item, index) => (
              <MenuItem key={index} value={item.code} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ColorBox bgColor={item.code} />
                  {item.name}
                </Box>

                <Checkbox checked={colors.indexOf(item.code) > -1} />
              </MenuItem>
            ))}
        </Select>
      </>
    )
  }

  const getSelectList = keyname => {
    switch (keyname) {
      case 'Size':
        return ['S', 'M', 'L', 'XL', 'XXL']
      case 'Fabric':
        return ['S', 'M', 'L', 'XL', 'XXL']
      case 'Sleeve':
        return ['S', 'M', 'L', 'XL', 'XXL']
      case 'Wheel':
        return ['S', 'M', 'L', 'XL', 'XXL']
      case 'Liter':
        return ['S', 'M', 'L', 'XL', 'XXL']
    }
  }

  const handleSelectValues = e => {
    const { name, value } = e.target
    setAttributesValues({ ...attributesValues, [name]: value })
  }

  const CreateSelectComponent = ({ keyname, list, onChange }) => {
    return (
      <>
        <Select
          multiple
          name={keyname}
          label={keyname}
          value={attributesValues[keyname]}
          MenuProps
          onChange={e => {
            onChange(e)
          }}
          renderValue={() =>
            attributesValues[keyname].length === 1 ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>{attributesValues[keyname][0]}</Box>
            ) : attributesValues[keyname].length > 1 ? (
              <Box>{`${attributesValues[keyname].length} ${keyname.toLowerCase()} selected`}</Box>
            ) : (
              ''
            )
          }
        >
          <MenuItem value='' selected disabled>{`Select ${keyname}`}</MenuItem>
          {list &&
            list.map((item, index) => (
              <MenuItem key={index} value={item} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>{item}</Box>
                <Checkbox checked={attributesValues[keyname].indexOf(item) > -1} />
              </MenuItem>
            ))}
        </Select>
      </>
    )
  }

  const getSelectComponent = attribute => {
    const keyname = attribute
    switch (attribute) {
      case 'Size':
        return <CreateSelectComponent keyname={keyname} list={getSelectList(keyname)} onChange={handleSelectValues} />
      case 'Fabric':
        return <CreateSelectComponent keyname={keyname} list={getSelectList('')} onChange={handleSelectValues} />
      case 'Sleeve':
        return <CreateSelectComponent keyname={keyname} list={getSelectList('')} onChange={handleSelectValues} />
      case 'Wheel':
        return <CreateSelectComponent keyname={keyname} list={getSelectList('')} onChange={handleSelectValues} />
      case 'Liter':
        return <CreateSelectComponent keyname={keyname} list={getSelectList('')} onChange={handleSelectValues} u />
    }
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='productname'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    autoFocus
                    value={value}
                    onBlur={onBlur}
                    label='Product Name'
                    onChange={onChange}
                    placeholder='Product Name'
                    error={Boolean(errors.productname)}
                  />
                )}
              />
              {errors.productname && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.productname.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Controller
                name='category'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <SelectDD
                    list={categoryList}
                    value={value}

                    // cb={e => handleCountryChange(e)}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors.category)}
                    label='Category'
                  />
                )}
              />
              {errors.category && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.category.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Brand</InputLabel>
              <Controller
                name='brand'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <SelectDD
                    list={brandList}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors.brand)}
                    label='Brand'
                  />
                )}
              />
              {errors.brand && <FormHelperText sx={{ color: 'error.main' }}>{errors.brand.message}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='unit'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Unit'
                    onChange={onChange}
                    placeholder='Unit'
                    error={Boolean(errors.unit)}
                  />
                )}
              />
              {errors.unit && <FormHelperText sx={{ color: 'error.main' }}>{errors.unit.message}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='weight'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Weight'
                    onChange={onChange}
                    placeholder='Weight'
                    InputProps={{ endAdornment: <InputAdornment position='end'>Kg</InputAdornment> }}
                    error={Boolean(errors.weight)}
                  />
                )}
              />
              {errors.weight && <FormHelperText sx={{ color: 'error.main' }}>{errors.weight.message}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='minimumpurchaseqty'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Minimum Purchase Qty'
                    onChange={onChange}
                    placeholder='Minimum Purchase Qty'
                    InputProps={{ inputProps: { min: 1 }, type: 'number' }}
                    error={Boolean(errors.minimumpurchaseqty)}
                  />
                )}
              />
              {errors.minimumpurchaseqty && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.minimumpurchaseqty.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Controller
                name='barcode'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Barcode'
                    onChange={onChange}
                    placeholder='Barcode'
                    error={Boolean(errors.barcode)}
                  />
                )}
              />
              {errors.barcode && <FormHelperText sx={{ color: 'error.main' }}>{errors.barcode.message}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormLabel sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>Tags</FormLabel>
            <Box
              border={1}
              borderColor='#E6E6E9'
              sx={{
                mt: 1,
                display: 'flex',
                flexFlow: 'wrap',
                alignItems: 'center',
                padding: '1rem',
                borderRadius: '0.4rem'
              }}
            >
              {tags &&
                tags.map((tag, index) => (
                  <Chip sx={{ mr: 2, mb: 2 }} key={index} label={tag} onDelete={handleDelete(index)} />
                ))}
              <FormControl fullWidth>
                <Controller
                  name='tags'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      variant='standard'
                      value={input}
                      onKeyDown={onKeyDown}
                      onBlur={onBlur}
                      onChange={(onChange, e => handleTagOnChange(e))}
                      placeholder='Type to add a tag'
                      InputProps={{ disableUnderline: true }}
                      error={Boolean(errors.tags)}
                    />
                  )}
                />
                {errors.tags && <FormHelperText sx={{ color: 'error.main' }}>{errors.tags.message}</FormHelperText>}
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Controller
                name='refundable'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <FormControlLabel
                    sx={{ display: 'flex', justifyContent: 'start', margin: 0 }}
                    labelPlacement='start'
                    label={
                      <Typography sx={{ fontSize: '0.7rem' }} color='textSecondary'>
                        Refundable
                      </Typography>
                    }
                    control={
                      <Switch
                        checked={refundable}
                        onBlur={onBlur}
                        onChange={(onChange, e => handleRefundable(e))}
                        error={Boolean(errors.refundable)}
                      />
                    }
                  />
                )}
              />
              {errors.refundable && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.refundable.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
      <Divider sx={{ m: 0 }} />
      <CardActions>
        <Button size='large' sx={{ mr: 2 }} color='secondary' variant='outlined' disabled>
          Back
        </Button>
        <Button size='large' variant='contained' onClick={() => setValue('price_stock')}>
          Next
        </Button>
      </CardActions>
    </form>
  )
}

export default General
