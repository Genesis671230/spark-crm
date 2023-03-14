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

import UploadMultipleFiles from '../../shared-component/UploadMultipleFiles'
import UploadSingleFile from '../../shared-component/UploadSingleFile'
import DateRangePicker from '../../shared-component/DateRangePicker'
import dynamic from 'next/dynamic'

const AddDigitalProduct = () => {
  // ** State
  const [refundable, setRefundable] = useState(true)
  const [tags, setTags] = useState(['New', 'old', 'current'])
  const [input, setInput] = useState('')
  const [galleryImages, setGalleryImages] = useState([])
  const [thumbnail, setThumbnail] = useState([])
  const [colorSwitch, setColorSwitch] = useState(false)
  const [colors, setColors] = useState([])
  const [attributes, setAttributes] = useState([])
  const [attributesValues, setAttributesValues] = useState({ Size: [], Fabric: [], Sleeve: [], Wheel: [], Liter: [] })
  const [EData, setEData] = useState('')
  const [PDF, setPDF] = useState([])
  const [metaImages, setMetaImages] = useState([])

  const MyEditor = () => {
    const Editor = dynamic(() => import('../../shared-component/Editor'), { ssr: false })
    
return <Editor data={EData} setData={setEData} />
  }

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

  function modelContent(data) {
    const content = (
      <Box>
        <Box style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <img src={imgSrc} style={{ width: '200px', height: '200px', objectFit: 'contain', borderRadius: '20px' }} />
        </Box>
        <Box>{data.yourname}</Box>
        <Box>{data.yourphone}</Box>
        <Box>{data.newpassword}</Box>
      </Box>
    )

    return { title: 'Profile Basic Information', content }
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
      name: 'Softwares',
      value: '59'
    },
    {
      name: 'Laptops & Computers',
      value: '64'
    },
    {
      name: 'Mobiles',
      value: '68'
    },
    {
      name: 'Cameras',
      value: '70'
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

  const AttributesSelect = ({ list, value, onChange, label }) => {
    return (
      <>
        <Select
          multiple
          name='attributes'
          label={label}
          value={value}
          MenuProps
          onChange={e => {
            onChange(e)
          }}
          renderValue={() =>
            attributes.length === 1 ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>{attributes[0]}</Box>
            ) : attributes.length > 1 ? (
              <Box>{`${attributes.length} items selected`}</Box>
            ) : (
              ''
            )
          }
        >
          <MenuItem value='' selected disabled>{`Select ${label}`}</MenuItem>
          {list &&
            list.map((item, index) => (
              <MenuItem key={index} value={item} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>{item}</Box>
                <Checkbox checked={attributes.indexOf(item) > -1} />
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
    <Card>
      <CardHeader title='Add Digital Product' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ m: 0 }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Typography variant='body1' sx={{ fontWeight: 700 }}>
                1. General
              </Typography>
            </Grid>
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
                </FormControl>
              </Box>
              <Box sx={{ mt: '0.2rem' }}>
                <Typography sx={{ fontSize: '0.6rem' }}>
                  This is used for search. Input those words by which cutomer can find this product.
                </Typography>
                {errors.tags && <FormHelperText sx={{ color: 'error.main' }}>{errors.tags.message}</FormHelperText>}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <UploadSingleFile
                des={{ name: 'Product File' }}
                files={thumbnail}
                setFiles={data => setThumbnail(data)}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mb: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body1' sx={{ fontWeight: 700 }}>
                2. Images
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <UploadMultipleFiles
                des={{
                  name: 'Gallery Images ',
                  size: '(600x600)',
                  message: 'These images are visible in product details page gallery. Use 600x600 sizes images.'
                }}
                files={galleryImages}
                setFiles={data => setGalleryImages(data)}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mb: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <UploadSingleFile
                des={{
                  name: 'Thumbnail Image',
                  size: '(300x300)',
                  message:
                    'This image is visible in all product box. Use 300x300 sizes image. Keep some blank space around main object of your image as we had to crop some edge in different devices to make it responsive.'
                }}
                files={thumbnail}
                setFiles={data => setThumbnail(data)}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ mb: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body1' sx={{ fontWeight: 700 }}>
                3. Meta Tags
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='metatitle'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      value={value}
                      onBlur={onBlur}
                      label='Meta Title'
                      onChange={onChange}
                      placeholder='Meta Title'
                      error={Boolean(errors.metatitle)}
                    />
                  )}
                />
                {errors.metatitle && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.metatitle.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='metadescription'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      multiline
                      minRows={3}
                      value={value}
                      onBlur={onBlur}
                      label='Description'
                      onChange={onChange}
                      placeholder='Write here description'
                      error={Boolean(errors.metadescription)}
                    />
                  )}
                />
                {errors.metadescription && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.metadescription.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <UploadMultipleFiles
                des={{ name: 'Meta Images' }}
                files={metaImages}
                setFiles={data => setMetaImages(data)}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ mb: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body1' sx={{ fontWeight: 700 }}>
                4. Price
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='unitprice'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      value={value}
                      onBlur={onBlur}
                      label='Unit Price'
                      onChange={onChange}
                      placeholder='Unit Price'
                      error={Boolean(errors.unitprice)}
                    />
                  )}
                />
                {errors.unitprice && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.unitprice.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='quantity'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      value={value}
                      onBlur={onBlur}
                      label='Quantity'
                      onChange={onChange}
                      placeholder='Quantity'
                      error={Boolean(errors.quantity)}
                    />
                  )}
                />
                {errors.quantity && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.quantity.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='discount'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      type='number'
                      value={value}
                      onBlur={onBlur}
                      label='Discount'
                      onChange={onChange}
                      placeholder='Discount'
                      error={Boolean(errors.Discount)}
                    />
                  )}
                />
                {errors.Discount && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.Discount.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Discount Type</InputLabel>
                <Controller
                  name='discounttype'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <SelectDD
                      list={[
                        { name: 'Flat', value: 'Flat' },
                        { name: 'Percent', value: 'Percent' }
                      ]}
                      value={value}

                      // cb={e => handleCountryChange(e)}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={Boolean(errors.discounttype)}
                      label='Discount Type'
                    />
                  )}
                />
                {errors.discounttype && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.discounttype.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <DateRangePicker />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='sku'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      value={value}
                      onBlur={onBlur}
                      label='SKU'
                      onChange={onChange}
                      placeholder='SKU'
                      error={Boolean(errors.sku)}
                    />
                  )}
                />
                {errors.sku && <FormHelperText sx={{ color: 'error.main' }}>{errors.sku.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='externallink'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      value={value}
                      onBlur={onBlur}
                      label='External link'
                      onChange={onChange}
                      placeholder='External link'
                      error={Boolean(errors.externallink)}
                    />
                  )}
                />
                {errors.externallink && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.externallink.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='externallinkbuttontext'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      value={value}
                      onBlur={onBlur}
                      label='External link button text'
                      onChange={onChange}
                      placeholder='External link button text'
                      error={Boolean(errors.externallinkbuttontext)}
                    />
                  )}
                />
                {errors.externallinkbuttontext && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.externallinkbuttontext.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ mb: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body1' sx={{ fontWeight: 700 }}>
                5. Product Information
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ height: '12rem' }}>
              <MyEditor />
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ m: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Submit
          </Button>
          <Button size='large' color='secondary' variant='outlined'>
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default AddDigitalProduct
