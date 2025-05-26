import axios from 'axios';

const getAllUsers = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/users'); // נתיב ה-API שלך בשרת
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
export const loginUser = async (userData) => {
    const response = await axios.post("http://localhost:4000/api/users/login", userData);
    return response.data;
};

export default getAllUsers;
