import toast, { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Await, defer, useParams, useRouteLoaderData } from 'react-router-dom';
import {  createComment,getAllCommentsWithFilterPaginationAndSorting } from 'src/services/commentApiService';
import { Suspense } from 'react';
import { Autocomplete, CircularProgress } from '@mui/material';
import { Formik,Form,Field } from 'formik';

// import { bugs } from 'src/_mock/bug';

// ----------------------------------------------------------------------

export default function BugDetailView() {
  const {role} = localStorage
  
  const { bugId } = useParams();
  const { comments } = useRouteLoaderData('bug_details');
  const bugs = useRouteLoaderData('bugs');
  const bug = bugs.find((b) => b.id === bugId);
  const developers=['Ahmed','Mohammed']
  const initialValues ={
    comment:''
  }
  const validationSchema = Yup.object({
    comment: Yup.string().required(),
  });

  // create a promise that resolve after 2 seconds
  const sendSupportRequest = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
    // 
  const handleLiveSupportRequest = () => {
    toast.promise(sendSupportRequest(), {
      loading: 'Sending a Live Support Request...',
      success: <b> Request Sent, you will be notified when an agent is available!</b>,
      error: <b> Could not send a request, please try again later.</b>,
      duration: 5000, // Set the duration in milliseconds (e.g. 5000 for 5 seconds)
    });
  };

  const editPage =()=>{
    console.log('editing')
  }
  const renderImg = (
    <Box
      component="img"
      alt={bug.id}
      src={`${bug.screenshot}`}
      sx={{
        top: 0,
        width: '20rem',
        height: '20rem',
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );
  const handleSubmitComment = async(values)=>{
    console.log('inside')
    console.log(values)
    const formData = new FormData();
    formData.commentText =values.comment
    formData.senderId = bug.customer.id
    formData.bugId = bugId
    console.log(formData)
    try {
      const res = await createComment({...formData})
      console.log('submitted comment is success',res)
    } catch (error) {
      console.error(error)
    }
  }
  const handleSave =()=>{
    console.log('saved')
  }
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
              onClick={role==='Admin'?editPage:handleLiveSupportRequest}
              variant="contained"
              size="medium"
              color="error"
              title={role==='Admin'?'Edit Page':"Request Live Support"} // edit here for  edit or support button in term of user role ##############
            >
              {role==='Admin'?'Edit Page':"Request Live Support"}
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
              {role==='Admin'?
              <Typography variant="body2">
                <strong>Admin Assigned Priority: </strong> {bug.adminAssignedPriority}
              </Typography>
              :null}
              <Typography variant="body2">
                <strong>Status: </strong> {bug.status}
              </Typography>
              <Typography variant="body2">
                <strong>Project Name: </strong> {bug.project.name}
              </Typography>
              <Typography variant="body2">
                <strong>Customer Name: </strong> {bug.customer.username}
              </Typography>
              <Typography variant="body2">
                
                {role==='Admin'?
                <Formik
                initialValues=''
                onSubmit={handleSave}
              >
                {({ setFieldValue }) => (
                  <Field name="developerName">
                  {({ field }) => (
                    <Autocomplete
                    {...field}
                    options={developers}
                    onChange={ value => {setFieldValue('developerName', value)}}
                    renderInput={(params) => (
                      <TextField
                      {...params}
                          label="Developer Name"
                          variant="outlined"
                          
                          margin="normal"
                        />
                      )}
                      />
                    )}
                </Field>)}
                </Formik>
                :<> <strong>Developer Name: </strong> {bug.dev} </>}
              </Typography>
            </Stack>
          </Card>
        </Grid>
        {/* begin of comments sections ##################### */}

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
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmitComment}
              >
              <Form>
                <Field name="comment">
                {({ field }) => (
                  <TextField
                    {...field}
                    
                    label="Your Comment"
                    variant="outlined"
                    size="small"
                    sx={{ flexGrow: 1, mr: 2 }}
                  />
                )}
              </Field>
                  <Button type='submit' variant="contained" color="primary">
                    Send
                  </Button>
                </Form>
              
              </Formik>
                
              </Box>
            </Stack>
          </Card>
        </Grid>
              {/* end of comment section ################### */}
      </Grid>
    </Container>
  );
}


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
