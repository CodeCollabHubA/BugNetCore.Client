import { PropTypes } from 'prop-types';
import { Modal, Box, TextField, Button, Autocomplete } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { updateUser } from 'src/services/userApiService';
import { useMyContext } from 'src/hooks/contextApi';


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
const{user:currentUser}=useMyContext()

  const initialValues = {
    userRole:user?.role||'',
    username:user?.username||'',
    phone:user?.phone||'N/A',
    picture:user?.picture||''
  };

  const validationSchema = Yup.object({
    userRole: Yup.string(),
    userName:Yup.string(),
    Phone: Yup.number(),
    picture:Yup.mixed()
  });
  const handleSubmit = async (values) => {
console.log('inside')
    const formData = new FormData();
    formData.userRole =values.userRole
    formData.username= values.username
    formData.picturefile=values.picture
    formData.id=user.id
    formData.email=user.email


    try {

        const data = await updateUser(user.id,{...formData})
        console.log('user updated successfully:',data)

        if(user.id===currentUser.id){
          localStorage.setItem('user',JSON.stringify(data))
        }
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
              <Field name="username">
                {({ field }) => (
                      <TextField
                        {...field}
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                )}
              </Field>
              <Field name="phone">
                {({ field }) => (
                      <TextField
                      {...field}

                        label="Phone"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                )}
              </Field>
              <Field name="picture" >
                              {({ field }) => (
                                <TextField
                                {...field}
                                value={undefined}
                                type='file'
                                onChange={(event) => {setFieldValue('picture',event.currentTarget.files[0])                    
                                }}
                                fullWidth 
                                margin="normal"
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
