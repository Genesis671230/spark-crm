// ** React Imports
import { Fragment, useState, useEffect, forwardRef } from 'react'

// ** Next Import
import Link from 'next/link' // ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import Switch from '@mui/material/Switch'

import Button from '@mui/material/Button'

import Select from '@mui/material/Select'

// ** Icons Imports
import Send from 'mdi-material-ui/Send'
import Check from 'mdi-material-ui/Check'
import ChartPie from 'mdi-material-ui/ChartPie'
import Download from 'mdi-material-ui/Download'
import ArrowDown from 'mdi-material-ui/ArrowDown'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import TrendingUp from 'mdi-material-ui/TrendingUp'
import ContentCopy from 'mdi-material-ui/ContentCopy'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'
import ContentSaveOutline from 'mdi-material-ui/ContentSaveOutline'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, deleteInvoice } from 'src/store/apps/invoice'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import TableHeader from 'src/views/apps/products/digital-product/list/TableHeader'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { Divider } from '@mui/material'

// ** Styled component for the link in the dataTable
const StyledLink = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

/* eslint-enable */
const DigitalProductList = () => {
  // ** State
  const [dates, setDates] = useState([])
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(16)
  const [statusValue, setStatusValue] = useState('')
  const [endDateRange, setEndDateRange] = useState(null)
  const [selectedRows, setSelectedRows] = useState([])
  const [startDateRange, setStartDateRange] = useState(new Date())

  // ** Hooks
  const router = useRouter()
  const dispatch = useDispatch()
  const store = useSelector(state => state.invoice)
  useEffect(() => {
    dispatch(
      fetchData({
        dates,
        q: value,
        status: statusValue
      })
    )
  }, [dispatch, statusValue, value, dates])

  const handlePublishSwitch = (event, row) => {
    console.log('handlePublish: ', event.target.checked)
    console.log('data: ', row)
  }

  const handleFeaturedSwitch = () => {}

  const handleAddNewProduct = url => {
    if (url) {
      router.push(url)
    }
  }

  const handleFilter = val => {
    setValue(val)
  }

  const handleStatusValue = e => {
    setStatusValue(e.target.value)
  }

  const handleOnChangeRange = dates => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }

  const RowOptions = ({ id }) => {
    // ** State
    const [anchorEl, setAnchorEl] = useState(null)
    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = event => {
      setAnchorEl(event.currentTarget)
    }

    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }

    return (
      <Fragment>
        <IconButton size='small' onClick={handleRowOptionsClick}>
          <DotsVertical />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <MenuItem>
            <Download fontSize='small' sx={{ mr: 2 }} />
            Download
          </MenuItem>
          <Link href={`/products/product/edit/${id}`} passHref>
            <MenuItem>
              <PencilOutline fontSize='small' sx={{ mr: 2 }} />
              Edit
            </MenuItem>
          </Link>
          <MenuItem>
            <ContentCopy fontSize='small' sx={{ mr: 2 }} />
            Duplicate
          </MenuItem>
        </Menu>
      </Fragment>
    )
  }

  // ** Vars
  const invoiceStatusObj = {
    Sent: { color: 'secondary', icon: <Send sx={{ fontSize: '1.25rem' }} /> },
    Paid: { color: 'success', icon: <Check sx={{ fontSize: '1.25rem' }} /> },
    Draft: { color: 'primary', icon: <ContentSaveOutline sx={{ fontSize: '1.25rem' }} /> },
    'Partial Payment': { color: 'warning', icon: <ChartPie sx={{ fontSize: '1.25rem' }} /> },
    'Past Due': { color: 'error', icon: <InformationOutline sx={{ fontSize: '1.25rem' }} /> },
    Downloaded: { color: 'info', icon: <ArrowDown sx={{ fontSize: '1.25rem' }} /> }
  }

  // ** renders client column
  const renderClient = row => {
    if (row.avatar.length) {
      return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
    } else {
      return (
        <CustomAvatar
          skin='light'
          color={row.avatarColor || 'primary'}
          sx={{ mr: 3, fontSize: '1rem', width: 34, height: 34 }}
        >
          {getInitials(row.name || 'John Doe')}
        </CustomAvatar>
      )
    }
  }

  const defaultColumns = [
    {
      flex: 0.06,
      field: 'id',
      minWidth: 40,
      headerName: '#',
      renderCell: ({ row }) => (
        <Link href={`/apps/invoice/preview/${row.id}`} passHref>
          <StyledLink>{`#${row.id}`}</StyledLink>
        </Link>
      )
    },

    // {
    //   flex: 0.1,
    //   minWidth: 80,
    //   field: 'invoiceStatus',
    //   renderHeader: () => <TrendingUp fontSize='small' sx={{ color: 'action.active' }} />,
    //   renderCell: ({ row }) => {
    //     const { dueDate, balance, invoiceStatus } = row
    //     const color = invoiceStatusObj[invoiceStatus] ? invoiceStatusObj[invoiceStatus].color : 'primary'
    //     const Icon = invoiceStatusObj[invoiceStatus] ? invoiceStatusObj[invoiceStatus].icon : null

    //     return (
    //       <Tooltip
    //         title={
    //           <div>
    //             <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
    //               {invoiceStatus}
    //             </Typography>
    //             <br />
    //             <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
    //               Balance:
    //             </Typography>{' '}
    //             {balance}
    //             <br />
    //             <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
    //               Due Date:
    //             </Typography>{' '}
    //             {dueDate}
    //           </div>
    //         }
    //       >
    //         <CustomAvatar skin='light' color={color} sx={{ width: 34, height: 34 }}>
    //           {Icon}
    //         </CustomAvatar>
    //       </Tooltip>
    //     )
    //   }
    // },
    {
      flex: 0.2,
      field: 'name',
      minWidth: 250,
      headerName: 'Name',
      renderCell: ({ row }) => {
        const { name, companyEmail } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                noWrap
                variant='body2'
                sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
              >
                {name}
              </Typography>
              <Typography noWrap variant='caption'>
                {companyEmail}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.12,
      minWidth: 90,
      field: 'category',
      headerName: 'Cagetory',
      renderCell: ({ row }) => <Typography variant='body2'>{`Men Clothing & Fashion`}</Typography>
    },
    {
      flex: 0.09,
      minWidth: 125,
      field: 'currentQty',
      headerName: 'Current Qty',
      renderCell: ({ row }) => <Typography variant='body2'>{row.balance}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 90,
      field: 'basePrice',
      headerName: 'Base Price',
      renderCell: ({ row }) => {
        return row.balance !== 0 ? (
          <Typography variant='body2' sx={{ color: 'text.primary' }}>
            {row.balance}
          </Typography>
        ) : (
          <CustomChip size='small' skin='light' color='success' label='Paid' />
        )
      }
    },
    {
      flex: 0.19,
      minWidth: 90,
      field: 'approval',
      headerName: 'Approval',
      renderCell: ({ row }) => {
        return row.balance !== 0 ? (
          <CustomChip size='small' skin='light' color='success' label='Approved' />
        ) : (
          <CustomChip size='small' skin='light' color='info' label='Pending' />
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 90,
      field: 'published',
      headerName: 'Published',
      renderCell: ({ row }) => {
        return row.balance !== 0 ? <Switch checked={true} /> : <Switch checked={false} />
      }
    },
    {
      flex: 0.15,
      minWidth: 90,
      field: 'featured',
      headerName: 'Featured',
      renderCell: ({ row }) => {
        return row.balance !== 0 ? <Switch checked={true} /> : <Switch checked={false} />
      }
    }
  ]
  /* eslint-disable */
  const CustomInput = forwardRef((props, ref) => {
    const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null
    const value = `${startDate}${endDate !== null ? endDate : ''}`
    props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
    const updatedProps = { ...props }
    delete updatedProps.setDates
    return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
  })

  const columns = [
    ...defaultColumns,

    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Delete Invoice'>
            <IconButton size='small' sx={{ mr: 0.5 }} onClick={() => dispatch(deleteInvoice(row.id))}>
              <DeleteOutline />
            </IconButton>
          </Tooltip>
          <Tooltip title='View'>
            <Box>
              <Link href={`/products/digital-product/preview/${row.id}`} passHref>
                <IconButton size='small' component='a' sx={{ textDecoration: 'none', mr: 0.5 }}>
                  <EyeOutline />
                </IconButton>
              </Link>
            </Box>
          </Tooltip>
          <RowOptions id={row.id} />
        </Box>
      )
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 5, pt: 4, pb: 1 }}>
              <Typography variant='body1' sx={{ fontSize: '1.2rem', fontWeight: '500' }}>
                Digital Products
              </Typography>
              <Link href='/products/digital-product/add' passHref>
                <Button variant='contained' onClick={() => handleAddNewProduct('/products/digital-product/add')}>
                  Add New Digital Product
                </Button>
              </Link>
            </Box>
          </Grid>
          <Divider />
          <TableHeader value={value} selectedRows={selectedRows} handleFilter={handleFilter} />
          <DataGrid
            autoHeight
            pagination
            rows={store.data}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            pageSize={Number(pageSize)}
            rowsPerPageOptions={[16, 40]}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            onSelectionModelChange={rows => setSelectedRows(rows)}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default DigitalProductList
