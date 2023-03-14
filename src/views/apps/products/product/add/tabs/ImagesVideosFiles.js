// ** React Imports
import {useEffect, useState,} from 'react'
import {useSelector} from "react-redux";
import {useRouter} from 'next/router'


// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import {useTheme} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'
import Divider from '@mui/material/Divider'
import CardActions from '@mui/material/CardActions'

import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm, Controller} from 'react-hook-form'

// ** DataDialog to show form data
import MediaModel from 'src/views/apps/products/product/add/tabs/MediaModel'
import Card from "@mui/material/Card";
import Image from 'mdi-material-ui/Image'
import ImageMultiple from 'mdi-material-ui/ImageMultiple'
import Close from "mdi-material-ui/Close";
import IconButton from "@mui/material/IconButton";

// ** Store & Actions Imports
import {useDispatch} from 'react-redux'
import {addProduct} from 'src/store/apps/products'


const ImagesVideosFiles = ({value, setValue, setFormData, formData, handleFormSubmit}) => {
  const baseurl = 'http://dev.housy.ae/'
  const router = useRouter()

  const {mediaImages} = useSelector(state => state.lists)

  // ** State
  const [galleryImages, setGalleryImages] = useState([])
  const [mainImage, setMainImage] = useState('')
  const [otherImages, setOtherImages] = useState([])
  const [open, setOpen] = useState(false)
  let [defaultValues, setDefaultValues] = useState({})
  const dispatch = useDispatch()
  console.log("Main Image", mainImage)
  console.log("Other Images", otherImages)

  useEffect(() => {
    setMainImage(formData.pro_input_image)
    setOtherImages(formData.other_images)
    reset(formData)
  }, [])

  const onSubmit = (data, event) => {
    event.preventDefault()
    let newData = {...data, pro_input_image: mainImage, other_images: otherImages}
    setFormData(prevState => ({...prevState, ...newData}))
    dispatch(addProduct(newData))
    setValue(0)

    // router.reload(window.location.pathname)
  }


  // ** Hooks
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)


  const schema = yup.object().shape({})

  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: {errors}
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const videoProviderList = [
    {
      name: 'Self Hosted',
      value: 'SelfHosted'
    },
    {
      name: 'Youtube',
      value: 'Youtube'
    },
    {
      name: 'Vimeo',
      value: 'Vimeo'
    }
  ]

  const handleRemoveImages = (value) => {
    const list = otherImages.filter((item, index) => index !== value)
    setOtherImages(list)
  }

  const SelectDD = ({list, value, onChange, error, onBlur, label}) => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography variant='body1' sx={{fontWeight: 700}}>
              Videos
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Video Provider</InputLabel>
              <Controller
                name='video_type'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}}) => (
                  <SelectDD
                    list={videoProviderList}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors.video_type)}
                    label='Video Provider'
                  />
                )}
              />
              {errors.video_type && (
                <FormHelperText sx={{color: 'error.main'}}>{errors.video_type.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='pro_input_video'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange, onBlur}}) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Video Link'
                    onChange={onChange}
                    placeholder='Video Link'
                    error={Boolean(errors.pro_input_video)}
                  />
                )}
              />
              {errors.pro_input_video && (
                <FormHelperText sx={{color: 'error.main'}}>{errors.pro_input_video.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{mb: 0}}/>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' sx={{fontWeight: 700}}>
              Images
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{p: 6, display: 'flex', gap: '10px'}}>
              <Box><MediaModel
                setMainImage={setMainImage}
                mediaImages={mediaImages}
                Image={Image}
                des={{name: 'Main Image', message: 'Upload main image to show the customer'}}
                files={galleryImages}
                setFiles={data => setGalleryImages(data)}/></Box>
              {mainImage &&
                <Card sx={{p: 4, position: 'relative'}}>
                  <IconButton
                    size='small'
                    onClick={() => setMainImage('')}
                    sx={{position: 'absolute', right: '2px', top: '2px'}}
                  >
                    <Close/>
                  </IconButton>
                  <img
                    width={150}
                    height={150}
                    src={baseurl+mainImage}
                    alt={mainImage}
                  /></Card>}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{mb: 0}}/>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{p: 6, display: 'flex', gap: '10px', flexFlow: 'wrap'}}>
              <Box>
                <MediaModel
                  setOtherImages={setOtherImages}
                  mediaImages={mediaImages}
                  Image={ImageMultiple}
                  des={{name: 'Other Images', message: 'Upload other images from different sides'}}
                  files={galleryImages}
                  setFiles={data => setGalleryImages(data)}/>
              </Box>
              {otherImages.length > 0 ?
                otherImages.map((item, index) => <Card key={index} sx={{p: 4, position: 'relative'}}>
                  <IconButton
                    size='small'
                    onClick={() => handleRemoveImages(index)}
                    sx={{position: 'absolute', right: '2px', top: '2px'}}
                  >
                    <Close/>
                  </IconButton>
                  <img
                    width={150}
                    height={150}
                    src={item}
                    alt={item}
                  /></Card>) : ''}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <Divider sx={{m: 0}}/>
      <CardActions>

        <Button size='large' sx={{mr: 2}} name={'back'} color='secondary' variant='outlined' onClick={() => setValue(value - 1)}>
          back
        </Button>
        <Button type='submit' size='large' variant='contained'>
          Submit
        </Button>
      </CardActions>
    </form>
  )
}

export default ImagesVideosFiles
