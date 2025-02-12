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

const statusColor = {
  Pending: 'warning',
  Approved: 'success',
  Rejected: 'error',
  Cancelled: 'error',
  Closed: 'info',
};
export default function SupportRequestTableRow({ SR, user }) {
  console.log(user)
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
            <Link
              component={ReactRouterLink}
              to={
                ['Approved', 'Closed'].includes(SR.status) ? `chat/${SR.id}/${user.id}` : undefined
              }
              color={['Approved', 'Closed'].includes(SR.status) ? 'blue' : 'red'}
              underline="hover"
              variant="subtitle2"
            >
              {['Approved', 'Closed'].includes(SR.status) ? 'Join Chat Room' : 'No Chat Room'}
            </Link>
          </Typography>
        </TableCell>

        <TableCell>{SR.bug.title}</TableCell>
        <TableCell>{SR.dev?.username || 'No Dev assigned'}</TableCell>
        <TableCell>{SR.customer.username}</TableCell>

        <TableCell>
          <Label color={statusColor[SR.status]}>{SR.status}</Label>
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
        PaperProps={{ sx: { width: 140 } }}
      >
        <MenuItem onClick={() => handleCloseMenu()}>
          <Iconify icon="duo-icons:approved" sx={{ mr: 2 }} />
          Approve
        </MenuItem>
        {/* , , ,  */}
        <MenuItem onClick={() => setOpenDeleteDialog(true)} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Reject
        </MenuItem>

        <MenuItem onClick={() => setOpenDeleteDialog(true)} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Cancel
        </MenuItem>

        <MenuItem onClick={() => setOpenDeleteDialog(true)} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Close
        </MenuItem>
      </Popover>
    </>
  );
}

SupportRequestTableRow.propTypes = {
  SR: PropTypes.object.isRequired,
  user: PropTypes.object,
};
