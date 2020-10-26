const express = require('express');
const shortid = require('shortid');
const generate = require('shortid').generate;

//instantiating server
const app = express();
app.use(express.json());

//port to be listening on
const PORT = 5000;

//structure for user schema
let users = [{ id: generate(), name: 'Sal', bio: 'awesome dude' }];

//getting all users
app.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

//getting specific user with id param
// app.get('/api/users/:id', (req, res) => {
//   const { id } = req.params;
//   const user = users.find((user) => user.id === id);
//   if (!user) {
//     res.status(404).json({
//       message: 'The user with the specified ID does not exist.',
//     });
//   }
//   res.status(200).json(user);
// });

//listening for incoming requests
app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});
