import { PropTypes } from 'prop-types';
import { useMyContext } from 'src/hooks/contextApi';
import { Modal, Box, TextField, Button, Autocomplete } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { updateUser } from 'src/services/userApiService';


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

const userRole = ["Admin", "Customer","Dev"];



const UserModal = ({ open, handleClose, user}) => {

  const {users,setUsers}=useMyContext()

  const initialValues = {
    userRole:user?.role||'',
  };

  const validationSchema = Yup.object({
    userRole: Yup.string(),
  });

  const handleSubmit = async (values) => {
    console.log('inside')
    const formData = new FormData();
    formData.userRole =values.userRole
    
    console.log(formData)
    console.log(user)
    try {

        console.log('inside updatae')
        user.userRole = formData.userRole
        const data = await updateUser(user.id,user)
        console.log('user Role changed successfully:',data)
        const newUsers =[...users]
        const index = users.indexOf(user)
        newUsers[index]={...user}
        setUsers(newUsers)
        handleClose(); // Close modal after submission

    } catch (error) {
      console.error('Error submitting bug:', error);
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2>Edit user role</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <Field name="userRole">
                {({ field }) => (
                  <Autocomplete
                    {...field}
                    options={userRole}
                    onChange={(event,value) => {setFieldValue('userRole', value)}}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="User Role"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                    )}
                  />
                )}
              </Field>

              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default UserModal;
UserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  user:PropTypes.object
};
