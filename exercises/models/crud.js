const User = require('./user')

const getUserById = async (id) => {
  const idFind = await User.findById(id).exec();
  return idFind;
}

const getAllUsers = () => {
  return User.find({}).exec()
}

const createUser = async (userDetails) => {
  const insertNew = await User.create(userDetails);
  return insertNew;
}
const removeUserById = (id) => {
  return User.findByIdAndRemove(id).exec();
};

const updateUserById = (id, update) => {
  return User.findByIdAndUpdate(id, update, {new: true}).exec();
};

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  removeUserById,
  updateUserById
}
