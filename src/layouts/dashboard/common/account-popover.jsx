import { useState } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useSubmit } from 'react-router-dom';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  // {
  //   label: 'Home',
  //   icon: 'eva:home-fill',
  // },
  // {
  //   label: 'Settings',
  //   icon: 'eva:settings-2-fill',
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter()
  const [open, setOpen] = useState(null);
  const submit = useSubmit();
  const [user, setUser] = useState();

  setTimeout(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, 300);
  
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClick = (dist) => {
    if(dist === 'Profile')
      router.push('/profile')

    setOpen(null);

  };

  const handleLogout = () => {
    submit(null, { method: 'post', action: '/logout' });
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={user?.picture}
          alt={user?.username}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user?.username.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClick}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={()=>handleClick(option.label)}>
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
