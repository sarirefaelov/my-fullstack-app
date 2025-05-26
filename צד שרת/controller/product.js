
const fs = require('fs');

function get(req, res) {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}

//אפשרות ראשונה ליצא פונקציה מדף
exports.getById = (req, res) => {

    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            let id = req.params.id;

            data = JSON.parse(data);
            let product = data.find(st => st.id == id)

            if (product == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                res.send(product);
            }

        }


    })
}
exports.post = (req, res) => {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading products file");
        }

        let products = JSON.parse(data);
        const incoming = req.body;

        // אוסף את כל ה-ID הקיימים
        const existingIds = products.map(p => p.id);

        // מחפש את ה-ID הקטן ביותר שלא נמצא ברשימה
        let newId = 1;
        while (existingIds.includes(newId)) {
            newId++;
        }

        // מוציא את id מ-incoming אם קיים
        const { id, ...incomingWithoutId } = incoming;

        // בונה את האובייקט החדש עם id ראשון
        const product = {
            id: newId,
            ...incomingWithoutId
        };

        products.push(product);

        fs.writeFile("products.json", JSON.stringify(products, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error writing products file");
            }
            res.send(product);
        });
    });
};

exports.delete = (req, res) => {
  const id = parseInt(req.params.id); // ממיר את ה-id למספר

  fs.readFile("products.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("שגיאה בקריאת קובץ המוצרים");
    }

    let products = JSON.parse(data); // ממיר את התוכן למערך אובייקטים

    const index = products.findIndex((p) => p.id === id); // מוצא את האינדקס של המוצר

    if (index === -1) {
      return res.status(404).send("מוצר לא נמצא");
    }

    const deletedProduct = products.splice(index, 1)[0]; // מסיר את המוצר מהמערך

    fs.writeFile("products.json", JSON.stringify(products, null, 2), (err) => {
      if (err) {
        return res.status(500).send("שגיאה בשמירת קובץ המוצרים");
      }

      res.send(deletedProduct); // מחזיר את המוצר שנמחק
    });
  });
};
exports.put = (req, res) => {
  const id = parseInt(req.params.id); // ממיר את ה-id למספר
    const updatedProduct = req.body; // המוצר המעודכן
    updatedProduct.id = id; // מוסיף את ה-id למוצר המעודכן
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("שגיאה בקריאת קובץ המוצרים");
        }

        let products = JSON.parse(data); // ממיר את התוכן למערך אובייקטים

        const index = products.findIndex((p) => p.id === id); // מוצא את האינדקס של המוצר

        if (index === -1) {
            return res.status(404).send("מוצר לא נמצא");
        }

        products[index] = updatedProduct; // מעדכן את המוצר במערך

        fs.writeFile("products.json", JSON.stringify(products, null, 2), (err) => {
            if (err) {
                return res.status(500).send("שגיאה בשמירת קובץ המוצרים");
            }

            res.send(updatedProduct); // מחזיר את המוצר המעודכן
        });
    });
}




exports.putQuantity = (req, res) => {
  const id = parseInt(req.params.id); // מזהה המוצר
  const { quantity } = req.body; // נקבל רק את השדה quantity

  fs.readFile("products.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("שגיאה בקריאת קובץ המוצרים");
    }

    let products = JSON.parse(data);
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return res.status(404).send("מוצר לא נמצא");
    }

    // עדכון רק של שדה ה־quantity
    products[index].quantity = quantity;

    fs.writeFile("products.json", JSON.stringify(products, null, 2), (err) => {
      if (err) {
        return res.status(500).send("שגיאה בשמירת קובץ המוצרים");
      }

      res.send(products[index]); // מחזיר את המוצר לאחר עדכון
    });
  });
};


exports.get = get;
