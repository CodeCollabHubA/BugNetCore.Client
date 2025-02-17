import { PropTypes } from 'prop-types';
import { useMyContext } from 'src/hooks/contextApi';
import { Modal, Box, TextField, Button, Autocomplete } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updatesupportRequest } from 'src/services/supportRequestApiService';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: "100%", sm: "75%", md: "50%" },
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '1rem'
};


const SupportRequestModal = ({ open, handleClose, SR }) => {
    const { users } = useMyContext()
    const developers = users.filter(ele => ele.userRole === 'Dev').map(ele=>ele.username)
    

    
    const initialValues = {
        developer: '',
    };

    const validationSchema = Yup.object({
        developer: Yup.string().required('Enter a Developer '),

    });

    const handleSubmit = async (values) => {
        console.log(values,'that')
        const dev = users.find(ele => ele.username === values.developer)
console.log(dev,'this is dev')
        const formData = new FormData
        formData.supportDevId = dev.id
        formData.id=SR.id
        formData.status=SR.status
        formData.rowVersion=SR.rowVersion
        
        console.log(formData)
        try {
            const res = await updatesupportRequest(SR.id, {...formData})
            console.log(res, 'update happend')
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <h2>Select Developer</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue }) => (
                        <Form>
                            <Field name="developer">
                                {({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        options={developers}
                                        onChange={(event, value) => { setFieldValue('developer', value) }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="developer"
                                                variant="outlined"
                                                fullWidth
                                                margin="normal"
                                            />
                                        )}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="Developer">
                                {msg => <span style={{ color: 'red' }}>{msg}</span>}
                            </ErrorMessage>
                            <Button sx={{ width: '100%' }} type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
};

export default SupportRequestModal;

SupportRequestModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    SR: PropTypes.object
};
