const express = require('express');
const router = express.Router();
const axios = require('axios');
const getThreats = require('./getThreats');
const { get } = require('./vulnerabilities');
const { response } = require('express');

/*
router.get('/:key',(req,res,next)=>{
    const key = req.params.key;
    const url = 'https://xxxxxxxxxxxxxxxx/threats/api/v2/threats?api_key=';
    const completeQuery=url+key;
    //console.log(completeQuery);
      axios.get(completeQuery)
            .then((response)=>{
                console.log(response.data.data.threats);
                res.end();
            })
                .catch(error=>{
                    console.log(error);
                });
    
});


*/

router.get('/',(req,res,next)=>{
   
    
        axios.get('https://xxxxxxxxxxxxxxxx/threats/api/v2/threats?api_key=')
            .then(response=>{
                const data=response.data.data.threats;
                var threats = [];               
                
                data.forEach((obj,i)=>{
                     
                    // reemplazo keys del json
                    //2Fecha publicacion
                    //obj.fecha_publicacion=obj.published_internet_at;
                    //delete obj.published_internet_at;
                   
                    //1Fecha de deteccion
                    //obj.fecha_deteccion=obj.validated_at;
                    //delete obj.validated_at;
                  
                    //3Fecha de actualizacion
                    //obj.fecha_actualizacion=obj.updated_at;
                    //delete obj.updated_at;

                    //Subtipo
                    //obj.subtipo=obj.reason;
                    //delete obj.reason;

                    //Afectacion
                    //obj.afectacion=obj.affected_locations;
                    //delete obj.affected_locations;

                    

                    //console.log("Nombre:"+obj.name+"---"+" Tipo:"+obj.type+"---"+" Riesgo:"+obj.risk_value);
                    // Formateo timestamps de tipo EPOC 
                    // Uso dos variables de tipo Date para 4 variables
                   

                    var dateValidated = new Date(obj.validated_at*1000).toLocaleString("es-AR");
                    var dateUpdated = new Date(obj.updated_at*1000).toLocaleString("es-AR");
                    //var datePublished = new Date(obj.published_at*1000);
                    var datePublishedAt = new Date(obj.published_internet_at*1000).toLocaleString("es-AR");
                    
                    
                    /*dateValidated.setUTCSeconds(obj.validated_at);
                    dateUpdated.setUTCSeconds(obj.updated_at);
                    datePublished.setUTCSeconds(obj.published_at);
                    datePublishedAt.setUTCSeconds(obj.published_internet_at);
                    
                    obj.validated_at=dateValidated.toLocaleDateString("es-AR")+" "+dateValidated.toLocaleTimeString();
                    obj.updated_at=dateUpdated.toLocaleDateString("es-AR")+" "+dateUpdated.toLocaleTimeString(); 
                    obj.published_at=datePublished.toLocaleDateString("es-AR")+" "+datePublished.toLocaleTimeString();
                    obj.published_internet_at=datePublishedAt.toLocaleDateString("es-AR")+" "+datePublishedAt.toLocaleTimeString(); 
                     */ 

                    //console.log(date.toTimeString());
                    //console.log("Validado "+dateValidated.toLocaleDateString("es-AR")+" "+dateValidated.toLocaleTimeString()+" "+" Actualizado: "+dateUpdated.toLocaleDateString("es-AR")+" "+dateUpdated.toLocaleTimeString());
                    
                   if(obj.published_at === '31/12/1969 9:00:00 PM'){
                        console.log(obj);
                    }
                    
                    
                    
                    var threat = {
                        "referencia":obj.reference,
                        "nombre":obj.name,
                        "tipo":obj.type,
                        "riesgo":obj.risk_value,
                        "fechaDeteccion":dateValidated,
                        "fechaPublicacion":datePublishedAt,
                        "fechaActualizacion":dateUpdated                 
                    };
                    
                    threats.push(threat);
                    //console.log("\nNombre:"+obj.name+"\t"+" Tipo:"+obj.type+"\t"+" Riesgo:"+obj.risk_value+" Fecha Deteccion:"+dateValidated+"\t"+" Fecha publicación:"+datePublishedAt+"\t"+"Fecha Actualización:"+dateUpdated);
                   
                })
                
                console.log("Me llamaste");
                res.send(threats);
                

            })
            .catch(error=>{
                console.log(error);
            });

            
      
    
    
});

const giveme = ()=>{
            
            return axios.get('https://xxxxxxxxxxxxxxxx/api/v2/threats?api_key=')
                .then(response=>{
                    const data=response.data.data.threats;
                    var threats = [];               
                    console.log("Cantidad de threats:"+data.length);
                    data.forEach((obj,i)=>{

                        if(obj.status !== 'closed'){
                            var dateValidated = new Date(obj.validated_at*1000).toLocaleString("es-AR");
                            var dateUpdated = new Date(obj.updated_at*1000).toLocaleString("es-AR");
                            var datePublishedAt = new Date(obj.published_internet_at*1000).toLocaleString("es-AR");
                            var threat = {
                            "referencia": obj.reference,
                            "nombre":obj.name,
                            "tipo":obj.type,
                            "riesgo":obj.risk_value,
                            "fechaDeteccion":dateValidated,
                            "fechaPublicacion":datePublishedAt,
                            "fechaActualizacion":dateUpdated                 
                        };
                    
                        threats.push(threat);
                        

                    }
                    
                        //console.log("\nNombre:"+obj.name+"\t"+" Tipo:"+obj.type+"\t"+" Riesgo:"+obj.risk_value+" Fecha Deteccion:"+dateValidated+"\t"+" Fecha publicación:"+datePublishedAt+"\t"+"Fecha Actualización:"+dateUpdated);
                       
                    })
                    
                    
                    return threats;
                    
    
                })
                .catch(error=>{
                    console.log(error);
                });
    
       
};


router.get('/traeme/:tiempo',(req,res,next)=>{
    

    const tiempo = req.params.tiempo;
    console.log(tiempo);
    setInterval(()=>{

        console.clear();
        
        giveme()
            .then(data=>{
               
                 console.log(data);
            });
            
        
    },tiempo);        
   
});

module.exports=router;
module.exports.giveme=giveme;

