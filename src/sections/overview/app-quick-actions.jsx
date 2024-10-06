import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

// import { useState } from 'react';
// import ConditionalRendering from './app-util';

// ----------------------------------------------------------------------

export default function AppQuickActions({ title, subheader, list, ...other }) {
  // const [openModal, setOpenModal] = useState(false);

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Box
        sx={{
          p: 3,
          gap: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
        }}
      >
        {list.map((site) => (
          // <ConditionalRendering key={site.name} path={site.path} open={openModal} handleClose ={() => setOpenModal(false)}>
          <Paper
            variant="outlined"
            sx={{
              py: 2.5,
              textAlign: 'center',
              ':hover': { boxShadow: 3 },
              borderBlockColor: 'dark',
            }}
          >
            <Box onClick={site.handleClick} sx={{ mb: 0.5, cursor: 'pointer' }}>
              {site.icon}
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {site.name}
              </Typography>
            </Box>
          </Paper>
          // </ConditionalRendering>
        ))}
      </Box>
    </Card>
  );
}

AppQuickActions.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};
