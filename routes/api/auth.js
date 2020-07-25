const express=require('express');
const bcrypt=require('bcryptjs');
const jsonwt=require('jsonwebtoken');
const passport=require('passport');
const key=require('../../setup/mongourl');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const router=express.Router();

router.get('/',(req,res)=> res.json({test:'Auth is active'}));

const Person=require('../../models/Person');

router.post('/register',(req,res)=>{
    Person.findOne({email: req.body.email})
        .then(person=>{
            if(person){
                return res.status(400).json({emailerror:'email is already registered'})
            }else{
                const newPerson=new Person({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })

                bcrypt.genSalt(saltRounds, (err, salt) =>{
                    bcrypt.hash(newPerson.password, salt, (err, hash) =>{
                        // Store hash in your password DB.
                        if(err)throw err;
                        newPerson.password=hash;
                        newPerson
                            .save()
                            .then(person=>res.json(person))
                            .catch(err=>console.log(err))
                    });
                });
            }
        })
        .catch(err=>console.log(err));
})



module.exports=router;