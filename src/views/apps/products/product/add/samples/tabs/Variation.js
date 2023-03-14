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

const Variation = () => {
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
    const Editor = dynamic(() => import('src/views/apps/products/shared-component/Editor'), { ssr: false })

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
    <form onSubmit={e => e.preventDefault()}>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Divider sx={{ mb: 0 }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' sx={{ fontWeight: 700 }}>
              4. Product Variation
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Colors</InputLabel>
              <ColorsSelect list={colorsList} value={colors} onChange={handleColors} label='Colors' />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <FormControlLabel
                sx={{ display: 'flex', justifyContent: 'start', margin: 0 }}
                labelPlacement='start'
                label={
                  <Typography sx={{ fontSize: '0.7rem' }} color='textSecondary'>
                    Add Colors
                  </Typography>
                }
                control={<Switch checked={colorSwitch} onChange={handleColorSwitch} />}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Attributes</InputLabel>
              <AttributesSelect
                list={attributesList}
                value={attributes}
                onChange={handleAttributs}
                label='Attributes'
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Choose the attributes of this product and then input values of each attribute</Typography>
          </Grid>
          {attributes &&
            attributes.map((attribute, index) => {
              // console.log('Attribute: ', attribute)

              return (
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>{attribute}</InputLabel>
                    {getSelectComponent(attribute)}
                  </FormControl>
                </Grid>
              )
            })}
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
  )
}

export default Variation
