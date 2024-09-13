import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Await, defer, useRouteLoaderData } from 'react-router-dom';
import { getAllCommentsWithFilterPaginationAndSorting } from 'src/services/commentApiService';
import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';

// import { bugs } from 'src/_mock/bug';

// ----------------------------------------------------------------------

export default function BugDetailView({ bugId }) {
  const { comments } = useRouteLoaderData('bug_details');
  const bugs = useRouteLoaderData('bugs');
  const bug = bugs.find((b) => b.id === bugId);

  // create a promise that resolve after 2 seconds
  const sendSupportRequest = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  const handleLiveSupportRequest = () => {
    toast.promise(sendSupportRequest(), {
      loading: 'Sending a Live Support Request...',
      success: <b> Request Sent, you will be notified when an agent is available!</b>,
      error: <b> Could not send a request, please try again later.</b>,
      duration: 5000, // Set the duration in milliseconds (e.g. 5000 for 5 seconds)
    });
  };
  const renderImg = (
    <Box
      component="img"
      alt={bug.id}
      src={bug.screenshot}
      sx={{
        top: 0,
        width: '100%',
        height: '400px',
        objectFit: 'fill',
        position: 'absolute',
      }}
    />
  );

  return (
    <Container>
      <Toaster />
      <Typography variant="h4" sx={{ mb: 5 }}>
        Bug Detail
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={8}>
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction={{ xs: 'row' }}
            alignItems="center"
            justifyContent={{ xs: 'space-between' }}
            sx={{ paddingBottom: 3 }}
          >
            <Typography variant="h6">Bug Detail:</Typography>
            <Button
              onClick={handleLiveSupportRequest}
              variant="contained"
              size="medium"
              color="error"
              title="Request Live Support"
            >
              Request Live Support
            </Button>
          </Stack>

          <Card>
            <Box sx={{ pt: '56%', position: 'relative' }}>{renderImg}</Box>

            <Stack spacing={2} sx={{ p: 3 }}>
              <Typography variant="subtitle2">
                <strong>Bug Id: </strong>
                {bug.id}
              </Typography>
              <Typography variant="body1">
                <strong>Description: </strong> {bug.description}
              </Typography>
              <Typography variant="body2">
                <strong>Category:</strong> {bug.category}
              </Typography>
              <Typography variant="body2">
                <strong>Customer Assigned Severity:</strong> {bug.customerAssignedSeverity}
              </Typography>
              <Typography variant="body2">
                <strong>Admin Assigned Priority: </strong> {bug.adminAssignedPriority}
              </Typography>
              <Typography variant="body2">
                <strong>Status: </strong> {bug.status}
              </Typography>
              <Typography variant="body2">
                <strong>Project Name: </strong> {bug.projectName}
              </Typography>
              <Typography variant="body2">
                <strong>Customer Name: </strong> {bug.customerName}
              </Typography>
              <Typography variant="body2">
                <strong>Developer Name: </strong> {bug.devName}
              </Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Stack spacing={2} sx={{ paddingBottom: 3 }}>
            <Typography variant="h6">Comments:</Typography>
          </Stack>

          <Card>
            <Stack spacing={2} sx={{ p: 3 }}>
              <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                <Suspense
                  fallback={
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  }
                >
                  <Await resolve={comments}>
                    {(loadedComments) =>
                      loadedComments.map((comment) => (
                        <Box key={comment.id} sx={{ mb: 2 }}>
                          <Typography variant="subtitle2">
                            <strong>
                              {comment.sender.username} ({comment.sender.userRole}):
                            </strong>
                          </Typography>
                          <Typography variant="body2">{comment.commentText}</Typography>
                        </Box>
                      ))
                    }
                  </Await>
                </Suspense>
              </Box>

              <Box sx={{ display: 'flex', mt: 2 }}>
                <TextField
                  label="Your Comment"
                  variant="outlined"
                  size="small"
                  sx={{ flexGrow: 1, mr: 2 }}
                />
                <Button variant="contained" color="primary">
                  Send
                </Button>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

BugDetailView.propTypes = {
  bugId: PropTypes.string.isRequired,
};

async function loadComments(id) {
  const { records } = await getAllCommentsWithFilterPaginationAndSorting('bug.id', id);
  return records;
}
export async function loader({ request, params }) {
  const id = params.bugId;
  return defer({
    comments: loadComments(id),
  });
}
