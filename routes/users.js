var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
const { type } = require('os');

router.get('/', function (req, res, next) {
  fs.readFile('./backend/users_data.json', function (err, data) {
    if (err) {
      console.log('err');
    }
    var extractedData = data.map((user) => ({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    }));
    console.log(extractedData);
    res.send(`<div><h1> ${extractedData}</h1></div>`);
    return;
  });

  //   fs.readFile('./backend/users_data.json', (err, data) => {
  //     if (err) {
  //       console.log('err');
  //     }
  //     const usersObj = JSON.parse(data);
  //     res.send(`<div> ${usersObj} </div>`);
  //     console.log(usersObj);
  //     return;
  //   });
});

// // Route to get all users
// router.get('/', function (req, res, next) {
//   var filePath = path.join(__dirname, '..', 'backend', 'users_data.json');

//   fs.readFile(filePath, 'utf8', function (err, data) {
//     if (err) {
//       return next(err);
//     }

//     try {
//       var users = JSON.parse(data);

//       var simplifiedUsers = users.map((user) => ({
//         first_name: user.first_name,
//         last_name: user.last_name,
//         email: user.email,
//       }));

//       res.json(simplifiedUsers);
//     } catch (error) {
//       next(error);
//     }
//   });
// });

// // Route to get a specific user by ID
// router.get('/:id', function (req, res, next) {
//   var userId = parseInt(req.params.id);
//   var filePath = path.join(__dirname, '..', 'backend', 'users_data.json');

//   fs.readFile(filePath, 'utf8', function (err, data) {
//     if (err) {
//       return next(err);
//     }

//     try {
//       var users = JSON.parse(data);
//       var user = users.find((u) => u.id === userId);

//       if (!user) {
//         res.status(404).send('User not found');
//       } else {
//         var simplifiedUser = {
//           first_name: user.first_name,
//           last_name: user.last_name,
//           email: user.email,
//         };

//         res.json(simplifiedUser);
//       }
//     } catch (error) {
//       next(error);
//     }
//   });
// });

// // Route to get a specific user by ID
// router.get('/:id', function (req, res, next) {
//   var userId = parseInt(req.params.id);
//   var filePath = path.join(__dirname, '..', 'backend', 'users_data.json');

//   fs.readFile(filePath, 'utf8', function (err, data) {
//     if (err) {
//       return next(err);
//     }

//     try {
//       var users = JSON.parse(data);
//       var user = users.find((u) => u.id === userId);

//       if (!user) {
//         res.status(404).send('User not found');
//       } else {
//         var userWithPassword = {
//           first_name: user.first_name,
//           last_name: user.last_name,
//           email: user.email,
//           password: user.password, // Include password
//         };

//         res.json(userWithPassword);
//       }
//     } catch (error) {
//       next(error);
//     }
//   });
// });

// // Middleware to handle JSON body parsing
// router.use(bodyParser.json());

// // POST route to add a user
// router.post('/add', function (req, res, next) {
//   var newUser = req.body; // The new user data should be in the request body
//   var filePath = path.join(__dirname, '..', 'backend', 'users_data.json');

//   fs.readFile(filePath, 'utf8', function (err, data) {
//     if (err) {
//       return next(err);
//     }

//     try {
//       var users = JSON.parse(data);

//       // Add the new user
//       users.push(newUser);

//       // Write the updated users back to the file
//       fs.writeFile(
//         filePath,
//         JSON.stringify(users, null, 2),
//         function (writeErr) {
//           if (writeErr) {
//             return next(writeErr);
//           }

//           res.status(201).send('User added successfully');
//         }
//       );
//     } catch (error) {
//       next(error);
//     }
//   });
// });

module.exports = router;
