const { Router } = require('express');
const router = Router();
const nodemailer = require('nodemailer');
const threats = require('./threats');






var fecha = new Date().toLocaleDateString("es-AR");


router.post('/',(req,res,next)=>{
    //console.log(req.body);
    
    const {name, email, age} = req.body;
    const contentHTML = `
        <!DOCTYPE html>
            <head>
                <title>EMAIL</title>
            </head>
            <body>
                <ul>
                    <li> ${name} </li>
                    <li> ${email} </li>
                    <li> ${age} </li>
                </ul>
            </body>
        </html>
    `
    res.send(contentHTML);
});

router.get('/',async (req,res,next)=>{
    
    const transporter =  nodemailer.createTransport({
        host: 'smtp.yandex.com',
        port: 587,
        secure: false,
        auth: {
            user: 'from@yandex.com',
            pass: '*******'
        },
        tls: {
            rejectUnauthorized: false
        }
    
    });
    
    const info = await transporter.sendMail({
        from: 'from@yandex.com',
        to: 'to@gmail.com',
        subject: 'Prueba Nodejs',
        text: 'Esto es una prueba'

    });

    res.send("Recibido"+JSON.stringify(info));
});



router.get('/threats/:tiempo',(req,res,next)=>{
    const seg=60;
    const mili=1000;
    const tiempo = req.params.tiempo*seg*mili;
    
    let found="false";
    var vault=[];
    var emailRecipientSender=[];
    setInterval(() => {
        //console.log("Vault: "+ JSON.stringify(vault));
        emailRecipientSender=[];
        threats.giveme()
        .then(data=>{

            data.forEach((obj,i)=>{
                
               
                    // Formateo la fecha a 'dd/mm/yyyy' 
                    var fech = obj.fechaDeteccion.substr(0,obj.fechaDeteccion.indexOf(' ')).split('/');
                    var fech2 = fech[1] + '/' + fech[0] + '/' + fech[2]; // paso a formato 'mm/dd/yyyy'
                                                                        // De ésta manera, me deja hacer luego
                                                                        // new Date(fech2)
                    
                   

                    // Pregunto si la fecha de la VULN es de hoy y muestro VULN
                    if ( (new Date(fech2).toLocaleDateString("es-AR")) === fecha ){
                        // No está en vault? Entonces es nuevo y lo agrego a vault 
                        if (!vault.some(element=>element.referencia === obj.referencia)){
                            vault.push(obj);
                            emailRecipientSender.push(obj);
                            found="true";
                        }
                        
                    }
                        
                    
                    
                    
                    
                //}

                    
            });
            
            if(found==="true"){
                transporter.sendMail({
                    from: 'from@yandex.com',
                    to: 'to@gmail.com',
                    subject: 'Prueba Nodejs',
                    //text: 'OCTAVIO',
                    //html : '<b>Llegó algo</b>'
                    //html: '<b>"'+vault.referencia+'"</b><b>"'+vault.nombre+'"</b>'
                    html: '<b>'+JSON.stringify(emailRecipientSender)+'</b>'
                });

            }
            
                      
            
        })
        .catch(error=>{
            console.log(error);
        })
        found="false";
    //var date = new Date();
    //date.toLocaleString("es-AR");
    }, tiempo);
    res.end();
});

const transporter =  nodemailer.createTransport({
    host: 'smtp.yandex.com',
    port: 587,
    secure: false,
    auth: {
        user: 'from@yandex.com',
        pass: '********'
    },
    tls: {
        rejectUnauthorized: false
    }

});



module.exports = router;