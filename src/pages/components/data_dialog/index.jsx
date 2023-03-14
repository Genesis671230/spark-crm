// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

const DataDialog = ({ setModalData, modalData, }) => {

    // ** State
    const handleClose = () => setModalData(null)

    useEffect(() => {
        if (modalData) {
            console.log('modalData in Dialog', modalData);
        }
    }, [modalData])

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>{modalData.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        {modalData.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='dialog-actions-dense'>
                    <Button onClick={handleClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default DataDialog