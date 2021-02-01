const service = require("./userService");

async function createUser(req){
    return await service.createUser(req);
}

async function signIn(req){
    return await service.signIn(req);
}

async function getUSerByRole(req){
    return await service.getUSerByRole(req);
}

async function getUSerById(req){
    return await service.getUSerById(req);
}

async function updateUserByRole(req){
    return await service.updateUser(req);
}

async function blockUserByRole(req){
    return await service.blockUser(req);
}

async function logout(req){
    return await service.logout(req);
}

async function forgotPassword(req){
    return await service.forgotPassword(req);
}

async function changePassword(req){
    return await service.changePassword(req);
}

module.exports = { createUser,signIn,getUSerByRole,getUSerById,updateUserByRole,blockUserByRole,logout,forgotPassword,changePassword };