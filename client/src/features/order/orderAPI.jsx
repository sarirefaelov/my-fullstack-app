// //src/features/order/orderAPI.jsx
// // const BASE_URL = "http://localhost:4000/api/orders";
// const BASE_URL ="http://localhost:4000";

// export async function createOrder(orderData) {
//   const dataToSend = {
//     ...orderData,
//   };
// console.log("Sending order data:", dataToSend);
//   const response = await fetch(`${BASE_URL}/${orders}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(dataToSend),
//   });
//   if (!response.ok) {
//     throw new Error("שליחת ההזמנה נכשלה");
//   }
// console.log("Sending order data:", dataToSend);

//   return await response.json();
// }

// export async function getAllOrders() {
//   const response = await fetch(`${BASE_URL}/${orders}`);

//   if (!response.ok) {
//     throw new Error("שגיאה בקבלת ההזמנות");
//   }

//   return await response.json();
// }
// export async function getOrdersByUserId(userId) {
//   const response = await fetch(`${BASE_URL}/${orders}/${userId}`);
//   if (!response.ok) {
//     throw new Error("שגיאה בקבלת ההזמנות של המשתמש");
//   }
//   return await response.json();
// }



// const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_URL = "https://viewart.onrender.com/api";

const ORDERS_PATH = "orders";

export async function createOrder(orderData) {
  const dataToSend = { ...orderData };
  console.log("Sending order data:", dataToSend);
  
  const response = await fetch(`${BASE_URL}/${ORDERS_PATH}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataToSend),
  });
  
  if (!response.ok) {
    throw new Error("שליחת ההזמנה נכשלה");
  }

  return await response.json();
}

export async function getAllOrders() {
  const response = await fetch(`${BASE_URL}/${ORDERS_PATH}`);
  
  if (!response.ok) {
    throw new Error("שגיאה בקבלת ההזמנות");
  }

  return await response.json();
}

export async function getOrdersByUserId(userId) {
  const response = await fetch(`${BASE_URL}/${ORDERS_PATH}/${userId}`);
  
  if (!response.ok) {
    throw new Error("שגיאה בקבלת ההזמנות של המשתמש");
  }
  
  return await response.json();
}
