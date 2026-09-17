const User = require('./../db/user')

async function addUser(userModel) {
   let user = new User({
    ...userModel
   });
   await user.save();
   return user.toObject()
}

async function getUser() {
    const users = await User.find();
    return users.map(x=>x.toObject())
}

async function getSingleUser(id) {
    const user = await User.findById(id);
    return user.toObject()
}

async function updateUser(id,userModel) {
    const filter = {_id: id}
    const user = await User.findByIdAndUpdate(filter, userModel);
    return user.toObject()
}

async function deleteUser(id) {
    await User.findByIdAndDelete(id);
}

module.exports = {addUser, getUser, getSingleUser, updateUser, deleteUser}