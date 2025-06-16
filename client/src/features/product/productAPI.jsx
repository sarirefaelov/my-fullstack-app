
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;
const PRODUCTS_URL = `${BASE_URL}/products`;


export const getAllProducts = async () => {
  const res = await axios.get(PRODUCTS_URL);
  return res.data;
};
export const getProductById = async (id) => {
  const response = await fetch(`${PRODUCTS_URL}/${id}`);
  const data = await response.json();
  return data;
};

export async function addProduct(productData) {
  const dataToSend = {
    ...productData,
    price: Number(productData.price),
    quantity: Number(productData.quantity),
  };

  console.log("Sending product data:", dataToSend);

  const response = await fetch(PRODUCTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  });

  if (!response.ok) {
    throw new Error("שליחת המוצר נכשלה");
  }

  return await response.json();
}


export const deleteProduct = async (id) => {
  const res = await axios.delete(`${PRODUCTS_URL}/${id}`);
  return res.data;
};
export const updateProduct = async (id, productData) => {
  const dataToSend = {
    ...productData,
    price: Number(productData.price),
    quantity: Number(productData.quantity),
  };
  const res = await axios.put(`${PRODUCTS_URL}/${id}`, dataToSend);
  return res.data;
};
export const updateQuantity = async (id, quantity) => {
  try {
    await axios.put(`${PRODUCTS_URL}/${id}/quantity`, { quantity });
  } catch (err) {
    console.error("שגיאה בעדכון מלאי:", err);
    throw err;  // להעביר את השגיאה למי שקורא
  }
};

