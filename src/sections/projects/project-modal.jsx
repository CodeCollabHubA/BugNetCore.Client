// import { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useMyContext } from 'src/hooks/contextApi';
import { Modal, Box, TextField, Button } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createProject, updateProject } from 'src/services/projectApiService';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius:'1rem'
};

// Options



const ProjectModal = ({ open, handleClose, project}) => {

const {projects,setProjects}=useMyContext()

  const initialValues = {
    projectName:project?.name||'', 
    description:project?.description||'', 
  };

  const validationSchema = Yup.object({
    projectName: Yup.string().required('enter a name'),
    description: Yup.string().required('enter a description'),

  });

  const handleSubmit = async (values) => {
    console.log('inside')
    
    const formData = new FormData();
    formData.name =values.projectName
    formData.description =values.description
    

    try {
      if(project){
        console.log('inside updatae')
        project.name = formData.name
        project.description = formData.description
        const data = await updateProject(project.id,project)
        console.log('Project Changes saved successfully:',data)
        const newProjects =[...projects]
        const index = projects.indexOf(project)
        newProjects[index]={...project}
        setProjects(newProjects)
      }else{
        const data = await createProject({...formData})
        const newProject = [...projects];
        newProject.push({ ...data});
        setProjects(newProject);
        console.log('Project submitted successfully:',data );
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
