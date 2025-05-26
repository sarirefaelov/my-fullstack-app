import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography, Container, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../../../features/user/userSlice';
import { loginUser } from '../../../features/user/userAPI';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const currentUser = useSelector((state) => state.user.currentUser);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      //id: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    }),
   
    onSubmit: async (values) => {
      dispatch(loginStart());
      try {
        const data = await loginUser(values); // ← כאן את מקבלת את ה-id
        console.log("Response from server:", data); // תוודאי שה-id מופיע כאן

        dispatch(loginSuccess({ user: data.user, role: "user" })); // ← שומר את id
        setMessage('Login successful!');
        setOpenSnackbar(true);
        setTimeout(() => navigate('/'), 2000);
      } catch (error) {
        dispatch(loginFailure("Login failed"));
        setMessage('Login failed: ' + (error.response?.data?.error || error.message));
        setOpenSnackbar(true);
      }
    }

  
  });

return (
  <Container
    maxWidth="xs"
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // background: 'linear-gradient(135deg, #faf6f0 0%, #fffefb 100%)', // רקע מאוד בהיר עם נגיעות שמנת
    }}
  >
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        width: '100%',
        bgcolor: '#fcf9f4', // רקע קרם-לבן מאוד בהיר
        padding: 5,
        borderRadius: 3,
        boxShadow: '0 8px 20px rgba(180, 150, 100, 0.15)', // צל רך עם גוון חום בהיר
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 12px 30px rgba(180, 150, 100, 0.25)',
        },
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          color: '#b8986d', // חום בהיר ורך
          fontWeight: '700',
          mb: 1,
          fontFamily: "'Georgia', serif",
        }}
      >
        Welcome Back
      </Typography>

      {['username', 'email', 'password'].map((field) => (
        <TextField
          key={field}
          label={field.charAt(0).toUpperCase() + field.slice(1)}
          id={field}
          name={field}
          type={field === 'password' ? 'password' : 'text'}
          value={formik.values[field]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched[field] && Boolean(formik.errors[field])}
          helperText={formik.touched[field] && formik.errors[field]}
          fullWidth
          variant="outlined"
          sx={{
            bgcolor: '#f7f2e7', // שדות טקסט קרם-לבן רך
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#d7c5a3',
              },
              '&:hover fieldset': {
                borderColor: '#b8986d',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#a1834e',
              },
            },
            fontFamily: "'Georgia', serif",
          }}
        />
      ))}

      <Button
        type="submit"
        variant="contained"
        sx={{
          bgcolor: '#b8986d',
          color: 'white',
          fontWeight: '700',
          paddingY: 1.5,
          fontFamily: "'Georgia', serif",
          '&:hover': {
            bgcolor: '#a1834e',
            boxShadow: '0 4px 12px rgba(161, 131, 78, 0.4)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        Login
      </Button>
    </Box>

    <Snackbar
      open={openSnackbar}
      autoHideDuration={6000}
      onClose={() => setOpenSnackbar(false)}
      message={message}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{
        '& .MuiSnackbarContent-root': {
          bgcolor: message.toLowerCase().includes('failed') ? '#d56c4a' : '#a1834e',
          color: 'white',
          fontFamily: "'Georgia', serif",
        },
      }}
    />
  </Container>

);
};

export default Login;
