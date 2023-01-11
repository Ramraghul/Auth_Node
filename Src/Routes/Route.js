//Required;
require('dotenv').config();
const User = require('../Model/Model');
const express = require('express');
const Path = express.Router();
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken')
const SECT = 'ATvtvuvut234876GXKJh56458jhgab'



//Conformation to work;
Path.get('/', (req, res) => {
    res.send('<h1>Hello World....</h1>')
})


//Register New user
Path.post('/Register', async (req, res) => {
    try {
        let Mail = req.body.Email
        let Data = await User.findOne({ Email: Mail });
        if(Data == null){
            let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(req.body.Password, salt)

        req.body.Password = hash;

        //Add user;
        let Insert = new User(req.body);
        Insert.save().then(() => {
            res.status(201).json({ Message: 'New User Add Done' })
        })
        }
        else{
            res.status(404).json({Message:'User Email is already Registered'})
        }
    } catch (error) {
        res.status(500).json({ Message: error })
    }
})


//Login Checking;
Path.post('/Login', async (req, res) => {
    try {
        let check = req.body.Email
        let Data = await User.findOne({ Email: check });
        if (Data == null) {
            res.status(404).json({ Message: 'User not found' })
        }
        let validate = await bcrypt.compare(req.body.Password, Data.Password)
        if (validate) {
            let token = JWT.sign({ _id: Data._id }, SECT, { expiresIn: '30s' })
            res.status(201).json({ Message: 'Wellcome', Token: token })
            res.redirect('/')
        }else{
            res.status(403).json({Message:'Password Wrong'})
        }
    } catch (error) {
        res.status(500).json({ Message: error })
    }
})


//Checking
Path.post('/New/:Token',async (req,res)=>{
    try {
        let Token = req.params.Token;
        let compare = JWT.verify(Token,SECT)
        if(compare){

            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(req.body.Password, salt)
    
            req.body.Password = hash;
    
            //Add user;
            let Insert = new User(req.body);
            Insert.save().then(() => {
                res.status(201).json({ Message: 'New User Add Done' })
            })

        }else{
            res.status(440).json({Message:'Session Expire'})
        }
    } catch (error) {
        res.status(500).json({Message:error})
    }
})



//Export 
module.exports = Path