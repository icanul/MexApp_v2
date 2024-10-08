import axios from "axios";

const BASE_API='https://tms.logsys.com.mx/tms/v1/'
const rest_v2='https://app.mexamerik.com/tms/api/v2.0'
const tmsapi='https://tms.logsys.com.mx/maintenance/'
const tmsliqap='https://tms.logsys.com.mx/liquidations.api/api/'
const basic='TWV4QXBwOk0zeDRwcCYq'
const incident_api='https://tms.logsys.com.mx/shipments.incidents.api/'

class Api{
     
    async getOperador(id_Operador, options = {}){
        options.headers = 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization : ' Basic '+basic,
        
        };
        var url='https://tms.logsys.com.mx/tms/v1/drivers/'+id_Operador
        const query = await fetch(url,options);
        const data = await query.json();
        return data;   
      }

    async getUnIdad(id_unidad,options = {}){

      console.log(global.vehicle_id)
        options.headers = 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization : ' Basic '+basic,
        };
        var url='https://tms.logsys.com.mx/tms/v1/vehicles/'+id_unidad
        const query = await fetch(url,options);
        const data = await query.json();
        return data;
    
    
      }

      async getInst(id,options = {}){
        options.headers = 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization : ' Basic '+basic,
        };
        var url= rest_v2+'/instructions/shipment/'+id
        const query = await fetch(url,options);
        //const data = await query.json();
        return query;
      }
      async getRepartos(id,options = {}){
        options.headers = 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization : ' Basic '+basic,
        };
        var url= rest_v2+'/shipments/distribution-pickup/'+id
        const query = await fetch(url,options);
        //const data = await query.json();
        return query;
      }

      async setevidencediesel(image,solicitud ){
        const query= await fetch(rest_v2+"/vehicles/dieselassignment/"+solicitud+"/evidence",{
          method: 'POST',
          headers: {   
            'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization' : ' Basic '+basic,
           },
           body: JSON.stringify({
            "image":image,
           }),
        });
        return query;
      }
      async setevidencegasto(image,id){
        var token=liqtoken
        const query= await fetch("https://tms.logsys.com.mx/liquidations.api/api/outgoings/"+id+"/to-check-evidence",{
          method: 'PATCH',
          headers: {   
            'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization : ' Bearer '+token,  
          'Content-Type': 'multipart/form-data',
           },

           body: image,
        });
      
        return query;
      }
      async setObsgasto(comment,id){
        var token=liqtoken
        const query= await fetch("https://tms.logsys.com.mx/liquidations.api/api/outgoings/"+id+"/to-check-evidence/attach-obs",{
          method: 'PATCH',
          headers: {   
            'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization : ' Bearer '+token,  
     
           },

           body: JSON.stringify(comment)

        });
       
        return query;
      }
      async getliquidations(id_Operador,from_time, to_time, token ,options = {}){
        options.headers = 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization : ' Bearer '+token,  
          'sort': '-id'
        };
        //https://tms.logsys.com.mx/liquidations.api
        var url=tmsliqap+'liquidations?start=0&end=1000&driver_id='+id_Operador+'&from_time='+from_time+"&to_time="+to_time
        console.log(url)
        const query = await fetch(url,options);
        const data = await query.json();

       
        return data;
      

      }
      async getliqdet(id,token,options = {}){
        options.headers = 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization : ' Bearer '+token,
        };
        //
        var url=tmsliqap+'liquidations/'+id
        const query = await fetch(url,options);
        const data = await query.json(); 
        return data;
      
      }
      async getgasto(id_Operador,from_time, to_time,token ,options = {}){
        options.headers = 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization : 'Bearer'+token,
          'sort': '-created_on'
        };
        var url=tmsliqap+'outgoings?start=0&end=1000&driver_id='+id_Operador+'&from_time='+from_time+"&to_time="+to_time
        console.log(url)
        const query = await fetch(url,options);
        const data = await query.json();
       
        return data;
      

      }
      async getdepositos(id_Operador,from_time, to_time,token, options = {}){
        options.headers = 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization : ' Bearer '+token,
          'sort': '-created_on'
        };
        var url='https://tms.logsys.com.mx/liquidations.api/api/deposits?start=0&end=1000&driver_id='+id_Operador+'&from_time='+from_time+"&to_time="+to_time
        console.log(url)
        const query = await fetch(url,options);
        const data = await query.json();
       
        return data;
      

      }
      

      async getfuel(id_Operador,options = {}){
        const fecha = new Date();
        var month = ("0" + (fecha.getMonth() + 1)).slice(-2);
        var lastmonth=("0" + (fecha.getMonth()-2)).slice(-2);
        var añopast=fecha.getFullYear()
        if(lastmonth<=0){
          lastmonth=12
          añopast=fecha.getFullYear()-1

        }
        var date = ("0" + fecha.getDate()).slice(-2);
        var hora=("0" + fecha.getHours()).slice(-2);
        var minute=("0" + fecha.getMinutes()).slice(-2);

        var fechainicio=añopast+'-'+lastmonth+'-'+date+'T'+'00'+':'+'00'+':'+'00'
        var fechaActual=fecha.getFullYear()+'-'+month+'-'+date+'T'+'23'+':'+'59'+':'+'00'
        options.headers = 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization : ' Basic '+basic,
        };
        var url= rest_v2+'/vehicles/dieselassignment/assignments?vehicles=-1&vendors=-1&drivers='+id_Operador+'&status=-1&vendor_type=-1&sort(-time)&from_time='+fechainicio+"&to_time="+fechaActual
        console.log(url)
        const query = await fetch(url,options);
        return query;
      }

      async setLogisticsNotifications(body){
        const query= await fetch("https://tms.logsys.com.mx/mexapp.notifications/api/LogisticsNotifications",{
          method: 'POST',
          headers: {   
            'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
           },

           body: body,
        });
        var data= await query.text()
        console.log(data)
      
        return query;
      }

      async gettoken(){
        const query= await fetch(tmsapi+"api/auth/login",{
          method: 'POST',
          headers: {   
            'Content-Type': 'application/json',
          'Accept': 'application/json',
           },
           body: JSON.stringify({
            "username":'MexApp',
            "password":'M3x4pp&*',
           }),
        });
        var data= await query.json();
        return data;
      }
      async get_token_liq(){
        console.log('generando api')
        //https://tms.logsys.com.mx/liquidations.api/api/CredentialsAuthentication/authenticate
        const query= await fetch(tmsliqap+'CredentialsAuthentication/authenticate',{
          method: 'POST',
          headers: {   
            'Content-Type': 'application/json',
          'Accept': 'application/json',
           },
           body: JSON.stringify({
            "username":'MexApp',
            "password":'M3x4pp&*',
           }),
        });
        var data= await query.json();
        return data;
      }
      async gettypes_m(options = {}){
        try {
          options.headers = 
          {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization : ' Bearer '+token,
            'sort':'-time'
          
          };
          var url = tmsapi+'api/reports/types?name=*'
          const query = await fetch(url,options);
          const data = await query.json();
         console.log(query)
  
          return data;   
          
        } catch (error) {

          return error
          
        }

      }
      async setreportM(body){

        console.log('enviando foto:::')
        try {
           const query= await fetch(tmsapi+'api/reports',{
          method: 'POST',
          headers: {   
            
          'Content-Type': 'multipart/form-data',
          Authorization : ' Bearer '+global.token,  

           },

           body: body,
        });
       

                return query;


        } catch (error) {
          console.log(error)
          return error
          
        }
             }
   

   
      async getreports(vehicle_id,token , options = {}){
        options.headers = 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization : ' Bearer '+token,
          'sort':'-time'
        
        };
        var url = tmsapi+'api/reports?vehicle='+vehicle_id
        const query = await fetch(url,options);
        const data = await query.json();
       // console.log(query)
        return data;   
      }
      async getdetailreport(id,token , options = {}){
        options.headers = 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization : ' Bearer '+token,
          'sort':'-time'
        
        };
        var url = tmsapi+'api/reports/'+id
        const query = await fetch(url,options);
        const data = await query.json();
       // console.log(query)
        return data;   
      }

      async getreportsdetail(token,ot , options = {}){
        options.headers = 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization : ' Bearer '+token,
          'sort':'-time'
        
        };
        var url = tmsapi+'api/reports?ot_folio='+ot+'&status_id=3'
        const query = await fetch(url,options);
        const data = await query.json();
       console.log(query)

        return data;   
      }
      

      async validatereports(ot,bandera){

        console.log('el token:'+global.token)
        const query= await fetch(tmsapi+'api/reports/'+ot+'/validated',{
          method: 'PUT',
          headers: {   
            'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization : ' Bearer '+global.token,  

           },

           body: JSON.stringify({
            "validated_success":bandera,  
           }),
          });

        console.log(query)      
        return query;
      }
      async get_token_incidencias(){
        const query= await fetch(incident_api+'auth/login',{
          method: 'POST',
          headers: {   
            'Content-Type': 'application/json',
          'Accept': 'application/json',
           },
           body: JSON.stringify({
            "username":'MexApp',
            "password":'M3x4pp&*',
           }),
        });
        var data= await query.json();
        return data;

      }
      async insert_incidents(token,data){
        
        const query= await fetch(incident_api+'incidents',{
          method: 'POST',
          headers: {   
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
           },
           body: JSON.stringify(data),
         
        });
         var data= await query.json();
        return data;

      }
      async insert_evidencias_incidents(token,data,id){

        console.log('enviando foto:::')
        console.log(data)

        try {
        const query= await fetch(incident_api+'incidents/'+id+'/attach-evidences',{
          method: 'POST',
          headers: {   
            
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` 

           },

           body: data,
        });
        return query;
        } catch (error) {
          console.log(error)
          return error
          
        }

      }

}
export default new Api();

//