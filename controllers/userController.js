const fs = require('fs');
const filePath = './database.json';
const { readData, writeData } = require('../utils/file');

//async function to add a user
async function createUser(req, res){
    try{
      const data = await readData();

      //determine last user id
      const lastUser = data.users[data.users.length - 1];

      //last user id is checked.  defaults to one if last user does not exist.
      const nextId = lastUser ? lastUser.id + 1 : 1;

      //Created a new user object
      const newUser = {
        id: nextId,
        username: req.body.username,
        first_name: req.body.first_name,
        email: req.body.email,
      };

      //push the new data record to the users object
      data.users.push(newUser);

      //write this data to finalize it
      await writeData(data);

      //refresh the page
      res.redirect('/');

    }catch(error){
        res.status(500).json(`Internal Server Error: ${error}`);
    }
}

//async function to update a user
async function updateUser(req, res){
    try{
      const data = await readData();

      //finder function that fetches user by id
      const user = data.users.find(user => user.id === parseInt(req.params.id));

      //update the user object fields with values from the req.body (form data incoming)
      if(user){
        user.username = req.body.new_username || user.username;
        user.first_name = req.body.first_name || user.first_name;
        user.email = req.body.new_email || user.email;

        await writeData(data);

        res.status(200).json("User added successfully");

      } else {
        res.status(404).json("User not found.  Please try again.");
      }

    }catch(error){
      res.status(500).json("Internal Server Error");
    }
}

//async function to delete a user
async function deleteUser(req, res){
    try{
      const data =  await readData();

      //finder function that fetches user by id
      const user = data.users.find(user => user.id === parseInt(req.params.id));

      //check if user exists.  Splice the user from the users array/object
      if(user){
        //user is index position (or id).  "1" is the match to remove.
        data.users.splice(user, 1);
        await writeData(data);

        res.status(200).json("User successfully deleted");
       } else {
        res.status(404).json("User not found.  Please try again.");
       }

    }catch(error){
       res.status(500).json("Internal Server Error");
    }
}

module.exports = {
   createUser,
   updateUser,
   deleteUser
}


