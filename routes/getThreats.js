const axios = require('axios');

/*
const getThreats = ()=>{
    
    return axios.get('https://xxxxxxxxxxxxxxxx/threats/api/v2/threats?api_key=')
            .then(response=>{
                const data = response.data.data.threats;
                var threats=[];

                data.forEach((obj,i)=>{
                    var dateValidated = new Date(obj.validated_at*1000).toLocaleString("es-AR");
                    var dateUpdated = new Date(obj.updated_at*1000).toLocaleString("es-AR");
                    var datePublishedAt = new Date(obj.published_internet_at*1000).toLocaleString("es-AR");

                    var threat = {
                        "nombre":obj.name,
                        "tipo":obj.type,
                        "riesgo":obj.risk_value,
                        "fechaDeteccion":dateValidated,
                        "fechaPublicacion":datePublishedAt,
                        "fechaActualizacion":dateUpdated                 
                    };
                    console.log(threats);
                    threats.push(threat);
                });

                return threats;
            })
            .catch(error=>{
                console.log(error);
            });
                
}*/

const getThreats = ()=>{
    
    return "ESTO ES UNA PRUEBA";
                
}

module.exports.getThreats = getThreats;