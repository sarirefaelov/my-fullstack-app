import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../../Product/ProductCard.jsx";
import { fetchProducts } from "../../../features/product/productSlice.jsx";
import "./style.css";
// רכיבי MUI
import {
  Grid,
  TextField,
  MenuItem,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

export default function CategoryPage({ category }) {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    brand: "",
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filtered = products
    .filter((p) => p.category === category)
    .filter((p) => {
      if (filters.minPrice && p.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false;
      if (filters.brand && filters.brand !== "all" && p.brand !== filters.brand) return false;
      return true;
    });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const brands = [...new Set(products.map((p) => p.brand))];

  return (
    <div style={{ padding: "2rem" }}>
      <Typography className="category-title">{category}</Typography>
      <Paper
        elevation={3}
        className="filter-paper"
        sx={{ mt: 8, direction: "rtl", textAlign: "right" }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontSize: "1rem" }}>
          סינון לפי:
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4} className="grid-filter-item">
            <TextField
              fullWidth

              type="number"
              name="minPrice"
              label={<span className="filter-label">מחיר מינימום</span>}
              value={filters.minPrice}
              onChange={handleFilterChange}
              variant="outlined"
              size="small"  /* קטן יותר */
            />
          </Grid>
          <Grid item xs={12} sm={4} className="grid-filter-item">
            <TextField
              fullWidth
              type="number"
              name="maxPrice"
              label={<span className="filter-label">מחיר מקסימום</span>}
              value={filters.maxPrice}
              onChange={handleFilterChange}
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* רשימת מוצרים */}
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <CircularProgress />
        </div>
      ) : filtered.length > 0 ? (

        <Grid container columnSpacing={4} rowSpacing={4} justifyContent="center">
          {filtered.map((p) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={p.id}>
              <ProductCard product={p} />
            </Grid>
          ))}
        </Grid>

      ) : (
        <Typography variant="body1" color="textSecondary">
          אין מוצרים שמתאימים לסינון
        </Typography>
      )}
    </div>
  );
}
