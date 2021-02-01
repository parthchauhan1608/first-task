require("dotenv").config();
const { User,Token } = require("./userSchema");
const mongoose = require('mongoose');

async function connectToMongoDB(){
    return mongoose.connect(process.env.mongodb,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      });
}

function disconnectToMongoDB(connection){
    connection.connection.close();
}

async function saveNewUser(user){
    let connection = await connectToMongoDB();
    user = await user.save();
    await disconnectToMongoDB(connection);
    return user;
}

async function countDocument(query,search){
    let connection = await connectToMongoDB();
    let count = await User.find(query)
                        .or(search)
                        .countDocuments();
    await disconnectToMongoDB(connection);
    return count;
}

async function find(query,select,skip,limit,serch,sort){
    let connection = await connectToMongoDB();
    let user = await User.find(query)
                        .sort(sort)
                        .select(select)
                        .or(serch)
                        .skip(skip)
                        .limit(limit);
    await disconnectToMongoDB(connection);
    return user;
}

async function findOne(query,select){
    let connection = await connectToMongoDB();
    let user = await User.findOne(query).select(select);
    await disconnectToMongoDB(connection);
    return user;
}

async function update(query,set,select){
    let connection = await connectToMongoDB();
    let user = await User.findOneAndUpdate(query,set,{new: true}).select(select);
    await disconnectToMongoDB(connection);
    return user;
}

async function saveToken(token){
    let connection = await connectToMongoDB();
    token = await token.save();
    await disconnectToMongoDB(connection);
    return token;
}

async function findToken(query){
    let connection = await connectToMongoDB();
    let token = await Token.findOne(query);
    await disconnectToMongoDB(connection);
    return token;
}

module.exports = { saveNewUser,countDocument,find,findOne,update,saveToken,findToken };