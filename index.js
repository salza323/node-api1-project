const express = require('express');
// const shortid = require('shortid');
const generate = require('shortid').generate;

//instantiating server
const app = express();
app.use(express.json());

//port to be listening on
const PORT = 5000;

//structure for user schema
let users = [{ id: generate(), name: 'Sal', bio: 'awesome dude' }];

//[POST] adding new users to DB
app.post('/api/users', (req, res) => {
  const { name, bio } = req.body;
  try {
    if (!name || !bio) {
      res.status(400).json({
        errorMessage: 'Please provide name and bio for the user.',
      });
    } else {
      const newUser = { id: generate(), name, bio };
      users.push(newUser);
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: 'There was an error while saving the user to the database',
    });
  }
});

//[GET] getting all users
app.get('/api/users', (req, res) => {
  if (!users) {
    res.status(500).json({
      errorMessage: 'The users information could not be retrieved.',
    });
  } else {
    res.status(200).json(users);
  }
});

//[GET] getting specific user with id param
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  try {
    if (!user) {
      res.status(404).json({
        message: 'The user with the specified ID does not exist.',
      });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: 'The user information could not be retrieved.',
    });
  }
});

//[DELETE] removing a specific user from the DB with given id param
app.delete('api/users/:id', (req, res) => {
  const { id } = req.params;
  try {
    if (!users.find((user) => user.id === id)) {
      res.status(404).json({
        message: 'The user with the specified ID does not exist.',
      });
    } else {
      users = users.filter((user) => user.id !== id);
      res.status(200).json({ message: `User with ID ${id} has been deleted.` });
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: 'The user could not be removed',
    });
  }
});

//[PUT] Edit a specific user in the DB with given id param
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  const idxOfUser = users.findIndex((user) => user.id === id);
  try {
    if (idxOfUser !== -1) {
      users[idxOfUser] = { id, name, bio };
      res.status(200).json({ id, name, bio });
    } else if (!name || !bio) {
      res.status(400).json({
        errorMessage: 'Please provide name and bio for the user.',
      });
    } else {
      res.status(404).json({
        message: 'The user with the specified ID does not exist.',
      });
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: 'The user information could not be modified.',
    });
  }
});

//catch all endpoints
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not found!' });
});

//listening for incoming requests
app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});
