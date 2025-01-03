import { Avatar, Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

export default function Profile (){
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
  return (
    <Container>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Profile</Typography>

        <Button
          variant="contained"
          color="inherit"
        //   startIcon={<Iconify icon="eva:plus-fill" />}
        //   onClick={() => setOpenCreateModal(true)}
        >
          Edit
        </Button>
      </Stack>

      <Box padding={5} sx={{ display: 'grid', gridTemplateColumns: '30% 70%' }}>
            <Avatar alt="Remy Sharp" src={user.picture}
                sx={{ width: 200, height: 200, m: '0 auto'}}/>
                <Box size={{ xs: 6, md: 8 }} padding={4}>
                  <Box sx={{display:'grid',gridTemplateColumns: 'repeat(2,1fr)',gap:3}} spacing={2}>
                    <TextField  id="standard-basic" label="Name" variant="standard"
                      value={user.username}
                      multiline
                      maxRows={3}
                    /> 
                    <TextField  id="standard-basic" label="Email" variant="standard" 
                      value={user.email}
                      multiline
                      maxRows={3}
                    /> 
                    <TextField  id="standard-basic" label="Phone" variant="standard"
                      value={user.phone||'N/A'}
                      multiline
                      maxRows={3}
                    /> 
                    <TextField  id="standard-basic" label="System Role" variant="standard" 
                      value={user.userRole}
                      multiline
                      maxRows={3}
                    /> 
                  </Box>
        {/* <TextField id="standard-basic" label="Phone" variant="standard" />
        <TextField id="standard-basic" label="Email" variant="standard" />
        <TextField id="standard-basic" label="Country" variant="standard" /> */}
                </Box>
      </Box>
    </Container>
  )
}
