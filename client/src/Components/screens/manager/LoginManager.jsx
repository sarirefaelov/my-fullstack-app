
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserRole, loginSuccess } from '../../../features/user/userSlice';
import { Container, Box, Typography, TextField, Button, Snackbar } from "@mui/material";

const LoginManager = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "1" && password === "1") {
      const userData = {
        name: "Manager",
        username: "1",
      };
      const userRole = "manager";

      dispatch(loginSuccess({ user: userData, role: userRole }));
      dispatch(setUserRole(userRole));

      setSnackbarMessage("Login successful");
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate("/HomeManager");
      }, 1500);
    } else {
      setSnackbarMessage("Invalid credentials");
      setOpenSnackbar(true);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 20,
        p: 4,
        bgcolor: "#fcf9f4",
        borderRadius: 3,
        boxShadow: "0 8px 20px rgba(180, 150, 100, 0.15)",
        fontFamily: "'Georgia', serif",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          color: "#b8986d",
          fontWeight: "700",
          mb: 3,
        }}
      >
        Login Manager
      </Typography>
      <Typography align="center" sx={{ mb: 3, color: "#7a6b4f" }}>
        Please enter your credentials to log in.
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          variant="outlined"
          sx={{
            bgcolor: "#f7f2e7",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#d7c5a3" },
              "&:hover fieldset": { borderColor: "#b8986d" },
              "&.Mui-focused fieldset": { borderColor: "#a1834e" },
            },
            fontFamily: "'Georgia', serif",
          }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="outlined"
          sx={{
            bgcolor: "#f7f2e7",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#d7c5a3" },
              "&:hover fieldset": { borderColor: "#b8986d" },
              "&.Mui-focused fieldset": { borderColor: "#a1834e" },
            },
            fontFamily: "'Georgia', serif",
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "#b8986d",
            color: "white",
            fontWeight: "700",
            py: 1.5,
            fontFamily: "'Georgia', serif",
            "&:hover": {
              bgcolor: "#a1834e",
              boxShadow: "0 4px 12px rgba(161, 131, 78, 0.4)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Login
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            bgcolor: snackbarMessage === "Login successful" ? "#a1834e" : "#d56c4a",
            color: "white",
            fontFamily: "'Georgia', serif",
          },
        }}
      />
    </Container>
  );
};

export default LoginManager;
