const express = require('express');
const cors = require('cors');
const users = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../modules/User');

users.use(cors());
process.env.SECRET_KEY='secret';

users.post('/signup', (req,res)=>{
 
    const today = new Date();
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        phone:req.body.phone,
        created: today
    }

    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(user=>{
        if(!user){
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                userData.password = hash
                User.create(userData)
                .then(user=>{
                    res.json({status:user.email +' has been registered'})
                  
                })
                .catch(err=>{
                    res.send('error '+err +' could not register')
                })
            })
        }else
        res.json({error:' user is alrady exists'})
    }).catch(err =>{
        res.send('error: '+err)
    })
    
})

//TODO FIX THE MIDDLEWERE
users.post('/signin',(req, res)=>{
  
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(user =>{
        if(user){   
        
            if(bcrypt.compareSync(req.body.password, user.password)) {
                 jwt.sign(user.dataValues, process.env.SECRET_KEY, (err, token) => {

                res.json({token})
                   
                })
                
            }else{
                res.status(400).json({error: 'User is already exists'})
            }
        }
    }).catch(err =>{
        res.status(400).json({error: err})
    })


})

// USER PROFILE
users.get('/profile',veryfyToken, (req, res) => {
    const userInfo =  req.user;
    res.json({userInfo});
 
})

users.put('/update/:id', (req, res)=> {
   
    console.log(req.params);
      
    const user = {
    id: req.params.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone
    }
    
//   const {id, first_name, last_name, email, phone} = user
  

   

    
            User.update(
              { first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone
                
              },
              { where: { id: user.id } }
             
            ).then(user =>{
            
                if(user){
                 console.log(user)
                    res.status(200).send(user)
                }
                
            }).catch(error => res.status(400).send({error}) )
               
        
    


})




// FORMAT OF TOKEN 
//Authorization: Bearer <accsess_token>

// verify Token function
function veryfyToken(req, res, next) {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
        //split at the space and Get Token From Array
        const token = bearerHeader && bearerHeader.split(' ')[1];
      if(token == null ) return res.sendStatus(401)
     jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
         if(err) return res.sendStatus(403)
         req.user = user
         next()

     })
       
   
}

  
module.exports = users


// users.post('/profile',veryfyToken, (req, res)=> {

// })
// FORMAT OF TOKEN 
//Authorization: Bearer <accsess_token>

// verify Token function
//function veryfyToken(req, res, next) {
    //Get auth header value
  //  const bearerHeader = req.headers['authorization'];
    //Check if Brearer is undefind
   // if(typeof(bearerHeader) != 'undefined'){
        //split at the space
    //    const bearer = bearerHeader.split(' ');
        //Get Token From Array
    //    const bearerToken = bearer[1];
        //set the token
    //    req.token = bearerToken;
   //     next();
   // }else {
   //     res.sendStatus(403)
  //  }
//}

  
module.exports = users
