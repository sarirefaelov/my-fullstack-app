import React, { useEffect, useState } from "react";
import { getAllOrders } from "../../../features/order/orderAPI";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Paper,
  Collapse,
  IconButton,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AllOrders = () => {
  const [ordersByUser, setOrdersByUser] = useState({});
  const [expandedUsers, setExpandedUsers] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        const allOrdersArray = Array.isArray(response)
          ? response
          : Object.values(response).flat();

        const grouped = {};
        allOrdersArray.forEach((order) => {
          const userId = order.userId || "unknown";
          if (!grouped[userId]) {
            grouped[userId] = {
              userName: order.userName || "משתמש לא מזוהה",
              orders: [],
            };
          }
          grouped[userId].orders.push(order);
        });

        setOrdersByUser(grouped);
      } catch (err) {
        alert("שגיאה. נסה שוב מאוחר יותר.");
      }
    };

    fetchOrders();
  }, []);

  const toggleExpand = (userId) => {
    setExpandedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1100px",
        mx: "auto",
        mt: { xs: 6, md: 10 },
        mb: 8,
        px: { xs: 3, sm: 6 },
        backgroundColor: "#ffffff",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.05)",
          p: { xs: 4, sm: 6 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "",
            textAlign: "center",
            mb: 4,
          }}
        >
          רשימת הזמנות לפי משתמש
        </Typography>

        {Object.keys(ordersByUser).length === 0 ? (
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              mt: 5,
              color: "#f7f1e9",
              fontStyle: "italic",
            }}
          >
            אין הזמנות להצגה
          </Typography>
        ) : (
          Object.entries(ordersByUser).map(([userId, { userName, orders }]) => (
            <Paper
              key={userId}
              elevation={2}
              sx={{
                mb: 4,
                p: { xs: 3, sm: 4 },
                borderRadius: 3,
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                onClick={() => toggleExpand(userId)}
                sx={{ cursor: "pointer" }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "1rem", sm: "1.2rem" },
                    color: "#333",
                  }}
                >
                  משתמש: {userName}{" "}
                  <Typography
                    component="span"
                    sx={{ color: "#888", fontWeight: "normal" }}
                  >
                    (מזהה: {userId})
                  </Typography>
                </Typography>

                <IconButton
                  size="small"
                  sx={{
                    transform: expandedUsers[userId]
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.3s",
                    color: "#f7f1e9",
                  }}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Collapse in={expandedUsers[userId]} timeout="auto" unmountOnExit>
                {orders.map((order, index) => (
                  <Card
                    key={index}
                    variant="outlined"
                    sx={{
                      mb: 2,
                      borderRadius: 2,
                      backgroundColor: "#f7f1e9", // צבע חום שמנת
                      "&:hover": { boxShadow: 3 },
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle2" color="#555" gutterBottom>
                        הזמנה מס' {order.id || index + 1}
                      </Typography>
                      <Typography variant="body2" color="#666">
                        תאריך הזמנה:{" "}
                        {new Date(order.orderDate).toLocaleDateString("he-IL")}
                      </Typography>
                      <Typography variant="body2" color="#666">
                        תאריך יעד:{" "}
                        {new Date(order.dueDate).toLocaleDateString("he-IL")}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ mt: 1, fontWeight: "medium", color: "#333" }}
                      >
                        סכום כולל: {order.totalAmount} ₪
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Collapse>
            </Paper>
          ))
        )}
      </Box>
    </Box>
  );
};

export default AllOrders;


