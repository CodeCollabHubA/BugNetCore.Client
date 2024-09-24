import  { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Box, TextField, Button, Autocomplete } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { getProjectData } from 'src/services/projectApiService';
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



const CreateBugModal = ({ open, handleClose,bug}) => {
  // console.log(bug)
  const [projects,setProjects]=useState([])
  useEffect(()=>{
    const getproject=async()=>{
      try {
        const data = await getProjectData()
        setProjects(data)
      } catch (error) {
        console.log(error)
      }
    }
    getproject()
  },[])


  const initialValues = {
    description: bug?.description||'',
    category: bug?.category||'',
    customerAssignedSeverity: bug?.customerAssignedSeverity||'',
    projectName:bug?.project.name||'',
    screenshotFile: bug?.screenshot||null,
  };

  const validationSchema = Yup.object({
    description: Yup.string().required('enter a description'),
    category: Yup.string().required('select a category'),
    customerAssignedSeverity: Yup.string().required('select a severity'),
    projectName: Yup.string().required('select a project name'),
    screenshot:Yup.mixed()
  });

  const handleSubmit = async (values) => {
    console.log('inside')
    console.log(values)
    const {id} = projects.find(e=>e.name === values.projectName)
    const formData = new FormData();
    formData.description =values.description
    formData.category =values.category
    formData.customerAssignedSeverity =values.customerAssignedSeverity
    formData.status ="Reported"
    formData.screenshot= values.screenshot
    formData.projectId =id
    
    
    console.log(formData)

    try {

      if(bug){
        formData.id = bug.id
        formData.rowVersion = bug.rowVersion
        const data = await updateBug(bug.id,{...formData})
        console.log('Bug submitted successfully:',data)
      }else{
      
      const data = await createBug({...formData})
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
              {/* <ErrorMessage name="description" component="span" className='text-red-600' /> */}
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
              {/* <ErrorMessage name="category" component="span" className='text-red-600'/> */}
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
              {/* <ErrorMessage name="customerAssignedSeverity" component="span" className='text-red-600' /> */}
              <Field name="projectName">
                {({ field }) => (
                  <Autocomplete
                  {...field}
                  options={projects.map(e=>e.name)}
                  onChange={ value => {setFieldValue('projectName', value)}}
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
              {/* <ErrorMessage name="projecName" component="span" className='text-red-600' /> */}
              <Field name="screenshot" >
                {({ field }) => (
                  <TextField
                  {...field}
                  value={undefined}
                  type='file'
                  onChange={(event) => {setFieldValue('screenshot',event.currentTarget.files[0])                    
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

export default CreateBugModal;
CreateBugModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  bug:PropTypes.object
};
