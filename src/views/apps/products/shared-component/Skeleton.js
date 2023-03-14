// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import { Typography } from '@mui/material'
import { saveAs } from 'file-saver'

const Skeleton = () => {
  const saveFile = () => {
    saveAs('/files/HotelcomUseCase.pdf', 'Skeleton.pdf')
  }

  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Typography>1</Typography>
        </ListItemAvatar>
        <ListItemText primary='Download the skeleton file and fill it with data' />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Typography>2</Typography>
        </ListItemAvatar>
        <ListItemText primary='You can download the example file to understand how the data must be filled' />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Typography>3</Typography>
        </ListItemAvatar>
        <ListItemText primary='Once you have downloaded and filled the skeleton file, upload it in the form below and submit' />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Typography>4</Typography>
        </ListItemAvatar>
        <ListItemText primary='After uploading products you need to edit them and set products images and choices' />
      </ListItem>
      <ListItem>
        <Button onClick={saveFile}>Download CSV</Button>
      </ListItem>
    </List>
  )
}

export default Skeleton
