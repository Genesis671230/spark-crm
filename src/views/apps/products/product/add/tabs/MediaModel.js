// ** React Imports
import {useState, forwardRef, useEffect} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Hooks
import useBgColor from 'src/@core/hooks/useBgColor'

import UploadMultipleFiles from 'src/views/apps/products/shared-component/UploadMultipleFiles'
import Divider from "@mui/material/Divider";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormGroup from "@mui/material/FormGroup";


const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const MediaModel = ({files, setFiles, des, Image, mediaImages, setMainImage, setOtherImages}) => {
  // ** States
  const [show, setShow] = useState(false)
  const [singleImage, setSingleImage] = useState('')
  const [multipleImages, setMultipleImages] = useState([])

  console.log('Single image is set: ', singleImage)

  console.log('Multiple Images: ', multipleImages)

  // useEffect(() => setMultipleImages(pre[]), [])

  const handleSetMainImage = () => {
    setMainImage(singleImage)
    setShow(false)
  }

  const handleSetMultipleImages = () => {
    setOtherImages(multipleImages)
    setMultipleImages([]);
    setShow(false)
  }

  // ** Hooks
  const bgClasses = useBgColor()

  return (
    <Card>
      <CardContent sx={{textAlign: 'center', cursor: 'pointer'}} onClick={() => setShow(true)}>
        <Image sx={{mb: 2, fontSize: '2rem'}}/>
        <Typography variant='h6'>
          {des.name}
        </Typography>
        <Typography sx={{mb: 3}}>
          {des.message}
        </Typography>
      </CardContent>
      <Dialog
        fullWidth
        open={show}
        maxWidth='lg'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <DialogTitle>
          <Box>
            <Typography variant={'h6'}>
              Media
            </Typography>
            <IconButton
              size='small'
              onClick={() => setShow(false)}
              sx={{position: 'absolute', right: '1rem', top: '1rem'}}
            >
              <Close/>
            </IconButton>
          </Box></DialogTitle>

        <DialogContent sx={{pb: 6, px: {xs: 4, sm: 7}, pt: {xs: 4, sm: 7}, position: 'relative'}}>
          <Grid item xs={12}>
            <Divider sx={{mb: 0}}/>
          </Grid>
          <Box sx={{
            height: '250px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 8,
            mb: 4,
            border: 'solid 3px',
            borderStyle: 'dashed',
            borderRadius: '10px',
            borderColor: 'rgba(101, 108, 255, 0.2)'
          }}>
            <UploadMultipleFiles
              des={des}
              files={files}
              setFiles={setFiles}
            />
          </Box>
          <Grid item xs={12}>
            <Box sx={{display: 'flex', justifyContent: 'end'}}> <Button variant='contained' sx={{mr: 2}}>
              Upload Meida
            </Button>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{mb: 0}}/>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 3}}>
              <Typography variant={'h6'}>
                Select media and click choose media
              </Typography>

              <Button variant='contained' sx={{mr: 2}}
                      onClick={des.name === 'Main Image' ? handleSetMainImage : handleSetMultipleImages}>
                + Choose Media
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{mb: 0}}/>
          </Grid>

          <Box sx={{
            minHeight: '250px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 8,
            mb: 4,
            border: 'solid 3px',
            borderStyle: 'dashed',
            borderRadius: '10px',
            borderColor: 'rgba(101, 108, 255, 0.2)'
          }}>

            {des.name === 'Main Image' ? <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <Box sx={{p: 6, display: 'flex', flexFlow: 'wrap', gap: '10px', justifyContent: 'center'}}>
                  {mediaImages && mediaImages.map((item, index) => {

                    // eslint-disable-next-line react/jsx-key
                    return <Card sx={{p: 4, position: 'relative'}}>
                      <FormControlLabel sx={{position: 'absolute', top: 0, right: -15}} value={item.relative_path}
                                        control={<Radio/>} onChange={(e) => {
                        setSingleImage(e.target.value)
                      }
                      }/>
                      <img
                        width={150}
                        height={150}
                        src={item.image}
                        alt={item.image}
                      /></Card>
                  })}
                </Box>
              </RadioGroup>
            </FormControl> : <FormControl>
              <FormGroup>
                <Box sx={{p: 6, display: 'flex', flexFlow: 'wrap', gap: '10px', justifyContent: 'center'}}>
                  {mediaImages && mediaImages.map((item, index) => {

                    // eslint-disable-next-line react/jsx-key
                    return <Card sx={{p: 4, position: 'relative'}}>

                      <FormControlLabel sx={{position: 'absolute', top: 0, right: -15}} control={<Checkbox/>}
                                        value={item.image}
                                        onChange={(e) => {
                                          console.log("Value: ", e.target.value)
                                          setMultipleImages((state) => {
                                            return ([...state, e.target.value])
                                          })
                                        }}/>
                      <img
                        width={150}
                        height={150}
                        src={item.image}
                        alt={item}
                      /></Card>
                  })}
                </Box>
              </FormGroup>
            </FormControl>}


          </Box>

        </DialogContent>
        {/*<DialogActions sx={{my: 1, justifyContent: 'end'}}>*/}
        {/*  <Button variant='contained' sx={{mr: 2}}>*/}
        {/*    + Choose Media*/}
        {/*  </Button>*/}
        {/*</DialogActions>*/}
      </Dialog>
    </Card>
  )
}

export default MediaModel
