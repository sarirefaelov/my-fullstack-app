

const express = require('express');
const app = express();
const cors = require('cors');
const user = require('./router/user');
const product = require('./router/product');
const order = require('./router/order');

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST','PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

app.use("/api/users", user);     // משתמשים
app.use("/api/products", product); // מוצרים
app.use("/api/orders", order);     // הזמנות

// אין צורך להוסיף שוב app.post('/api/users/login') או register כאן!

app.listen(4000, () => {
    console.log("Server listening on port 4000");
});
