// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { Typography } from '@mui/material'
import { saveAs } from 'file-saver'

const CategoryBrand = () => {
  const saveFile = ({ filename }) => {
    saveAs('/files/HotelcomUseCase.pdf', `${filename}.pdf`)
  }

  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Typography>1</Typography>
        </ListItemAvatar>
        <ListItemText primary='Category and Brand should be in numerical id' />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Typography>2</Typography>
        </ListItemAvatar>
        <ListItemText primary='You can download the pdf to get Category and Brand id' />
      </ListItem>
      <ListItem>
        <Button onClick={() => saveFile({ filename: 'Category' })}>Download Category</Button>
        <Button onClick={() => saveFile({ filename: 'Brand' })}>Download Brand</Button>
      </ListItem>
    </List>
  )
}

export default CategoryBrand
