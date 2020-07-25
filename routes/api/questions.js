const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>res.json({test: 'questions is active'}));

module.exports=router