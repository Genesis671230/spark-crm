// ** React Imports
import { useState } from 'react'

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
import Step from '@mui/material/Step'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'

// ** Third Party Imports
import clsx from 'clsx'
import toast from 'react-hot-toast'

// ** Custom Components Imports
import StepperCustomDot from 'src/views/apps/products/shared-component/StepperCustomDot'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'

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
import UploadMultipleFiles from 'src/views/apps/products/UploadMultipleFiles'
import UoloadSingleFile from 'src/views/apps/products/shared-component/UploadSingleFile'
import UploadSingleFile from 'src/views/apps/products/shared-component/UploadSingleFile'

const AddNewProduct = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [refundable, setRefundable] = useState(true)
  const [tags, setTags] = useState(['New', 'old', 'current'])
  const [input, setInput] = useState('')
  const [galleryImages, setGalleryImages] = useState([])
  const [thumbnail, setThumbnail] = useState([])
  const [PDF, setPDF] = useState([])
  const [metaImages, setmetaImages] = useState([])
  const [activeStep, setActiveStep] = useState(0)
  const [modalData, setModalData] = useState(null)

  console.log('Gallery: ', galleryImages)
  console.log('Thumbnail: ', thumbnail)
  console.log('PDP: ', PDF)

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

  const steps = [
    {
      title: 'Basic Information'
    },
    {
      title: 'Product Images'
    },
    {
      title: 'Product Videos'
    },
    {
      title: 'Product Variation'
    },
    {
      title: 'Product price + stock'
    },
    {
      title: 'Product Description'
    },
    {
      title: 'PDF Specification'
    },
    {
      title: 'SEO Meta Tags'
    }
  ]

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    if (activeStep === steps.length - 1) {
      toast.success('Completed All Steps!!')
    }
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <BasicInformation />
      case 1:
        return <ProductImages />
      case 2:
        return <h1>Step Two</h1>
      case 3:
        return <h1>Step Two</h1>
      case 4:
        return <h1>Step Two</h1>
      case 5:
        return <h1>Step Two</h1>
      case 6:
        return <h1>Step Two</h1>
      case 7:
        return <h1>Step Two</h1>
      case 8:
        return <h1>Step Two</h1>
    }
  }

  const BasicInformation = () => {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ mb: 4 }}>
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
          <FormControl fullWidth sx={{ mb: 4 }}>
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
            {errors.category && <FormHelperText sx={{ color: 'error.main' }}>{errors.category.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ mb: 4 }}>
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
          <FormControl fullWidth sx={{ mb: 4 }}>
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
          <FormControl fullWidth sx={{ mb: 4 }}>
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
          <FormControl fullWidth sx={{ mb: 4 }}>
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
          <FormControl fullWidth sx={{ mb: 4 }}>
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
    )
  }

  const ProductImages = () => {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <UploadMultipleFiles
            des={{ name: 'Gallery Images' }}
            files={galleryImages}
            setFiles={data => setGalleryImages(data)}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ mb: 0 }} />
        </Grid>
        <Grid item xs={12}>
          <UploadSingleFile des={{ name: 'Thumbnail Image' }} files={thumbnail} setFiles={data => setThumbnail(data)} />
        </Grid>
      </Grid>
    )
  }

  const ProductVideos = () => {}

  const ProductVariation = () => {}

  const ProductPriceStock = () => {}

  const ProductDescription = () => {}

  const PDFSpecification = () => {}

  const SEOMetaTags = () => {}

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
    console.log('Key: ', e.key)
    const { key } = e
    const trimmedInput = input.trim()

    if (key === 'Enter' && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault()
      setTags(prevState => [...prevState, trimmedInput])
      setInput('')
    }
  }

  const onSubmit = (data, event) => {
    event.preventDefault()
    const content = modelContent(data)
    setModalData(content)
  }

  function modelContent(data) {
    console.log('model Data:', data)

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

  return (
    <Card>
      <CardHeader title='Add New Product' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ m: 0 }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <StepperWrapper>
            <Stepper activeStep={activeStep} orientation='vertical'>
              {steps.map((step, index) => {
                return (
                  <Step key={index} className={clsx({ active: activeStep === index })}>
                    <StepLabel StepIconComponent={StepperCustomDot}>
                      <div className='step-label'>
                        <Typography className='step-number'>0{index + 1}</Typography>
                        <div>
                          <Typography className='step-title'>{step.title}</Typography>
                          {/* <Typography className='step-subtitle'>{step.subtitle}</Typography> */}
                        </div>
                      </div>
                    </StepLabel>
                    <StepContent>
                      <Typography>{getStepContent(index)}</Typography>
                      <div className='button-wrapper'>
                        <Button
                          size='small'
                          color='secondary'
                          variant='outlined'
                          onClick={handleBack}
                          disabled={activeStep === 0}
                        >
                          Back
                        </Button>
                        <Button size='small' variant='contained' onClick={handleNext} sx={{ ml: 4 }}>
                          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      </div>
                    </StepContent>
                  </Step>
                )
              })}
            </Stepper>
          </StepperWrapper>
          {activeStep === steps.length && (
            <Box sx={{ mt: 2 }}>
              <Typography>All steps are completed!</Typography>
              <Button size='small' sx={{ mt: 2 }} variant='contained' onClick={handleReset}>
                Reset
              </Button>
            </Box>
          )}
          {/* <Grid container spacing={6}>
            <Grid item xs={12}>
              <Typography variant='body1' sx={{ fontWeight: 700 }}>
                1. Account Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 4 }}>
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
              <FormControl fullWidth sx={{ mb: 4 }}>
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
              <FormControl fullWidth sx={{ mb: 4 }}>
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
              <FormControl fullWidth sx={{ mb: 4 }}>
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
              <FormControl fullWidth sx={{ mb: 4 }}>
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
              <FormControl fullWidth sx={{ mb: 4 }}>
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
              <FormControl fullWidth sx={{ mb: 4 }}>
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
                {errors.barcode && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.barcode.message}</FormHelperText>
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
            <Grid item xs={12}>
              <Divider sx={{ mb: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body1' sx={{ fontWeight: 700 }}>
                2. Product Images
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <UploadMultipleFiles
                des={{ name: 'Gallery Images' }}
                files={galleryImages}
                setFiles={data => setGalleryImages(data)}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mb: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <UploadSingleFile
                des={{ name: 'Thumbnail Image' }}
                files={thumbnail}
                setFiles={data => setThumbnail(data)}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mb: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body1' sx={{ fontWeight: 700 }}>
                3. Product Videos
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel>Video Provider</InputLabel>
                <Controller
                  name='videoprovider'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <SelectDD
                      list={videoProviderList}
                      value={value}
                      // cb={e => handleCountryChange(e)}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={Boolean(errors.videoprovider)}
                      label='Video Provider'
                    />
                  )}
                />
                {errors.videoprovider && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.videoprovider.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='videolink'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      value={value}
                      onBlur={onBlur}
                      label='Video Link'
                      onChange={onChange}
                      placeholder='Video Link'
                      error={Boolean(errors.videolink)}
                    />
                  )}
                />
                {errors.videolink && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.videolink.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ mb: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body1' sx={{ fontWeight: 700 }}>
                4. Product Variation
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ mb: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body1' sx={{ fontWeight: 700 }}>
                5. Product price + stock
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ mb: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body1' sx={{ fontWeight: 700 }}>
                6. Product Description
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ mb: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body1' sx={{ fontWeight: 700 }}>
                7. PDF Specification
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <UploadSingleFile des={{ name: 'PDF Specification' }} files={thumbnail} setFiles={data => setPDF(data)} />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ mb: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body1' sx={{ fontWeight: 700 }}>
                8. SEO Meta Tags
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='slug'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      value={value}
                      onBlur={onBlur}
                      label='Slug'
                      onChange={onChange}
                      placeholder='Slug'
                      error={Boolean(errors.slug)}
                    />
                  )}
                />
                {errors.slug && <FormHelperText sx={{ color: 'error.main' }}>{errors.slug.message}</FormHelperText>}
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
          </Grid> */}
        </CardContent>
        {/* <Divider sx={{ m: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Submit
          </Button>
          <Button size='large' color='secondary' variant='outlined'>
            Cancel
          </Button>
        </CardActions> */}
      </form>
    </Card>
  )
}

export default AddNewProduct
