
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const fs = require('fs');
const { log } = require('console');

// הפונקציות
const get = (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("Error reading file users");
        } else {
            res.send(JSON.parse(data));
        }
    });
};

const getById = (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("Error reading file users");
        } else {
            let id = req.params.id;
            data = JSON.parse(data);
            let user = data.find(st => st.id == id);

            if (!user) {
                res.status(404).send("User not found with id " + id);
            } else {
                res.send(user);
            }
        }
    });
};

function login(req, res) {
  
  fs.readFile("users.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("error reading users file");
      console.error("error:", err);
      return;
    }

    const user = req.body;
    const users = JSON.parse(data);
    const currentUser = users.find(
      (st) => st.email === user.email && st.password === user.password&& st.username === user.username
    );

    console.log("Found user:", currentUser);
    console.log("Submitted user:", user);

    if (!currentUser) {
      res.status(401).send("User doesn't exist! Please register.");
    } else {
        res.send({ user: { id: currentUser.id, username: currentUser.username, email: currentUser.email} });

      //res.send({ user: currentUser });
    }
  });
}


const register = (req, res) => {
    const { username, email, password } = req.body;

    fs.readFile("users.json", "utf-8", (err, data) => {
        let users = [];

        if (!err) {
            users = JSON.parse(data);
        }

        const emailExists = users.find(user => user.email === email);
        if (emailExists) {
            return res.status(400).json({ error: 'Email already exists in the system' });
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).send("Error encrypting password");
            }

            const newUser = { id: Date.now(), username, email, password: hash };
            users.push(newUser);

            fs.writeFile("users.json", JSON.stringify(users, null, 2), err => {
                if (err) return res.status(500).send("Error saving user");

                return res.status(200).json({ message: 'User registered successfully', user: newUser });
            });
        });
    });
};

// שמירת הפונקציות כיצוא
module.exports = { get, getById, login, register };
