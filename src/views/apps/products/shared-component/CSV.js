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
import UploadSingleFile from './UploadSingleFile'
import { ConsoleNetworkOutline } from 'mdi-material-ui'

const CSV = () => {
  const [csv, setCsv] = useState([])

  const uploadToClient = event => {
    console.log()
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0]
      setCsv(i)
    }
  }

  console.log('file: ', csv)

  const uploadToServer = async event => {
    const body = new FormData()

    // console.log("file", image)
    body.append('file', csv)
    console.log('body: ', body)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body
    })
    console.log('upload response: ', response)
  }
  
return (
    <List>
      <ListItem>
        <UploadSingleFile
          des={{ name: 'CSV file' }}
          files={csv}
          setFiles={data => setCsv(data)}
          onChange={uploadToClient}
        />
      </ListItem>

      <ListItem>
        <Button onClick={uploadToServer}>Download CSV</Button>
      </ListItem>
    </List>
  )
}

export default CSV
