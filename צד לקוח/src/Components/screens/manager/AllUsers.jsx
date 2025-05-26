import React, { useEffect, useState } from "react";
import getAllUsers from "../../../features/user/userAPI";

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "82px",
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    direction: "rtl",
  },
  title: {
    textAlign: "center",
    color: "#5a4a3c", // חום כהה
    marginBottom: 30,
    fontWeight: "700",
    fontSize: 28,
  },
  userCard: {
    backgroundColor: "#fffaf3", // לבן עם גוון שמנת
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    boxShadow: "0 2px 8px rgba(90, 74, 60, 0.15)",
    transition: "transform 0.2s",
    cursor: "default",
  },
  userCardHover: {
    transform: "scale(1.02)",
  },
  username: {
    fontSize: 20,
    fontWeight: "600",
    color: "#5a4a3c",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: "#7a6b5e",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 18,
    color: "#8c7e70",
    fontStyle: "italic",
  },
};

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response);
      } catch (err) {
        alert("שגיאה. נסה שוב מאוחר יותר.");
      }
    };
    fetchUsers();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>רשימת משתמשים</h2>
      {users.length === 0 ? (
        <p style={styles.loadingText}>טוען משתמשים...</p>
      ) : (
        users.map((user, index) => (
          <div
            key={index}
            style={{
              ...styles.userCard,
              ...(hoverIndex === index ? styles.userCardHover : {}),
            }}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div style={styles.username}>{user.username}</div>
            <div style={styles.email}>{user.email}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllUsers;
