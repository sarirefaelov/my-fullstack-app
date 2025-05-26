
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, setUserRole as setUserRoleRedux } from '../../../features/user/userSlice';
import { Typography, Button, Paper } from '@mui/material';

const LogoutManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setUserRoleRedux(null));
    navigate('/');
  };

  return (
    <Paper
      elevation={4}
      sx={(theme) => ({
        maxWidth: 360,
        margin: '194px auto',
        padding: 4,
        textAlign: 'center',
        borderRadius: 3,
        backgroundColor: '#f5f1ea',
        boxShadow: '0 4px 15px rgba(150, 75, 0, 0.2)',

        // רספונסיביות: במסכים קטנים נמקם למטה עם מרווח גדול
        [theme.breakpoints.down('sm')]: {
          margin: 'auto auto 208px auto',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          maxWidth: '100%',
          borderRadius: 0,
          boxShadow: '0 -4px 15px rgba(150, 75, 0, 0.3)',
        },
      })}
    >
      <Typography
        variant="h4"
        sx={{
          color: '#8b5e3c',
          fontWeight: '700',
          mb: 2,
        }}
      >
        התנתקות
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mb: 4,
          color: '#6e4b26',
        }}
      >
        התנתקת בהצלחה. תודה שהיית איתנו!
      </Typography>
      <Button
        variant="contained"
        onClick={handleLogout}
        sx={{
          backgroundColor: '#b5885a',
          '&:hover': {
            backgroundColor: '#8b6a3f',
          },
          fontWeight: '600',
          padding: '10px 20px',
          color: '#fff',
          textTransform: 'none',
        }}
      >
        חזור לדף הבית
      </Button>
    </Paper>
  );
};

export default LogoutManager;
