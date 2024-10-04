import { PropTypes } from 'prop-types';
import { Modal, Box, TextField, Button, Autocomplete } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createProject, updateProject } from 'src/services/projectApiService';


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



const ProjectModal = ({ open, handleClose, project}) => {



  const initialValues = {
    projectName:project?.name||'', 
    description:project?.description||'', 
    category:'',
  };

  const validationSchema = Yup.object({
    projectName: Yup.string().required('enter a name'),
    description: Yup.string().required('enter a description'),
    category: Yup.string().required('select a category'),

  });

  const handleSubmit = async (values) => {
    console.log('inside')
    
    const formData = new FormData();
    formData.name =values.projectName
    formData.description =values.description
    formData.category =values.category
    
    console.log(formData)

    try {
      if(project){
        formData.id = project.id
        const data = await updateProject(project.id,{...formData})
        console.log('Bug submitted successfully:',data)
      }else{
      
      const data = await createProject({...formData})
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
        <h2>Add a Project</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <Field name="projectName">
                {({ field }) => (
                  <TextField
                    {...field}
                    
                    label="Project Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    />
                  )}
              </Field>
              <ErrorMessage name="projectName">
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

export default ProjectModal;
ProjectModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  project:PropTypes.object
};
