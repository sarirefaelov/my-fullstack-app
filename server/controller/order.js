
const fs = require('fs');

function get(req, res) {
    fs.readFile("orders.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}
//אפשרות ראשונה ליצא פונקציה מדף
exports.getById = (req, res) => {

    fs.readFile("orders.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            let id = req.params.id;

            data = JSON.parse(data);
            let order = data.find(st => st.id == id)

            if (order == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                res.send(order);
            }

        }


    })
}

// exports.post = (req, res) => {
//         console.log("POST /api/products הגיע לשרת");
//     fs.readFile("orders.json", "utf-8", (err, data) => {
//         if (err) {
//             return res.status(500).send("error read file orders");
//         }

//         let orders = JSON.parse(data);

//         const newOrder = req.body;
//         orders.push(newOrder);

//         fs.writeFile("orders.json", JSON.stringify(orders, null, 2), (err) => {
//             if (err) {
//                 res.status(500).send("error in add order");
//             } else {
//                 // שליחה בפורמט JSON תקני
//                 res.status(201).json({ message: "success add order", order: newOrder });
//             }
//         });
//     });
// };


exports.post = (req, res) => {
  console.log("POST /api/products הגיע לשרת");

  fs.readFile("orders.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("error read file orders");
    }

    let ordersByUser = {};
    try {
      ordersByUser = JSON.parse(data);
    } catch (parseErr) {
      // אם הקובץ ריק או לא תקין, נתחיל מאובייקט חדש
      ordersByUser = {};
    }

    const newOrder = req.body;
    const userId = newOrder.userId;

    if (!userId) {
      return res.status(400).send("Missing userId in order");
    }

    // אם המשתמש לא קיים במערך - צור מערך חדש
    if (!ordersByUser[userId]) {
      ordersByUser[userId] = [];
    }

    // הוסף את ההזמנה למערך של המשתמש
    ordersByUser[userId].push(newOrder);

    fs.writeFile("orders.json", JSON.stringify(ordersByUser, null, 2), (err) => {
      if (err) {
        res.status(500).send("error in add order");
      } else {
        res.status(201).json({ message: "success add order", order: newOrder });
      }
    });
  });
};
// exports.getByOrderById = (req, res) => {
//   const id = Number(req.params.id); // המרת id למספר, אם הוא מספר

//   fs.readFile("orders.json", "utf-8", (err, data) => {
//     if (err) {
//       return res.status(500).send("error read file orders");
//     }

//     let ordersByUser = JSON.parse(data);

//     // מאחד את כל מערכי ההזמנות למערך אחד
//     let allOrders = Object.values(ordersByUser).flat();

//     // עכשיו מחפשים במערך את ההזמנה עם id מתאים
//     let order = allOrders.find(order => order.id === id);

//     if (!order) {
//       return res.status(404).send("not found order by id " + id);
//     }

//     res.json(order);
//   });
// };

// exports.getByOrderById = (req, res) => {
//   const id = Number(req.params.id);

//   fs.readFile('orders.json', 'utf-8', (err, content) => {
//     if (err) {
//       return res.status(500).send('error read file orders');
//     }

//     const ordersByUser = JSON.parse(content);
//     const allOrders = Object.values(ordersByUser).flat();

//     const order = allOrders.find(order => order.id === id);

//     if (!order) {
//       return res.status(404).send('not found order by id ' + id);
//     }

//     res.json(order);
//   });
// };
exports.getOrderById = (req, res) => {
    const userId = req.params.id;

    fs.readFile("orders.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("Error reading file orders.json");
            return;
        }

        try {
            const ordersData = JSON.parse(data);

            // ordersData[userId] זה מערך ההזמנות של המשתמש
            const userOrders = ordersData[userId];

            if (!userOrders) {
                res.status(404).send("No orders found for user ID " + userId);
            } else {
                res.send(userOrders);
            }
        } catch (parseError) {
            res.status(500).send("Error parsing JSON");
        }
    });
};

//אפשרות שניה ליצא פונקציה מדף
exports.get = get;
