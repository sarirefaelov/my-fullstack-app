

const express = require('express');
const app = express();
const cors = require('cors');
const user = require('./router/user');
const product = require('./router/product');
const order = require('./router/order');

// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type'],
// }));
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

app.use("/api/users", user);     // משתמשים
app.use("/api/products", product); // מוצרים
app.use("/api/orders", order);     // הזמנות

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
