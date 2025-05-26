import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updateQuantity } from "../../features/product/productAPI";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Grid,
  CardMedia,
  IconButton,
  Button,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { addToCart } from "../../features/order/cartSlice";
import { fetchProducts } from "../../features/product/productSlice";
import { addItemToCartWithServerUpdate } from "../../features/order/cartSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products || []);
  const product = products.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [products.length, dispatch]);

  if (!product) return <Typography>המוצר לא נמצא</Typography>;

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
 const handleAddToCart = () => {

  
  if (quantity <= product.quantity && product.quantity > 0) {
// dispatch(addItemToCartWithServerUpdate(product, quantity, true)); // הפרמטר השלישי: isIncrement = true
  dispatch(addItemToCartWithServerUpdate(product, quantity)); // הפרמטר השלישי: isIncrement = true
    setSnackbarMessage("המוצר נוסף לסל בהצלחה!");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  } else {
    setSnackbarMessage("כמות ההוספה גדולה מהמלאי הזמין");
    setSnackbarSeverity("error");
    setOpenSnackbar(true);
  }
};

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  return (
    <>
      <Grid
        container
        spacing={6}
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 17, mb: 6, px: 2 }}
      >
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: isMobile ? 300 : 450,
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: 4,
              bgcolor: "#fafafa",
            }}
          >
            <CardMedia
              component="img"
              image={`/images/${product.category}/${product.image}`}
              alt={product.name}
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: isMobile ? "center" : "right", maxWidth: 500, mx: "auto" }}>
            <Typography variant="h4" gutterBottom fontWeight={600}>
              {product.name}
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              {product.description}
            </Typography>
            <Typography variant="h5" gutterBottom color="primary" fontWeight={500}>
              מחיר: {product.price} ₪
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              חברה: {product.company}
            </Typography>

            <Box display="flex" justifyContent={isMobile ? "center" : "start"} alignItems="center" my={3}>
              <IconButton onClick={decreaseQty}>
                <RemoveIcon />
              </IconButton>
              <Typography variant="h6" mx={2}>
                {quantity}
              </Typography>
              <IconButton onClick={increaseQty}>
                <AddIcon />
              </IconButton>
            </Box>

            <Button
              variant="contained"
              size="large"
              color="primary"
              startIcon={<ShoppingCartCheckoutIcon />}
              onClick={handleAddToCart}
              sx={{ px: 4, py: 1.5 }}
            >
              הוסף לסל
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>

      </Snackbar>
    </>
  );
}
