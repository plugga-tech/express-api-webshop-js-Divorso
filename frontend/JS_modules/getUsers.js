// const fs = require('fs');
// const path = require('path');

// // Adjust the path to point to the location of 'users_data.json'
// const filePath = path.join(__dirname, '..', '..', 'backend', 'users_data.json');

// // Read the JSON file asynchronously
// fs.readFile(filePath, 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error reading the file:', err);
//     return;
//   }

//   //   // Parse the JSON data
//   //   const users = JSON.parse(data);

//   //   // Log the users to the console
//   //   console.log(users);
//   console.log('hello my boy');
// });

// import fs from 'fs/promises';
// import path from 'path';

// async function getUsersWithoutPasswords() {
//   const filePath = path.join(path.resolve(), 'data', 'users_data.json');

//   try {
//     const data = await fs.readFile(filePath, 'utf8');
//     const users = JSON.parse(data);

//     // Remove the password property from each user object
//     return users.map(
//       ({ password, ...userWithoutPassword }) => userWithoutPassword
//     );
//   } catch (error) {
//     console.error('Error processing the user data:', error);
//     throw error; // Re-throw the error to handle it in the calling context
//   }
// }

// export { getUsersWithoutPasswords };
