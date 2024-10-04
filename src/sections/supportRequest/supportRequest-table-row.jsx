import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';

import Link from '@mui/material/Link';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';
import { deletesupportRequest } from 'src/services/supportRequestApiService';
import toast from 'react-hot-toast';
import Iconify from 'src/components/iconify';
import ConfirmationDialog from '../confirmation-dialog';

// ----------------------------------------------------------------------
export default function SupportRequestTableRow({ SR ,user}) {
  const [open, setOpen] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const navigate = useNavigate();
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleSupportRequestDeletion = async () => {
    const asyncOperation = async () => {
      setOpenDeleteDialog(false);
      return deletesupportRequest(SR.id, SR.rowVersion);
    };
    await toast.promise(asyncOperation(), {
      loading: 'Processing...',
      success: (data) => `Support Request deleted successfuly`,
      error: (err) => `Sorry, try again!`,
      duration: 3000,
    });
    setTimeout(() => {
      navigate(0);
    }, 1000);
  };

  let statusColor;
  switch (SR.status) {
    case 'Resolved':
      statusColor = 'success';
      break;
    case 'Reported':
      statusColor = 'error';
      break;

    case 'Testing':
      statusColor = 'warning';
      break;
    default:
      statusColor = 'info';
      break;
  }

  return (
    <>
      <ConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleSupportRequestDeletion}
      />
      <TableRow hover>
        <TableCell>
          <Typography variant="subtitle2">
            {' '}
            <Link
              component={ReactRouterLink}
              to={`chat/:${SR.id}/:${user.id}`}
              color="inherit"
              underline="hover"
              variant="subtitle2"
            >
              {SR.id}
            </Link>{' '}
          </Typography>
        </TableCell>

        <TableCell>{SR.lastModified}</TableCell>
        
        <TableCell>
          <Label color={statusColor}>{SR.status}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        {/* <MenuItem onClick={()=>handleCloseMenu()}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem> */}

        <MenuItem onClick={() => setOpenDeleteDialog(true)} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

SupportRequestTableRow.propTypes = {
  SR: PropTypes.object.isRequired,
  user:PropTypes.object
};
