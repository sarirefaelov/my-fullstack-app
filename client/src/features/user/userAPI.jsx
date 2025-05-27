import axios from 'axios';
// const BASE_URL = "http://localhost:4000/api";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`); // נתיב ה-API שלך בשרת
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
export const loginUser = async (userData) => {
    const response = await axios.post(`${BASE_URL}/users/login`, userData);
    return response.data;
};

export default getAllUsers;
