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
import { deleteBug } from 'src/services/bugApiService';
import toast from 'react-hot-toast';
import Iconify from 'src/components/iconify';
import ConfirmationDialog from '../confirmation-dialog';
import BugModal from './bug-modal';

// ----------------------------------------------------------------------
// id, description, projectName, category, status;
export default function BugTableRow({ bug }) {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [open, setOpen] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [edit,setEdit]=useState(bug)
  const navigate = useNavigate();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleEdit=()=>{
    setEdit(bug)
  }
  const handleBugDeletion = async () => {
    const asyncOperation = async () => {
      setOpenDeleteDialog(false);
      return deleteBug(bug.id, bug.rowVersion);
    };
    await toast.promise(asyncOperation(), {
      loading: 'Processing...',
      success: (data) => `Bug deleted successfuly`,
      error: (err) => `Sorry, try again!`,
      duration: 3000,
    });
    setTimeout(() => {
      navigate(0);
    }, 1000);
  };

  let statusColor;
  switch (bug.status) {
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
    <BugModal open={openCreateModal} handleClose={() => setOpenCreateModal(false)} bug={edit} />
      <ConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleBugDeletion}
      />
      <TableRow hover>
        <TableCell>
          <Typography variant="subtitle2">
            {' '}
            <Link
              component={ReactRouterLink}
              to={`${bug.id}`}
              color="inherit"
              underline="hover"
              variant="subtitle2"
            >
              {bug.id}
            </Link>{' '}
          </Typography>
        </TableCell>


        <TableCell>{bug.project.name}</TableCell>

        <TableCell>{bug.description}</TableCell>

        <TableCell align="center">{bug.category}</TableCell>

        <TableCell>
          <Label color={statusColor}>{bug.status}</Label>
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
        <MenuItem onClick={()=>{
          handleCloseMenu()
          setOpenCreateModal(true)
          handleEdit()
        }}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={() => setOpenDeleteDialog(true)} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

BugTableRow.propTypes = {
  bug: PropTypes.object.isRequired,
};
