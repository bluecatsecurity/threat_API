const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const vulnRoutes = require('./routes/vulnerabilities');
const threatsRoutes = require('./routes/threats');
const email = require('./routes/email');
const app = express();


const PORT = process.env.PORT || 3000;

// Parseo Body
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,Content-Type,Authorization,x-id,Content-Length,X-Requested-With");
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});

    }    
    next();
});

app.use('/vulnerabilities',vulnRoutes);
app.use('/threats',threatsRoutes);
app.use('/email',email);


app.use((req, res, next)=>{
     
    const error = new Error('Not found');
    error.status=404;
    //res.send(error.message);
    next(error);
})



app.use((error, req, res, next)=>{
    
    res.status(error.status);
    res.json({
        error:{
            message: error.message
        }
    });
});



app.listen(PORT,()=>{
    console.log("Server listening on port "+ PORT);
});



