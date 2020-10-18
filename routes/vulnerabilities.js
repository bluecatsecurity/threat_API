const express = require('express');
const router = express.Router();




router.get('/',(req, res, netx)=>{
    res.status(200).json({
        id:01,
        cvss:7,
        type:"XSS",
        description:"XSS reflected"
    });

});


router.get('/:id',(req,res,next)=>{
    const id=req.params.id;
    res.status(200).send('Ingreso la vulnerabilidad '+id);
});

module.exports=router;
