const action = require("./userAction");
const middleware = require("./userMiddleware");
const express = require("express");
var cors = require('cors');
const router = express.Router();

router.use(cors());

router.post('/register',[middleware.createUser],async (req,res)=>{
    let result = await action.createUser(req);
    res.status(result.code).send(result);
});

router.post('/login',[middleware.login], async (req, res) => {
    let result = await action.signIn(req);
    res.header('auth_token', result.token).status(result.code).send(result);
});

router.get('/details',[ middleware.validateToken],async (req,res)=>{
    let result = await action.getUSerByRole(req);
    res.status(result.code).send(result);
});

router.get('/details/:id',[ middleware.validateToken],async (req,res)=>{
    let result = await action.getUSerById(req);//remain
    res.status(result.code).send(result);
});

router.post('/createUser',[ middleware.validateToken,middleware.validateUserRole,middleware.createUser],async (req,res)=>{
    let result = await action.createUser(req);
    res.status(result.code).send(result);
});

router.put('/updateUser/:id',[ middleware.validateToken,middleware.validateObjectId],async (req,res)=>{
    let result = await action.updateUserByRole(req);
    res.status(result.code).send(result);
});

router.patch('/toggleStatus/:id',[ middleware.validateToken,middleware.validateObjectId,middleware.validateUserRole],async (req,res)=>{
    let result = await action.blockUserByRole(req);
    res.status(result.code).send(result);
});

router.post('/logout',[middleware.validateToken],async(req,res)=>{
    let result = await action.logout(req);
    res.status(result.code).send(result);
});

router.get('/forgotPassword/:id',async(req,res)=>{
    let result = await action.forgotPassword(req);
    res.status(result.code).send(result);
});

router.put('/changePassword/:id',[middleware.validateObjectId,middleware.validatePassword],async(req,res)=>{
    let result = await action.changePassword(req);
    res.status(result.code).send(result);
});

module.exports = router;