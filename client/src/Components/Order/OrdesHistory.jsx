import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOrdersByUserId } from "../../features/order/orderAPI";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
  Button,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";

const OrdersHistory = () => {
  const [userOrders, setUserOrders] = useState([]);
  const user = useSelector((state) => state.user?.currentUser);

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!user?.id) {
        setUserOrders([]);
        return;
      }
      try {
        const ordersArray = await getOrdersByUserId(user.id);
        setUserOrders(ordersArray || []);
      } catch (error) {
        console.error("Error fetching user orders:", error);
        alert("שגיאה בקבלת ההזמנות. נסה שוב מאוחר יותר.");
      }
    };
    fetchUserOrders();
  }, [user]);

  const handleDeleteOrder = (orderId) => {
    console.log("מחיקת הזמנה:", orderId);
  };

  return (
    <Box
      sx={{
        padding: 4,
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        fontWeight="bold"
        color="primary"
        sx={{
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          fontFamily: "'Varela Round', sans-serif",
        }}
      >
        ההזמנות שלי
      </Typography>

      {userOrders.length === 0 ? (
        <Typography textAlign="center" color="text.secondary">
          לא נמצאו הזמנות עבור המשתמש.
        </Typography>
      ) : (
        userOrders.map((order, index) => {
          const isPastDueDate = new Date(order.dueDate) < new Date();

          return (
            <Card
              key={order.orderDate + index}
              sx={{
                marginBottom: 4,
                padding: 2,
                borderRadius: 5,
                boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
                background: isPastDueDate
                  ? "linear-gradient(135deg, #eeeeee 0%, #cccccc 100%)"
                  : "linear-gradient(135deg, #ffffff 0%, #f3f1ee 100%)",
                border: isPastDueDate ? "2px solid red" : "none",
                opacity: isPastDueDate ? 0.8 : 1,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <CardContent>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" gutterBottom color="primary">
                    <LocalShippingIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                    הזמנה מס' {index + 1}
                  </Typography>

                  {!isPastDueDate && (
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      מחק הזמנה
                    </Button>
                  )}
                </Grid>

                <Divider sx={{ marginY: 2 }} />

                <Grid container spacing={2} mb={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="body1">
                      <CalendarMonthIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                      <b>תאריך הזמנה:</b> {new Date(order.orderDate).toLocaleDateString("he-IL")}
                    </Typography>
                    <Typography variant="body1">
                      <CalendarMonthIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                      <b>תאריך יעד:</b>{" "}
                      {new Date(order.dueDate).toLocaleDateString("he-IL")}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="body1">
                      <LocationOnIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                      <b>כתובת:</b> {order.address}, דירה {order.apartment}
                    </Typography>
                    <Typography variant="body1">
                      <b>עיר:</b> {order.city}
                    </Typography>
                    <Typography variant="body1">
                      <b>טלפון:</b> {order.phone}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={12} md={4}>
                    <Typography variant="body1">
                      <b>הערות:</b> {order.notes || "-"}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" color="success.main">
                      סכום כולל: {order.totalAmount} ₪
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" color="secondary.main">
                      כמות פריטים: {order.totalQuantity}
                    </Typography>
                  </Grid>
                </Grid>

                <Typography variant="subtitle1" gutterBottom>
                  <ShoppingCartIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                  פרטי פריטים בהזמנה:
                </Typography>

                <List dense>
                  {order.cartItems.map((item) => (
                    <ListItem
                      key={item.id}
                      sx={{
                        borderBottom: "1px solid #eee",
                        paddingY: 1.5,
                        alignItems: "center",
                        transition: "background 0.3s",
                        "&:hover": {
                          background: "#f0f0f0",
                          borderRadius: 2,
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          variant="rounded"
                          src={item.image}
                          alt={item.name}
                          sx={{
                            width: 60,
                            height: 60,
                            marginRight: 2,
                            border: "2px solid #ccc",
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${item.name} (x${item.cartQuantity})`}
                        secondary={`${item.shortDescription} — מחיר יחידה: ${item.price} ₪`}
                      />
                      <Typography fontWeight="bold" color="text.primary">
                        {item.price * item.cartQuantity} ₪
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          );
        })
      )}
    </Box>
  );
};

export default OrdersHistory;
