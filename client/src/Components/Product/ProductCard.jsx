import { useSelector } from 'react-redux';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  IconButton,
  Box,
  CardContent,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addItemToCartWithServerUpdate } from "../../features/order/cartSlice";


export default function ProductCard({ product }) {
  if (!product) return null;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const goToDetails = () => {
    navigate(`/products/${product.id}`);
  };
  const cartItems = useSelector(state => state.cart.cartItems);
const handleAddToCart = (e) => {
  e.stopPropagation();
  if (product.quantity > 0) {
    const itemInCart = cartItems.find(item => item.id === product.id);
    const oldQuantityInCart = itemInCart ? itemInCart.cartQuantity : 0;
    const newQuantityInCart = oldQuantityInCart + 1;
    const { quantity: _, ...cleanedProduct } = product;
    dispatch(addItemToCartWithServerUpdate(
      {
        ...cleanedProduct,
        cartQuantity: newQuantityInCart,
        quantity: product.quantity,
      },
      1 // <= תמיד מוריד אחד מהמלאי
    ));
  } else {
    alert("המלאי אזל");
  }
};

  return (
    <Card
      sx={{
        md: 5,
        maxWidth: 300,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea onClick={goToDetails}>
        <CardMedia
          component="img"
          height="220"
          image={`/images/${product.category}/${product.image}`}
          alt={product.name}
          sx={{ objectFit: "contain", p: 1 }}
        />

        <CardContent sx={{ textAlign: "center", paddingBottom: "3rem" }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {product.name}
          </Typography>
          <Typography variant="subtitle2" color="primary">
            ₪ {product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <IconButton
        aria-label="הוסף לסל"
        onClick={handleAddToCart}
        sx={{
          position: "absolute",
          bottom: 12,
          right: 12,
          bgcolor: "rgba(255,255,255,0.8)",
          "&:hover": { bgcolor: "rgba(255,255,255,1)" },
          boxShadow: 1,
        }}
        size="small"
      >
        <AddShoppingCartIcon color="primary" />
      </IconButton>
    </Card>
  );
}



