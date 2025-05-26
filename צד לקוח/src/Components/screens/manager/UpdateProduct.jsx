
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Container,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../../features/product/productAPI";
import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductById(id);
      setInitialValues(product);
    };
    fetchProduct();
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues || {
      name: '',
      price: '',
      category: '',
      image: '',
      shortDescription: '',
      description: '',
      company: '',
      quantity: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required("שדה חובה"),
      price: Yup.number().required("שדה חובה"),
      category: Yup.string().required("שדה חובה"),
      image: Yup.string().required("שדה חובה"),
      shortDescription: Yup.string().required("שדה חובה"),
      description: Yup.string().required("שדה חובה"),
      company: Yup.string().required("שדה חובה"),
      quantity: Yup.number().required("שדה חובה"),
    }),
    onSubmit: async (values) => {
      try {
        await updateProduct(id, values);
        alert("המוצר עודכן בהצלחה!");
        navigate("/all-products");
      } catch (err) {
        console.error("שגיאה בעדכון מוצר:", err);
        alert("שגיאה. נסה שוב מאוחר יותר.");
      }
    },
  });

  const fields = [
    { name: "name", label: "שם", type: "text" },
    { name: "price", label: "מחיר", type: "number" },
    { name: "category", label: "קטגוריה", type: "text" },
    { name: "image", label: "קובץ תמונה", type: "text" },
    { name: "shortDescription", label: "תיאור קצר", type: "text" },
    { name: "company", label: "חברה", type: "text" },
    { name: "quantity", label: "כמות", type: "number" },
    { name: "description", label: "תיאור מלא", type: "text", multiline: true, rows: 3 },
  ];

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper
        elevation={6}
        sx={{
          width: '100%',
          padding: 4,
          borderRadius: 3,
          backgroundColor: '#fff8f1',
          boxShadow: '0 8px 24px rgba(93, 58, 0, 0.1)',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: '#b28f67',
            fontWeight: '700',
            textAlign: 'center',
            mb: 4,
            fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
          }}
        >
          עדכון מוצר
        </Typography>

        {initialValues && (
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              {fields.map(({ name, label, type, multiline, rows }) => (
                <Grid item xs={12} sm={6} key={name}>
                  <TextField
                    fullWidth
                    size="small"
                    label={label}
                    name={name}
                    type={type}
                    multiline={multiline}
                    rows={rows}
                    {...formik.getFieldProps(name)}
                    error={formik.touched[name] && Boolean(formik.errors[name])}
                    helperText={formik.touched[name] && formik.errors[name]}
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: 1,
                      '& label.Mui-focused': {
                        color: '#b28f67',
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#b28f67',
                        },
                        '&:hover fieldset': {
                          borderColor: '#b28f67',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#b28f67',
                          borderWidth: 2,
                        },
                      },
                      '& .MuiFormHelperText-root': {
                        color: '#b28f67',
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                backgroundColor: '#b28f67',
                color: 'white',
                fontWeight: '700',
                fontSize: '16px',
                padding: '12px 0',
                '&:hover': {
                  backgroundColor: 'b28f67',
                },
              }}
            >
              עדכן מוצר
            </Button>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default UpdateProduct;
