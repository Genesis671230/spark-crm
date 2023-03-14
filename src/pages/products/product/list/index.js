// ** React Imports
import { Fragment, useState, useEffect } from 'react'

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
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import Switch from '@mui/material/Switch'

import Button from '@mui/material/Button'

// ** Icons Imports
import Send from 'mdi-material-ui/Send'
import Check from 'mdi-material-ui/Check'
import ChartPie from 'mdi-material-ui/ChartPie'
import Download from 'mdi-material-ui/Download'
import ArrowDown from 'mdi-material-ui/ArrowDown'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import ContentCopy from 'mdi-material-ui/ContentCopy'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'
import ContentSaveOutline from 'mdi-material-ui/ContentSaveOutline'

// ** Config
import authConfig from 'src/configs/auth'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, deleteProduct } from 'src/store/apps/products'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import TableHeader from 'src/views/apps/products/product/list/TableHeader'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Styled Components
import { Divider } from '@mui/material'

import _ from 'lodash'

// ** Styled component for the link in the dataTable
const StyledLink = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

/* eslint-enable */
const ProductList = () => {
  const dispatch = useDispatch()
  let { list } = useSelector(state => state.products)

  const token = localStorage.getItem(authConfig.storageTokenKeyName)

  // ** State
  const [value, setValue] = useState('')
  const [listF, setListF] = useState(list)
  const [pageSize, setPageSize] = useState(16)
  const [selectedRows, setSelectedRows] = useState([])

  // ** Hooks
  const router = useRouter()

  console.log('Product Store: ', list)
  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  useEffect(() => {
    setListF(list)
  }, [list])

  const handleAddNewProduct = url => {
    if (url) {
      router.push(url)
    }
  }

  const handleFilter = val => {
    setValue(val)
    filteredData(val)
  }

  const filteredData = val => {
    console.log('value: ', val)
    const queryLowered = val.toLowerCase()

    const filterList = list.filter(product => {
      return (
        product.name.toLowerCase().includes(queryLowered) ||
        product.category_name.toLowerCase().includes(queryLowered) ||
        product.min_max_price.max_price.toString().includes(queryLowered)
      )
    })
    setListF(filterList)
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
          <MenuItem onClick={() => dispatch(duplicateProduct({ id, token }))}>
            <ContentCopy fontSize='small' sx={{ mr: 2 }} />
            Duplicate
          </MenuItem>
        </Menu>
      </Fragment>
    )
  }

  // ** renders client column
  const renderClient = row => {
    if (row.image_sm) {
      return <CustomAvatar src={row.image_sm} sx={{ mr: 3, width: 34, height: 34 }} />
    } else {
      return (
        <CustomAvatar
          skin='light'
          color={row.avatarColor || 'primary'}
          sx={{ mr: 3, fontSize: '1rem', width: 34, height: 34 }}
        >
          {getInitials(row.name || '----')}
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
      renderCell: ({ row }) => <Typography variant='body2'>{row.id}</Typography>

      // (
      //   <Link href={`/apps/invoice/preview/${row.id}`} passHref>
      //     <StyledLink>{`#${row.id}`}</StyledLink>
      //   </Link>
      // )
    },
    {
      flex: 0.2,
      field: 'name',
      minWidth: 250,
      headerName: 'Name',
      renderCell: ({ row }) => {
        const { name, thumbnail_img } = row

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
      renderCell: ({ row }) => <Typography variant='body2'>{row.category_name}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 90,
      field: 'price',
      headerName: 'Price',
      renderCell: ({ row }) => {
        return row.min_max_price ? (
          <Typography variant='body2' sx={{ color: 'text.primary' }}>
            {row.min_max_price.max_price}
          </Typography>
        ) : (
          <CustomChip size='small' skin='light' color='success' label='----' />
        )
      }
    },
    {
      flex: 0.19,
      minWidth: 90,
      field: 'current_stock',
      headerName: 'Current Stock',
      renderCell: ({ row }) => {
        return row.stock > 0 ? (
          <CustomChip
            size='small'
            skin='light'
            color={row.stock > 9 ? 'primary' : 'error'}
            label={row.stock > 9 ? `${row.stock}` : `${row.stock} Low`}
          />
        ) : (
          <CustomChip size='small' skin='light' color='info' label='Out of Stock' />
        )
      }
    },

    // {
    //   flex: 0.15,
    //   minWidth: 90,
    //   field: 'featured',
    //   headerName: 'Featured',
    //   renderCell: ({ row }) => {
    //     return (
    //       <Switch
    //         defaultChecked={row.featured}
    //         onChange={e => {
    //           console.log(`checked=${e.target.checked}`),
    //             dispatch(changeFeatured({ body: { id: row.id, featured_status: e.target.checked }, token }))
    //         }}
    //       />
    //     )
    //   }

    //   // onChange={handleFeatured(row.id)}
    // },
    {
      flex: 0.15,
      minWidth: 90,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <Switch
            defaultChecked={row.status}
            onChange={e => {
              console.log(`checked=${e.target.checked}`),
                dispatch(changeSatus({ body: { id: row.id, status: e.target.checked }, token }))
            }}
          />
        )
      }
    }
  ]

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
          <Tooltip title='Delete Product'>
            {/* onClick={() => dispatch(deleteProduct(row.id))} */}
            <IconButton size='small' sx={{ mr: 0.5 }} onClick={() => dispatch(deleteProduct({ id: row.id, token }))}>
              <DeleteOutline />
            </IconButton>
          </Tooltip>
          <Tooltip title='View'>
            <Box>
              <Link href={`/products/product/preview/${row.id}`} passHref>
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
                Products
              </Typography>
              <Link href='/products/product/add' passHref>
                <Button variant='contained' onClick={() => handleAddNewProduct('/products/product/add')}>
                  Add New Product
                </Button>
              </Link>
            </Box>
          </Grid>
          <Divider />
          <TableHeader value={value} selectedRows={selectedRows} handleFilter={handleFilter} />
          <DataGrid
            autoHeight
            pagination
            rows={listF && listF}
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

export default ProductList
