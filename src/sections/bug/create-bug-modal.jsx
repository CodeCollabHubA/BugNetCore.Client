import React from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Box, TextField, Button, Autocomplete } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import http from 'src/services/httpService';

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
const statuses = ['Reported', 'InProgress', 'Resolved', 'Testing'];

const CreateBugModal = ({ open, handleClose }) => {
  const initialValues = {
    description: '',
    category: '',
    customerAssignedSeverity: '',
    status: '',
    projectId: '',
    customerId: '',
    screenshotFile: null,
  };

  const validationSchema = Yup.object({
    description: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    customerAssignedSeverity: Yup.string().required('Required'),
    status: Yup.string().required('Required'),
    projectId: Yup.string().required('Required'),
    customerId: Yup.string().required('Required'),
    screenshotFile: Yup.mixed(),
  });

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append('Description', values.description);
    formData.append('Category', values.category);
    formData.append('CustomerAssignedSeverity', values.customerAssignedSeverity);
    formData.append('Status', values.status);
    formData.append('ProjectId', values.projectId);
    formData.append('CustomerId', values.customerId);
    if (values.screenshotFile) {
      formData.append('ScreenshotFile', values.screenshotFile);
    }

    try {
      const response = await http.post('/api/v1-Beta/Bug', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Bug submitted successfully:', response.data);
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
              <Field name="category">
                {({ field }) => (
                  <Autocomplete
                    {...field}
                    options={categories}
                    onChange={(event, value) => setFieldValue('category', value)}
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
              <Field name="customerAssignedSeverity">
                {({ field }) => (
                  <Autocomplete
                    {...field}
                    options={severities}
                    onChange={(event, value) => setFieldValue('customerAssignedSeverity', value)}
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
              <Field name="status">
                {({ field }) => (
                  <Autocomplete
                    {...field}
                    options={statuses}
                    onChange={(event, value) => setFieldValue('status', value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Status"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                    )}
                  />
                )}
              </Field>
              <Field name="projectId">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Project ID"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                )}
              </Field>
              <Field name="customerId">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Customer ID"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                )}
              </Field>
              <Field name="screenshotFile">
                {({ field }) => (
                  <TextField
                    {...field}
                    type="file"
                    onChange={(event) => {
                      setFieldValue('screenshotFile', event.currentTarget.files[0]);
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
};
