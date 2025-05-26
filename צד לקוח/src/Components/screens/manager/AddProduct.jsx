import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { addProduct } from "../../../features/product/productAPI";

const Form = styled.form`
      width: 117%;
    max-width: 718px;
    margin: 170px auto;
    padding: 23px;
    background-color: #fffaf3;
    border-radius: 12px;
    box-shadow: 0 6px 16px rgba(218, 207, 202, 0.1);
    display: grid
;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    font-family: sans-serif;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #b28f67;
  margin-bottom: 4px;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
`;

const Input = styled.input`
  padding: 6px;
  font-size: 14px;
  border: 1px solid #b28f67;
  border-radius: 5px;
  background-color: #fffdf9;
`;

const TextArea = styled.textarea`
  padding: 6px;
  font-size: 14px;
  border: 1px solidrgb(225, 210, 189);
  border-radius: 5px;
  color: #b28f67;
  resize: none;
`;

const Button = styled.button`
  grid-column: span 2;
  padding: 10px;
  background-color:#b28f67;
  color: white;
  font-size: 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* גובה כל הדף */
`;
const Title = styled.h2`
  font-size: 28px;
  color:#775e21;
  text-align: center;
  margin-bottom: 24px;
    color: #b28f67;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const ErrorMessage = styled.div`
  font-size: 12px;
  color: darkred;
  margin-top: 2px;
`;

const AddProduct = () => {
  const formik = useFormik({
    initialValues: {
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
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await addProduct(values);
        alert("המוצר נוסף בהצלחה!");
        resetForm();
      } catch (err) {
        console.error("שגיאה בהוספת מוצר:", err);
        alert("שגיאה. נסה שוב מאוחר יותר.");
      }
    },
  });

  return (
    <FormContainer>

      <Form onSubmit={formik.handleSubmit}>
        <Title>הוספת מוצר</Title>
        {[
          { name: 'name', label: 'שם' },
          { name: 'price', label: 'מחיר', type: 'number' },
          { name: 'category', label: 'קטגוריה' },
          { name: 'image', label: 'שם קובץ תמונה' },
          { name: 'shortDescription', label: 'תיאור קצר' },
          { name: 'company', label: 'חברה' },
          { name: 'quantity', label: 'כמות', type: 'number' }
        ].map(({ name, label, type = 'text' }) => (
          <FieldWrapper key={name}>
            <Label htmlFor={name}>{label}</Label>
            <Input id={name} name={name} type={type} {...formik.getFieldProps(name)} />
            {formik.touched[name] && formik.errors[name] && <ErrorMessage>{formik.errors[name]}</ErrorMessage>}
          </FieldWrapper>
        ))}

        <FieldWrapper style={{ gridColumn: 'span 2' }}>
          <Label htmlFor="description">תיאור מלא</Label>
          <TextArea id="description" name="description" rows="3" {...formik.getFieldProps('description')} />
          {formik.touched.description && formik.errors.description && <ErrorMessage>{formik.errors.description}</ErrorMessage>}
        </FieldWrapper>

        <Button type="submit">הוסף מוצר</Button>
      </Form>
    </FormContainer>

  );
};

export default AddProduct;
