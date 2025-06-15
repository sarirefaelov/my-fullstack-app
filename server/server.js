

// const express = require('express');
// const app = express();
// const cors = require('cors');
// const user = require('./router/user');
// const product = require('./router/product');
// const order = require('./router/order');

// // app.use(cors({
// //   origin: 'http://localhost:5173',
// //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //   allowedHeaders: ['Content-Type'],
// // }));
// const allowedOrigins = ['http://localhost:5173', 'https://viewart.onrender.com'];


// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type'],
// }));
// app.use(express.json());

// app.use("/api/users", user);     // משתמשים
// app.use("/api/products", product); // מוצרים
// app.use("/api/orders", order);     // הזמנות

// // app.listen(4000, () => {
// //   console.log("Server listening on port 4000");
// // });

// require('dotenv').config();

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });



// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const user = require('./router/user');
// const product = require('./router/product');
// const order = require('./router/order');

// const app = express();

// const allowedOrigins = ['http://localhost:5173', 'https://viewart.onrender.com'];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type'],
// }));

// app.use(express.json());

// // שרת קבצים סטטיים (Frontend)
// app.use(express.static(path.join(__dirname, 'public')));

// // API Routes
// app.use("/api/users", user);     // משתמשים
// app.use("/api/products", product); // מוצרים
// app.use("/api/orders", order);     // הזמנות

// // אם לא נמצא endpoint, החזר את index.html (חשוב ל-React Router)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// require('dotenv').config();

// const PORT = process.env.PORT || 4000; // התאם לפורט ש-Render השתמש בו
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });




const express = require('express');
const cors = require('cors');
const path = require('path');
const user = require('./router/user');
const product = require('./router/product');
const order = require('./router/order');

const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://viewart.onrender.com'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/users", user);
app.use("/api/products", product);
app.use("/api/orders", order);

// אם האפליקציה שלך משתמשת ב-React Router, כדאי להחזיר את ה-index.html לכל נתיב שלא מתאים ל-API
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

require('dotenv').config();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
