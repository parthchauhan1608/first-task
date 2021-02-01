const { http_codes,message } = require("./constant");
const validate = require("./validateUser");
const response = require("./userResponseHandler");
const mongoose = require('mongoose');


    async function createUser(req, res, next) {
    if(req.body.name && req.body.email && req.body.password && req.body.role){
        let error = '';
        error += validate.validateName(req.body.name);
        error += validate.validateEmail(req.body.email);
        error += validate.validatePassword(req.body.password);
        error.errorRole = validate.validateReqBodyRole(req.body.role);
        if (error) {
            error = response.middlewareResponse(http_codes.bad_request,error);
            res.status(http_codes.bad_request).send(error);
        }
        else {
            next();
        }
    }
    else{
        let error = response.middlewareResponse(http_codes.unauthorized,message.invalid_request_body);
        res.status(http_codes.bad_request).send(error);
    }
}

async function login(req, res, next) {
    if(req.body.email && req.body.password){
        next();
    }
    else{
        let error = response.middlewareResponse(http_codes.bad_request,message.invalid_Token);
        res.status(http_codes.bad_request).send(error);
    }
}


async function validateUserRole(req, res, next) {
    if(req.body.role){
        role = await validate.validaterole(req.body.role, req.body.decodedToken.role);
        if (!role) {
            let error = response.middlewareResponse(http_codes.bad_request,message.invalid_role);
            res.status(http_codes.bad_request).send(error);
        }
        else {
            next();
        }
    }
    else{
        next();
    }
}

async function updateUserByRole(req, res, next) {
    let error = '';
    if (req.body.name) {
        error += validate.validateName(req.body.name);
    }
    if (req.body.email) {
        error += validate.validateEmail(req.body.email);
    }
    if(req.body.role){
        error += validate.validateReqBodyRole(req.body.role);
        req.body.role = req.body.role.toUpperCase();
    }
    if (req.body.password) {
        error = response.middlewareResponse(http_codes.bad_request,message.canNotEnterPassword);
        res.status(http_codes.bad_request).send(error);
    }
    else if (error) {
        error = response.middlewareResponse(http_codes.bad_request,error);
        res.status(http_codes.bad_request).send(error);
    }
    else{
        next();
    }
}

async function validateToken(req,res,next){
    req.body.decodedToken = await validate.validateToken(req, res);
    if(req.body.decodedToken){
        next();
    }else{
        res.status(http_codes.bad_request).send(error);
    }
}

function validateObjectId(req,res,next){
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        next();
    }
    else{
        let error = response.invalisObjectId();
        res.status(http_codes.bad_request).send(error);
    }
}

function validatePassword(req,res,next){
    if(req.body.password){
        let error = '';
        error += validate.validatePassword(req.body.password);
        if (error) {
            error = response.middlewareResponse(http_codes.bad_request,error);
            res.status(http_codes.bad_request).send(error);
        }
        else {
            next();
        }
    }
    else{
        let error = response.middlewareResponse(http_codes.unauthorized,message.invalid_request_body);
        res.status(http_codes.bad_request).send(error);
    }
}


module.exports = { createUser,login,validateUserRole,updateUserByRole,validateToken,validateObjectId,validatePassword };