import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import UserModal from './user-model';

// ----------------------------------------------------------------------

export default function UserTableRow({
  username,
  avatarUrl,
  email,
  role,
  isVerified,
  user
}) {
  const [open, setOpen] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEdit=()=>{
    // setEdit()
    console.log('clg')
  }

  return (
    <>
      <UserModal open={openCreateModal} handleClose={() => setOpenCreateModal(false)} user={user} />
      <TableRow hover tabIndex={-1} role="checkbox" >{/* selected={selected} */}
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}
        <TableCell>{null}</TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={username} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {username}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>{role}</TableCell>

        <TableCell align="center">
        <Label color={(isVerified === false) || 'success'}>{isVerified ? 'Yes' : 'No'}</Label>
        </TableCell>

        {/* <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell> */}

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
        PaperProps={{sx: "width: 140" }}
      >
        <MenuItem onClick={()=>{
          handleCloseMenu()
          setOpenCreateModal(true)
          handleEdit()
        }}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  email: PropTypes.string,
  isVerified: PropTypes.any,
  username: PropTypes.string,
  role: PropTypes.string,
  // status: PropTypes.string,
  user:PropTypes.object
};
