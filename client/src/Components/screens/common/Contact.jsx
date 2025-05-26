import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";

const Contact = () => {
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleChange = (e) => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // כאן אפשר להוסיף שליחה לשרת או כל פעולה אחרת
    setSnackbar({ open: true, message: 'ההודעה נשלחה בהצלחה!' });
    setValues({ fullName: '', email: '', message: '' });
  };

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
        onSubmit={handleSubmit}
        sx={{
          mt: 10,
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
            fontFamily: "'Georgia', serif",
          }}
        >
          יצירת קשר
        </Typography>

        <TextField
          label="שם מלא"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={textFieldStyle}
        />

        <TextField
          label="כתובת אימייל"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={textFieldStyle}
        />

        <TextField
          label="הודעה"
          name="message"
          multiline
          rows={4}
          value={values.message}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={textFieldStyle}
        />

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
          שלח/י הודעה
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            bgcolor: '#a1834e',
            color: 'white',
            fontFamily: "'Georgia', serif",
          },
        }}
      />
    </Container>
  );
};

const textFieldStyle = {
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
};

export default Contact;
