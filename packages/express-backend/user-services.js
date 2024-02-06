import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

const generateId = () =>{
    return String(Math.floor(Math.random() * 900) + 100);
  }

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  }
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}

// const addUser = (user) => {
//     user.id = generateId();
//     const userToAdd = new userModel(user);
//     const promise = userToAdd.save();
//     return promise;
// };

function addUser(user) {
    user.id = generateId();
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise;
}
  

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function findUserByNameAndJob(name, job) {
    return userModel.find({ name: name, job: job });
}
  
  function deleteUserById(id) {
    return userModel.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  findUserByNameAndJob,
  deleteUserById,
};