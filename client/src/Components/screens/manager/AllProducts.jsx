import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  CardMedia,
  Box,
} from "@mui/material";
import { getAllProducts, deleteProduct } from "../../../features/product/productAPI";

export default function AllProductsList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      alert("שגיאה בטעינת מוצרים");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("האם את בטוחה שברצונך למחוק את המוצר?");
    if (confirmDelete) {
      try {
        await deleteProduct(id);
        alert("המוצר נמחק בהצלחה");
        loadProducts();
      } catch (error) {
        alert("שגיאה במחיקת המוצר");
        console.error(error);
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-product/${id}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 4,
        padding: 4,
        paddingTop: 17, 
        background: "linear-gradient(135deg, #ffffff  0%, #fff)", // רקע רך
      }}
    >
      {products.map((product) => (
        <Card
          key={product.id}
          sx={{
            width: 300,
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            },
            direction: "rtl",
          }}
        >
          {product.image && (
            <CardMedia
              component="img"
              image={`/images/${product.category}/${product.image}`}
              alt={product.name}
            />
          )}
          <CardContent>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#3e3e3e", mb: 1 }}
            >
              {product.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#666", mb: 1 }}
            >
              {/* {product.shortDescription} */}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: "#a1834e" }}
            >
              {product.price} ₪
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "space-between", paddingX: 2 }}>
            <Button color="error" onClick={() => handleDelete(product.id)}>
              מחק
            </Button>
            <Button variant="outlined" onClick={() => handleUpdate(product.id)}>
              עדכן
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}


