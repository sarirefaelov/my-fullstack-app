import React from "react";

const HomeManager = () => {
  return (
    <div style={{
      maxWidth: "400px",
      margin: "80px auto",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      backgroundColor: "#f9f9f9",
      textAlign: "center",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <h1 style={{ color: "#2a7ae2", marginBottom: "16px" }}>ברוך הבא, מנהל!</h1>
      <p style={{ fontSize: "18px", color: "#333" }}>
        תודה שהתחברת למערכת שלנו.
      </p>
      <p style={{ fontSize: "16px", color: "#555", marginTop: "12px" }}>
        כאן תוכל לנהל את התכנים והמשתמשים בקלות וביעילות.
      </p>
    </div>
  );
};

export default HomeManager;
