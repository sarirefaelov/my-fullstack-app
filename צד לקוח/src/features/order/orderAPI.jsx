//src/features/order/orderAPI.jsx
const BASE_URL = "http://localhost:4000/api/orders";

export async function createOrder(orderData) {
  const dataToSend = {
    ...orderData,
  };
console.log("Sending order data:", dataToSend);
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  });
  if (!response.ok) {
    throw new Error("שליחת ההזמנה נכשלה");
  }
console.log("Sending order data:", dataToSend);

  return await response.json();
}

export async function getAllOrders() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("שגיאה בקבלת ההזמנות");
  }

  return await response.json();
}
export async function getOrdersByUserId(userId) {
  const response = await fetch(`${BASE_URL}/${userId}`);
  if (!response.ok) {
    throw new Error("שגיאה בקבלת ההזמנות של המשתמש");
  }
  return await response.json();
}
