// const express = require('express');
// const router = express.Router();
// const controllerUser = require('../controller/user')

// router.post("/login", controllerUser.login);
// router.get("/", controllerUser.get);
// router.get("/:id", controllerUser.getById);
// // router.post("/", controllerUser.post);
// router.post("/register", controllerUser.register);

// module.exports = router;




// const express = require('express');
// const router = express.Router();
// const controllerUser = require('../controller/user');

// router.post("/login", controllerUser.login);
// router.get("/", controllerUser.get);
// router.get("/:id", controllerUser.getById);
// router.post("/register", controllerUser.register); // תוקן

// module.exports = router;


const express = require('express');
const router = express.Router();
const controllerUser = require('../controller/user');

// הגדרת נתיבים
router.post("/login", controllerUser.login);  // שימוש בלוגיקה המופיעה ב־controllerUser
router.post("/register", controllerUser.register);
router.get("/", controllerUser.get);
router.get("/:id", controllerUser.getById);

// יצוא של ה-router
module.exports = router;
