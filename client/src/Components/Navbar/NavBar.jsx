
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./NavBar.css";

export default function NavBar() {
  const [showCategories, setShowCategories] = useState(false);

  // שליפה מה-store
 const isLoggedIn = useSelector((state) => !!state.user.currentUser);
const userRole = useSelector((state) => state.user.role);

  return (

<header className={`navbar ${userRole === "manager" ? "manager-navbar" : "user-navbar"}`}>
  <div className="navbar-container">

    {/* צד ימין - דף הבית, עגלה (רק למשתמש), אודות, צור קשר */}
    <nav className="nav-links right-links">
      <Link to="/home">דף הבית</Link>

      {userRole === "user" && isLoggedIn && (
        <Link to="/cart" title="עגלה" className="cart-link">
          🛒 עגלה
        </Link>
      )}

      <Link to="/About">אודות</Link>
      <Link to="/Contact">צור קשר</Link>
    </nav>

    {/* מרכז - לוגו */}
    <div className="nav-logo">
      <Link to="/home">
        <img src="/images/logo.jpg" alt="לוגו" />
      </Link>
    </div>

    {/* צד שמאל - שאר הכפתורים */}
    <nav className="nav-links left-links">
      {userRole === "manager" && isLoggedIn && (
        <>
          <Link to="/add-product">הוספת מוצר</Link>
          <Link to="/all-products">רשימת מוצרים</Link>
          <Link to="/all-orders">רשימת הזמנות</Link>
          <Link to="/all-users">רשימת משתמשים</Link>
          <Link to="/logoutmanager">התנתקות</Link>
        </>
      )}

      {userRole === "user" && isLoggedIn && (
        <>
          <div
            className="dropdown"
            onClick={() => setShowCategories(!showCategories)}
            style={{ cursor: "pointer", display: "inline-block" }}
          >
            <button className="dropbtn">
              קטגוריות <span className={showCategories ? "arrow open" : "arrow"}>&#9662;</span>
            </button>
            {showCategories && (
              <div className="dropdown-content">
                <Link to="/botanic">בוטני</Link>
                <Link to="/urban">עירוני</Link>
                <Link to="/modern-art">אומנות מודרנית</Link>
                <Link to="/abstract">אבסטרקט</Link>
                <Link to="/landscape">נוף</Link>
              </div>
            )}
          </div>
          <Link to="/OrdesHistory">היסטורית הזמנות</Link>
          <Link to="/Logout">התנתקות</Link>
        </>
      )}

      {!isLoggedIn && (
        <>
        
          <div
            className="dropdown"
            onClick={() => setShowCategories(!showCategories)}
            style={{ cursor: "pointer", display: "inline-block" }}
          >
            <button className="dropbtn">
              קטגוריות <span className={showCategories ? "arrow open" : "arrow"}>&#9662;</span>
            </button>
            {showCategories && (
              <div className="dropdown-content">
                <Link to="/botanic">בוטני</Link>
                <Link to="/urban">עירוני</Link>
                <Link to="/modern-art">אומנות מודרנית</Link>
                <Link to="/abstract">אבסטרקט</Link>
                <Link to="/landscape">נוף</Link>
              </div>
            )}
          </div>

          <Link to="/Login">התחברות</Link>
          <Link to="/register">הרשמה</Link>
          <Link to="/cart" title="עגלה" className="cart-link">
          🛒 עגלה
        </Link>
          <Link to="/LoginManager">כניסת מנהל</Link>
        </>
      )}
    </nav>
  </div>
</header>

  );
}


