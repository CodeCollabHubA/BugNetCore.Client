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
import { Suspense, useState } from 'react';
import { Autocomplete, CircularProgress } from '@mui/material';
import { Formik,Form,Field } from 'formik';
import { updateBug } from 'src/services/bugApiService';

// import { bugs } from 'src/_mock/bug';

// ----------------------------------------------------------------------

export default function BugDetailView() {
  const {role} = localStorage
  const severities = ['Urgent', 'High', 'Medium', 'Low'];
  const { bugId } = useParams();
  const { comments } = useRouteLoaderData('bug_details');
  const [comment,setComment] = useState([...comments])
  const [editing,setEditing] = useState(false)
  const bugs = useRouteLoaderData('bugs');
  const bug = bugs.find((b) => b.id === bugId);
  const developers=['Ahmed','Mohammed']

  const initialValues ={
    commentText:'',
  }
  const devinitialValues ={
    developerName:'',
    adminAssignedPriority:''
  }
  const validationSchema = Yup.object({
    commentText: Yup.string().required(),
  });
  const devValidationSchema = Yup.object({
    developerName: Yup.string(),
    adminAssignedPriority: Yup.string(),
  });
 
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

  const editBugDetails =()=>{
    console.log(role,'role')
    setEditing(!editing)
  }
  const renderImg = (
    <Box
      component="img"
      alt={bug.id}
      src={`${bug.screenshot}`}
      sx={{
        top: 0,
        height: '20rem',
        position: 'relative',
        margin:'1rem ',
        borderRadius:'1rem'
      }}
    />
  );


  const handleSubmitComment = async(values,{resetForm})=>{

    const formData = new FormData();
    formData.commentText =values.commentText
    formData.senderId = bug.customer.id
    formData.bugId = bugId
 

    try {
      resetForm()
      const res = await createComment({...formData})
      const newComment = [...comments]
      newComment.push({...res})
      setComment(newComment)
      console.log('submitted comment is success',res)
    } catch (error) {
      console.error(error)
      
    }
  }
  const handleSave =async(values)=>{
    console.log('insideSaving')
    const formData = new FormData();
    formData.dev =values.developerName
    formData.adminAssignedPriority= values.adminAssignedPriority
    formData.bugId =bug.id
    formData.description= bug.description
    formData.status= bug.status
    formData.ProjectId= bug.project.id
    formData.category= bug.category
    
    try {
        const data = await updateBug(bugId,{...formData})
        console.log('Developer Added successfully:',data)
        setEditing(false)
    }catch(ex){
      console.log(ex)
    }

  }
  return (
    <Container>
      <Toaster />
      <Typography variant="h4" sx={{ mb: 5 }}>
        Bug Detail
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={7}>
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction={{ xs: 'row' }}
            alignItems="center"
            justifyContent={{ xs: 'space-between' }}
            sx={{ paddingBottom: 3 }}
          >
            <Typography variant="h5">Bug Detail:</Typography>
            <Button
              onClick={role==='Admin'?editBugDetails:handleLiveSupportRequest}
              variant="contained"
              size="medium"
              color="error"
              title={role==='Admin'?'Edit details':"Request Live Support"} // edit here for  edit or support button in term of user role ##############
            >
              {role==='Admin'?'Edit details':"Request Live Support"}
            </Button>
          </Stack>

          <Card>
            <Box sx={{display:'flex',justifyContent:'center',  position: 'relative' }}>{renderImg}</Box>

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
                <strong>Status: </strong> {bug.status}
              </Typography>
              <Typography variant="body2">
                <strong>Project Name: </strong> {bug.project.name}
              </Typography>
              <Typography variant="body2">
                <strong>Customer Name: </strong> {bug.customer.username}
              </Typography>
                
                {editing?
                <Formik
                initialValues={devinitialValues}
                validationSchema={devValidationSchema}
                onSubmit={handleSave}
              >
                {({ setFieldValue }) => (
                  <Form>
                    <Field name="adminAssignedPriority">
                      {({ field }) => (
                        <Autocomplete
                          {...field}
                          options={severities}
                          onChange={ (event,value)=> {setFieldValue('adminAssignedPriority', value)}}
                          renderInput={(params) => (
                          <TextField
                            {...params}
                            label="AssignedPriority"
                            variant="outlined"
                            margin='dense'
                            size="small"
                            sx={{width:'60%'}}
                            />
                          )}/>
                        )}
                    </Field>
                    <Field name="developerName">
                      {({ field }) => (
                        <Autocomplete
                          {...field}
                          options={developers}
                          onChange={ (event,value)=> {setFieldValue('developerName', value)}}
                          renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Developer Name"
                            variant="outlined"
                            margin='dense'
                            size="small"
                            sx={{width:'60%'}}
                            />
                          )}/>
                        )}
                    </Field>
                    
                    <Button type="submit" variant="contained" sx={{mt:'.5rem'}} color="primary">
                      Save
                    </Button>
                  </Form>
                  )}
                </Formik>
                :<>
                <Typography variant="body2">
                <strong>Admin Assigned Priority: </strong> {bug.adminAssignedPriority}
                </Typography>
                <Typography variant="body2"> <strong>Developer Name: </strong> {bug.dev} </Typography>
                </>
                }
              
            </Stack>
          </Card>
        </Grid>
        {/* begin of comments sections ##################### */}

        <Grid item xs={12} md={6} lg={5}>
          <Stack spacing={2} sx={{ paddingBottom: 4 }}>
            <Typography variant="h5">Comments:</Typography>
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
                    {
                      comment.map((item) => (
                        <Box key={item.id} sx={{ mb: 2 }}>
                          <Typography variant="subtitle2">
                            <strong>
                              {item.sender.username} ({item.sender.userRole}):
                            </strong>
                          </Typography>
                          <Typography variant="body2">{item.commentText}</Typography>
                        </Box>
                      ))
                    }
                  </Await>
                </Suspense>
              </Box>
              <Box sx={{ display: 'flex', justifyContent:'center', mt: 2 }}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmitComment}
              >
                
              <Form>
                <Field name="commentText">
                {({ field }) => (
                  <TextField
                    {...field}
                    onT
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



export async function loader({ request, params }) {
  const id = params.bugId;
  const { records } = await getAllCommentsWithFilterPaginationAndSorting('bug.id', id)
  return defer({comments: records});
}
// async function loadComments(id) {
//   const { records } = await getAllCommentsWithFilterPaginationAndSorting('bug.id', id);
//   return records;
// }
// export async function loader({ request, params }) {
//   const id = params.bugId;
//   return defer({
//     comments: loadComments(id),
//   });
// }
