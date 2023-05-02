import useForm from '../hooks/FormHooks';
import {useUser} from '../hooks/ApiHooks';
import {Box, Button} from '@mui/material';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {updateUserErrorMessages} from '../utils/errorMessages';
import {updateUserValidators} from '../utils/validator';
import {useContext, useEffect} from 'react';
import {MediaContext} from '../contexts/MediaContext';

const UpdateUserForm = () => {
  const {putUser, getCheckUser} = useUser();
  const {setSnackbar, setSnackbarOpen} = useContext(MediaContext);

  const initValues = {
    username: '',
    password: '',
    confirm: '',
    email: '',
    full_name: '',
  };

  const DoModify = async () => {
    try {
      const token = localStorage.getItem('token');
      const withoutConfirm = {...inputs};
      delete withoutConfirm.confirm;
      if (withoutConfirm.username === '') {
        delete withoutConfirm.username;
      }
      if (withoutConfirm.password === '') {
        delete withoutConfirm.password;
      }
      if (withoutConfirm.email === '') {
        delete withoutConfirm.email;
      }
      if (withoutConfirm.full_name === '') {
        delete withoutConfirm.full_name;
      }
      const userResult = await putUser(withoutConfirm, token);
      setSnackbar({severity: 'success', message: userResult.message});
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbar({severity: 'error', message: error.message});
      setSnackbarOpen(true);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    DoModify,
    initValues
  );

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      return value === inputs.password;
    });
    ValidatorForm.addValidationRule('isUsernameAvailable', async (value) => {
      if (value === '') return true;
      try {
        return await getCheckUser(inputs.username);
      } catch (error) {
        console.error(error.message);
      }
    });
    ValidatorForm.addValidationRule('isEmptyOrMin5', (value) => {
      return value === '' || value.length >= 5;
    });
    ValidatorForm.addValidationRule('isEmptyOrMin3', (value) => {
      return value === '' || value.length >= 3;
    });
    ValidatorForm.addValidationRule('isEmptyOrMin2', (value) => {
      return value === '' || value.length >= 2;
    });
  }, [inputs]);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          pl: {xs: 3, sm: 1, md: 3},
          pr: {xs: 3, sm: 0},
          mt: {xs: 0, sm: 2, md: 8},
        }}
      >
        <ValidatorForm onSubmit={handleSubmit} noValidate>
          <TextValidator
            fullWidth
            margin="dense"
            name="username"
            label="Username"
            onChange={handleInputChange}
            value={inputs.username}
            validators={updateUserValidators.username}
            errorMessages={updateUserErrorMessages.username}
          />
          <TextValidator
            fullWidth
            margin="dense"
            name="password"
            type="password"
            label="Password"
            onChange={handleInputChange}
            value={inputs.password}
            validators={updateUserValidators.password}
            errorMessages={updateUserErrorMessages.password}
          />
          <TextValidator
            fullWidth
            margin="dense"
            name="confirm"
            type="password"
            label="Confirm password"
            onChange={handleInputChange}
            value={inputs.confirm}
            validators={updateUserValidators.confirmPassword}
            errorMessages={updateUserErrorMessages.confirmPassword}
          />
          <TextValidator
            fullWidth
            margin="dense"
            name="email"
            type="email"
            label="Email"
            onChange={handleInputChange}
            value={inputs.email}
            validators={updateUserValidators.email}
            errorMessages={updateUserErrorMessages.email}
          />
          <TextValidator
            fullWidth
            margin="dense"
            name="full_name"
            label="Name"
            onChange={handleInputChange}
            value={inputs.full_name}
            validators={updateUserValidators.fullName}
            errorMessages={updateUserErrorMessages.fullName}
          />
          <Button fullWidth variant="contained" sx={{mt: 1}} type="submit">
            Update user info
          </Button>
        </ValidatorForm>
      </Box>
    </>
  );
};

export default UpdateUserForm;
