import { PropTypes } from 'prop-types';
import { useMyContext } from 'src/hooks/contextApi';
import { Modal, Box, TextField, Button, Autocomplete } from '@mui/material';
import { Formik, Form, Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createBug,updateBug } from 'src/services/bugApiService';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

// Options
const categories = ['UI', 'Backend', 'Frontend', 'Database', 'Other'];
const severities = ['Urgent', 'High', 'Medium', 'Low'];



const BugModal = ({ open, handleClose, bug}) => {
  const {projects,bugs,setBugs}= useMyContext()


  const initialValues = {
    title: bug?.title||'',
    description: bug?.description||'',
    category: bug?.category||'',
    customerAssignedSeverity: bug?.customerAssignedSeverity||'',
    projectName:bug?.project.name||'',
    screenshotFile: bug?.screenshotFile||null,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('enter a title '),
    description: Yup.string().required('enter a description'),
    category: Yup.string().required('select a category'),
    customerAssignedSeverity: Yup.string().required('select a severity'),
    projectName: Yup.string().required('select a project name'),
    screenshotFile:Yup.mixed()
  });

  const handleSubmit = async (values) => {
    console.log('inside')
    const {id} = projects.find(e=>e.name === values.projectName)
    const formData = new FormData();
    formData.title =values.title
    formData.description =values.description
    formData.category =values.category
    formData.customerAssignedSeverity =values.customerAssignedSeverity
    formData.status ="Reported"
    formData.screenshotFile= values.screenshotFile
    formData.projectId =id
    formData.title= values.title
    
    
    // console.log(formData)

    try {

      if(bug){
        bug.title = formData.title
        bug.description = formData.description
        bug.category = formData.category
        bug.customerAssignedSeverity = formData.customerAssignedSeverity
        bug.screenshot = formData.screenshotFile
        const data = await updateBug(bug.id,bug)
        console.log('Bug submitted successfully:',data)
        const newBugs =[...bugs]
        const index = bugs.indexOf(bug)
        newBugs[index]={...bug}
        setBugs(newBugs)
      }else{
      
      const data = await createBug({...formData})
      const newBug = [...bugs];
        newBug.push({ ...data});
        setBugs(newBug);
      console.log('Bug submitted successfully:',data );
      }
      handleClose(); // Close modal after submission
    } catch (error) {
      console.error('Error submitting bug:', error);
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2>Report a Bug</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <Field name="title">
                {({ field }) => (
                  <TextField
                    {...field}
                    
                    label="Bug Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                )}
              </Field>
              <ErrorMessage name="title">
                { msg => <span style={{ color: 'red' }}>{msg}</span> }
              </ErrorMessage>
              <Field name="description">
                {({ field }) => (
                  <TextField
                    {...field}
                    
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                )}
              </Field>
              <ErrorMessage name="description">
                { msg => <span style={{ color: 'red' }}>{msg}</span> }
              </ErrorMessage>
              <Field name="category">
                {({ field }) => (
                  <Autocomplete
                    {...field}
                  
                    options={categories}
                    onChange={(event,value) => {setFieldValue('category', value)}}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                    )}
                  />
                )}
              </Field>
              <ErrorMessage name="category">
                { msg => <span style={{ color: 'red' }}>{msg}</span> }
              </ErrorMessage> 
              <Field name="customerAssignedSeverity">
                {({ field }) => (
                  <Autocomplete
                    {...field}
                    
                    options={severities}
                    onChange={(event, value) =>{setFieldValue('customerAssignedSeverity', value)}}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Severity"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                    )}
                  />
                )}
              </Field>
              <ErrorMessage name="customerAssignedSeverity">
                { msg => <span style={{ color: 'red' }}>{msg}</span> }
              </ErrorMessage> 
              <Field name="projectName">
                {({ field }) => (
                  <Autocomplete
                  {...field}
                  options={projects.map(project=>project.name)}
                  onChange={ (event,value) => {setFieldValue('projectName', value)}}
                  renderInput={(params) => (
                    <TextField
                    {...params}
                        label="Project Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                    )}
                    />
                  )}
              </Field>
              <ErrorMessage name="projectName">
                { msg => <span style={{ color: 'red' }}>{msg}</span> }
              </ErrorMessage>
              <Field name="screenshotFile" >
                {({ field }) => (
                  <TextField
                  {...field}
                  value={undefined}
                  type='file'
                  onChange={(event) => {setFieldValue('screenshotFile',event.currentTarget.files[0])                    
                  }}
                  fullWidth 
                  margin="normal"
                  />
                )}
              </Field>

              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default BugModal;
BugModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  bug:PropTypes.object
};
