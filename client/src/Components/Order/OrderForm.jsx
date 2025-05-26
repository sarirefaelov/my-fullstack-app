import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../features/order/orderAPI';
import { clearCart } from '../../features/order/cartSlice';
import { updateQuantity } from '../../features/product/productAPI';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Stack,
  Paper,
  Grid
} from '@mui/material';

const OrderForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.user.currentUser);
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    apartment: '',
    phone: '',
    creditCardNumber: '',
    creditCardExpiry: '',
    creditCardCVV: '',
    creditCardName: '',
    dueDate: '',
    notes: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError("עליך להתחבר לפני ביצוע הזמנה.");
      return;
    }

    if (cartItems.length === 0) {
      setError("העגלה ריקה. הוסף פריטים לפני ההזמנה.");
      return;
    }

    const orderData = {
      userId: user.id,
      userName: user.username,
      orderDate: new Date().toISOString(),
      dueDate: form.dueDate,
      address: form.address,
      city: form.city,
      apartment: form.apartment,
      phone: form.phone,
      notes: form.notes,
      cartItems,
      totalAmount,
      totalQuantity
    };
    console.log("Current user:", user);

    try {
      await createOrder(orderData);
      dispatch(clearCart());
      for (const item of cartItems) {
        const updatedQuantity = item.quantity - item.cartQuantity;
        await updateQuantity(item.id, -item.cartQuantity);
      }
      navigate('/ThankYou');
    } catch (err) {
      setError("שגיאה בשליחת ההזמנה, נסה שוב מאוחר יותר.");
    }
  };

  if (!user) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(120deg, #fdf6f0, #f8eee4)',  // רקע בגווני קרם
          padding: 3,
          textAlign: 'center',
        }}
      >
        <Paper
          elevation={8}
          sx={{
            padding: 5,
            maxWidth: 400,
            width: '100%',
            borderRadius: 3,
            boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
            backgroundColor: '#fffaf5', // צבע קרם רך לטקסט
          }}
        >
          <Typography variant="h5" gutterBottom fontWeight="bold" color="#a17458">
            יש להתחבר או להירשם
          </Typography>
          <Typography variant="body1" mb={3} color="#7d6a50">
          </Typography>

          <Stack spacing={2} direction="row" justifyContent="center">
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(to right, #b58f6f, #a17458)',
                color: '#fff',
                borderRadius: 3,
                px: 4,
                fontWeight: 'bold',
                boxShadow: '0 4px 10px rgba(165, 116, 68, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(to right, #a17458, #b58f6f)',
                  boxShadow: '0 6px 14px rgba(165, 116, 68, 0.6)',
                },
              }}
              onClick={() => navigate('/login')}
              size="large"
            >
              התחבר
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#a17458',
                color: '#a17458',
                borderRadius: 3,
                px: 4,
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#f0e7d9',
                  borderColor: '#b58f6f',
                  color: '#b58f6f',
                },
              }}
              onClick={() => navigate('/register')}
              size="large"
            >
              הירשם
            </Button>
          </Stack>
        </Paper>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 4,
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: 700,
          p: 4,
          borderRadius: 6,
          boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
          backgroundColor: '#fffaf5',
        }}
      >
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          טופס הזמנה
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="כתובת למשלוח"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="עיר"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="מס' דירה"
              name="apartment"
              value={form.apartment}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="טלפון"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="מספר כרטיס אשראי"
              name="creditCardNumber"
              value={form.creditCardNumber}
              onChange={handleChange}
              inputProps={{ maxLength: 16 }}
              placeholder="1234 5678 9012 3456"
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={6} sm={3}>
            <TextField
              label="תוקף (MM/YY)"
              name="creditCardExpiry"
              value={form.creditCardExpiry}
              onChange={handleChange}
              placeholder="08/27"
              inputProps={{ maxLength: 5 }}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={6} sm={3}>
            <TextField
              label="CVV"
              name="creditCardCVV"
              value={form.creditCardCVV}
              onChange={handleChange}
              inputProps={{ maxLength: 4 }}
              placeholder="123"
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="שם על הכרטיס"
              name="creditCardName"
              value={form.creditCardName}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="תאריך יעד"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="הערות למשלוח"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                background: 'linear-gradient(to right, #b58f6f, #a17458)',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: '9999px',
                py: 1.5,
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                  background: 'linear-gradient(to right, #a17458, #b58f6f)',
                },
              }}
            >
              שלח הזמנה
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default OrderForm;
