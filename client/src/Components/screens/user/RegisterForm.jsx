import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography, Container, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../features/user/userSlice';
import axios from 'axios';
// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const BASE_URL = "https://viewart.onrender.com/api";

const RegisterForm = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${BASE_URL}/users/register`, values);

        dispatch(loginSuccess({ user: response.data.user, role: "user" }));
        setMessage('Registration successful! Redirecting...');
        setOpenSnackbar(true);
        setTimeout(() => navigate('/Home'), 2000);
      } catch (error) {
        setMessage('Error during registration: ' + (error.response?.data?.error || error.message));
        setOpenSnackbar(true);
      }
    },
  });

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          width: '100%',
          bgcolor: '#fcf9f4',
          padding: 5,
          borderRadius: 3,
          boxShadow: '0 8px 20px rgba(180, 150, 100, 0.15)',
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
            color: '#b8986d',
            fontWeight: '700',
            mb: 1,
            fontFamily: "'Georgia', serif",
          }}
        >
          Register
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
              bgcolor: '#f7f2e7',
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
          Register
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
            bgcolor: message.toLowerCase().includes('error') ? '#d56c4a' : '#a1834e',
            color: 'white',
            fontFamily: "'Georgia', serif",
          },
        }}
      />
    </Container>
  );
};

export default RegisterForm;

