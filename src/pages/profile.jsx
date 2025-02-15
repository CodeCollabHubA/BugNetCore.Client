import { Avatar, Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Iconify from 'src/components/iconify'
import UserModal from 'src/sections/user/user-model'

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [openCreateModal,setOpenCreateModal]=useState(false)
  
  return (
    <Container>
      <UserModal open={openCreateModal} handleClose={()=>setOpenCreateModal(false)} user={user} />
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h3">Profile</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="material-symbols:edit-rounded" />}
          onClick={() => setOpenCreateModal(true)}
        >
          Edit
        </Button>
      </Stack>

      <div >
        <div className='relative'>        
          <Avatar alt="Remy Sharp" src={user.picture} sx={{  width: 200, height: 200, m: '0 auto' }} />
        </div>
        <Box size={{ xs: 6, md: 8 }} padding={4}>
          <Box sx={{ width:'85%', margin:'auto', display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 3 }} spacing={2}>
            <TextField id="standard-basic" label="User Name" variant="standard"
              value={user.username}
              multiline
              maxRows={3}
            />
            <TextField id="standard-basic" label="Email" variant="standard"
              value={user.email}
              multiline
              maxRows={3}
            />
            <TextField id="standard-basic" label="Phone" variant="standard"
              value={user.phone || 'N/A'}
              multiline
              maxRows={3}
            />
            <TextField id="standard-basic" label="System Role" variant="standard"
              value={user.userRole}
              multiline
              maxRows={3}
            />
          </Box>
        </Box>
      </div>
    </Container>
  )
}
