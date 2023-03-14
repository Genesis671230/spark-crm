// ** React Imports
import {useState, useEffect} from 'react'

// ** MUI Import
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import Table from '@mui/material/Table'
import TabPanel from '@mui/lab/TabPanel'
import Avatar from '@mui/material/Avatar'
import TabContext from '@mui/lab/TabContext'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

// ** Icons Imports
import Plus from 'mdi-material-ui/Plus'
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'

const RenderTabContent = ({data}) => {
  console.log('Item and index: ', data)

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{'& .MuiTableCell-root': {py: theme => `${theme.spacing(2.5)} !important`}}}>
            <TableCell sx={{whiteSpace: 'nowrap'}}>#</TableCell>
            <TableCell sx={{whiteSpace: 'nowrap'}}>Category Name</TableCell>
            <TableCell align='right'>Total Product</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {data?.cat_name?.length > 0 &&
            data.cat_name.map((item, index) => (
              <>
                <TableRow
                  key={index}
                  sx={{
                    '& .MuiTableCell-root': {
                      border: 0,
                      py: theme => `${theme.spacing(1.5)} !important`
                    },
                    '&:first-child .MuiTableCell-body': {
                      pt: theme => `${theme.spacing(3)} !important`
                    },
                    '&:last-child .MuiTableCell-body': {
                      pb: theme => `${theme.spacing(3)} !important`
                    }
                  }}
                >
                  <TableCell>
                    <Typography variant='body2' sx={{fontWeight: 600, whiteSpace: 'nowrap', color: 'text.primary'}}>
                      {index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' sx={{fontWeight: 600, whiteSpace: 'nowrap', color: 'text.primary'}}>
                      {item}
                    </Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <CustomChip
                      skin='light'
                      size='small'
                      label={data.counter[index]}
                      sx={{height: 20, fontWeight: 500, '& .MuiChip-label': {px: 1.625, lineHeight: 1.539}}}
                    />
                  </TableCell>
                </TableRow>

              </>
            ))}

        </TableBody>
      </Table>
    </TableContainer>
  )
}

const EcommerceSalesOverviewWithTabs = ({data}) => {

  return (
    <Card>
      <CardHeader
        title='Category Wise Products Count'
      />
      <RenderTabContent data={data}/>
    </Card>
  )
}

export default EcommerceSalesOverviewWithTabs
