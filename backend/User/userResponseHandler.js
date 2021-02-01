const { http_codes,message } = require("./constant");

function success(message,data){
    return  {
        code : http_codes.ok,
        message : message,
        data : data
    };
}

function userAlreadyExsist(){
    return {
        code : http_codes.forbidden,
        message : message.exsist_user
    }
}

function userNotExist(){
    return {
        code : http_codes.forbidden,
        message : message.userNotExist
    }
}

function loggedIn(){
    return {
        code : http_codes.ok,
        message : message.loggedIn
    };
}

function internalServerError(){
    return{
        code : http_codes.internalServerError,
        message : message.internalServerError
    }
}

function dataNotFound(){
    return{
        code : http_codes.bad_request,
        message : message.dataNotFound
    }
}

function expireToken(){
    return{
        code : http_codes.unauthorized,
        message : message.expired_token
    }
}

function invalidUserRole(){
    return{
        code : http_codes.bad_request,
        message : message.invalid_role
    }
}

function invalidPassword(){
    return{
        code : http_codes.bad_request,
        message : message.invalid_password
    }
}

function logout(){
    return{
        code : http_codes.ok,
        message : message.logout
    }
}

function middlewareResponse(http_code,message){
    return{
        code : http_code,
        message : message
    }
}

function invalisObjectId(){
    return {
        code : http_codes.bad_request,
        message : message.invalisObjectId
    }
}

function error(error){
    return {
        code : http_codes.bad_request,
        message : error
    }
}

module.exports = { success,userAlreadyExsist,userNotExist,loggedIn,logout,internalServerError,dataNotFound,expireToken,invalidUserRole,
                invalidPassword,middlewareResponse,invalisObjectId,error };