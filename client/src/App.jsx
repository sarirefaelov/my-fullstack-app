 import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
// רכיבים כלליים
import NavBar from './Components/Navbar/NavBar.jsx';

// מסכים משותפים
import Home from './Components/screens/common/Home.jsx';
import About from './Components/screens/common/About.jsx';
import Contact from './Components/screens/common/Contact.jsx';
import ThankYou from './Components/screens/common/Thank-you.jsx';

// משתמשים רגילים
import Login from './Components/screens/user/Login.jsx';
import RegisterForm from './Components/screens/user/RegisterForm.jsx';
import Logout from './Components/screens/user/Logout.jsx';

// קטגוריות
import Urban from './Components/screens/Categories/Urban.jsx';
import ModernArt from './Components/screens/Categories/ModernArt.jsx';
import Landscape from './Components/screens/Categories/Landscape.jsx';
import Botanic from './Components/screens/Categories/Botanic.jsx';
import Abstract from './Components/screens/Categories/Abstract.jsx';

// הזמנות ומוצרים
import Cart from './Components/Order/Cart.jsx';
import Order from './Components/Order/OrderForm.jsx';
import ProductDetails from './Components/Product/ProductDetails.jsx';
import OrdesHistory from './Components/Order/OrdesHistory.jsx';

// מנהל
import UpdateProduct from './Components/screens/manager/UpdateProduct.jsx';
import AllProducts from './Components/screens/manager/AllProducts.jsx';
import LoginManager from './Components/screens/manager/LoginManager.jsx';
import AddProduct from './Components/screens/manager/AddProduct.jsx';
import AllOrders from './Components/screens/manager/AllOrders.jsx';
import AllUsers from './Components/screens/manager/AllUsers.jsx';
import HomeManager from './Components/screens/manager/HomeManager.jsx';
import LogoutManager from './Components/screens/manager/LogoutManager.jsx';
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => !!state.user.currentUser);
  const userRole = useSelector((state) => state.user.role); // כאן משתמשים ב-reduxUserRole ישירות

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/LoginManager" element={<LoginManager />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/Logout" element={<Logout />} />

        {userRole === 'manager' && (
          <>
            <Route path="/logoutmanager" element={<LogoutManager />} />
            <Route path="/HomeManager" element={<HomeManager />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/all-orders" element={<AllOrders />} />
            <Route path="/all-users" element={<AllUsers />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/update-product/:id" element={<UpdateProduct />} />
          </>
        )}

        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Urban" element={<Urban />} />
        <Route path="/modern-art" element={<ModernArt />} />
        <Route path="/Landscape" element={<Landscape />} />
        <Route path="/Botanic" element={<Botanic />} />
        <Route path="/Abstract" element={<Abstract />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/OrdesHistory" element={<OrdesHistory />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/ThankYou" element={<ThankYou />} />
        <Route path="/About" element={<About />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="*" element={<h2 style={{ textAlign: 'center' }}>404 - Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
