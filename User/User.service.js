const User = require('./User.js');

async function createUser(username, password) {
  const user = new User({ username, password });
  await user.save();
  return user;
}

async function authenticateUser(username, password) {
  const user = await User.findOne({ username, password });
  if (!user) throw new Error('Invalid username or password');
  return user;
}

module.exports = {
  createUser,
  authenticateUser,
};
