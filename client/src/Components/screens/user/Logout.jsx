import React, { useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/user/userSlice";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.currentUser?.username);

  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate('/');
    }, 0);
  };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#fcf9f4",
        padding: 2,
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          p: 4,
          bgcolor: "#fcf9f4",
          borderRadius: 3,
          boxShadow: "0 8px 20px rgba(180, 150, 100, 0.15)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          fontFamily: "'Georgia', serif",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#b8986d",
            fontWeight: "700",
            fontFamily: "'Georgia', serif",
          }}
        >
          שלום, {username}
        </Typography>

        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            bgcolor: "#b8986d",
            color: "white",
            fontWeight: "700",
            paddingY: 1.5,
            width: "100%",
            fontFamily: "'Georgia', serif",
            "&:hover": {
              bgcolor: "#a1834e",
              boxShadow: "0 4px 12px rgba(161, 131, 78, 0.4)",
            },
            transition: "all 0.3s ease",
          }}
        >
          התנתק
        </Button>
      </Container>
    </Box>
  );
}
