import { Alert } from "react-native"
import StorageData from "./storageData"
import TMS from "../api/tms"
import { RectButton } from "react-native-gesture-handler"


class SendData {

    
    send_incidencia=async()=>{
      console.log('buscarndo incidencioas:::::::::::::::::::::::::::::::')
        var id=''
        const resp = await TMS.get_token_incidencias()
        var token=resp.token
    
        const incidents=await StorageData.consultData('@incidents_saves')
        if(incidents!= null){
          var convert=JSON.parse(incidents)
          for(var i=0;i<incidents.length;i++){
            console.log(incidents[i])
            var iteratio=convert[i]
            const objetoEncontrado = iteratio[0]//convert.find(objeto => objeto.incident.incident.incident_time === props.incident.incident.incident_time);
           
           
            var imaegenes=objetoEncontrado.imagenes
            var incident_=objetoEncontrado.incident.incident
       //     console.log(incident_.type_Id)

            var incident ={
              "incident":{
                  "shipment_Id":global.solicitud,
                  "type_Id":incident_.type_Id,
                  "comment":incident_.comment,
                  "vehicle_id":global.vehicle_id,
                  "driver_id":global.id_operador,
                  "vehicle_vehicle_id":null ,
                  "incident_time":incident_.incident_time
              } 
            }
      
            try {
              console.log('enviando sin conexion')

              var response = await TMS.insert_incidents(token,incident)
              id = response.id
              console.log( 'se subio: ' +id, ' guardada sin conexion')
              console.log('total de imagenes:'+imaegenes.length)
              if(imaegenes.length>0){
                for(var i=0;i<imaegenes.length;i++){
                  var image=imaegenes[i]
                  console.log(image)
                   const formData = new FormData()
                  const data = {uri:image.uri, type:"image/jpeg", name:'profile'+'.jpg', filename:'afiletest'};
                  formData.append("", data);
                  try {
                      const set_evi= await TMS.insert_evidencias_incidents(token,formData,id)
                      console.log(set_evi)
                      var response= await set_evi.json();
                      console.log(response)             
                      
                    } catch (error) {
                      console.log(error)
                    }
              }
              const clean_data= StorageData.deleteData('@incidents_saves')
              console.log('Datos borrados:::'+clean_data)         
    
        
              }else{
                const clean_data= StorageData.deleteData('@incidents_saves')
                console.log('no habia imagenes')         
      
                
              }
              
            } catch (error) {
              console.log(error)
              
              
            }
  
          }
    
        }else{
            console.log('no hay incidencias  today')
        }
        return 'ok'
    
      }
    




}
export default new SendData;