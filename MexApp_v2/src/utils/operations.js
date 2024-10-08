import moment from 'moment/moment';



class Operations{

     suma(n1,n2){

        return n1+n2
    
    }
    deg2rad = (deg) => {
        return deg * (Math.PI / 180);
      };

     fechaFormateada (fecha){
      if(fecha=='1753-01-01 00:00:00+00:00'|| fecha==null){
        return ''

      }else{
        try {
          fechaFormateada = moment(fecha).format('DD/MM/YYYY HH:mm');
            return fechaFormateada
          
        } catch (error) {
          return ''
          
        }

      }        
       
      }//

    calculateDistance(point1, point2){
        const R = 6371; // Radio de la Tierra en kilómetros
        const lat1 = point1.latitude;
        const lon1 = point1.longitude;
        const lat2 = point2.latitude;
        const lon2 = point2.longitude;
     
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
    
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.deg2rad(lat1)) *
            Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        const distance = R * c;

        return distance

    }
    convert_utc_local(fechaOriginal){
      const fechaFormateada = moment(fechaOriginal).format('DD/MM/YYYY HH:mm');
      return fechaFormateada
    }
    fecha_utc_actual(){
      let fechaActual = new Date();
      let year = fechaActual.getUTCFullYear();
      let month = (fechaActual.getUTCMonth() + 1).toString().padStart(2, '0'); // Meses de 0-11, agregar 1
      let day = fechaActual.getUTCDate().toString().padStart(2, '0');
      let hours = fechaActual.getUTCHours().toString().padStart(2, '0');
      let minutes = fechaActual.getUTCMinutes().toString().padStart(2, '0');
      let seconds = fechaActual.getUTCSeconds().toString().padStart(2, '0');
      let fechaHoraUTC = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
      return fechaHoraUTC


    }
    convert_utc_local1(fechaOriginal){
      let horaUTC=moment.utc(fechaOriginal)
      let horaLocal = horaUTC.local();
      let date=horaLocal.format('DD/MM/YYYY HH:mm')
      if(date==='Invalid date'){
        date='  '

      }
      console.log(horaLocal.format('DD/MM/YYYY HH:mm'))
      return date
    }
    dif_hour(fechaInicio,fechaFin){


// Parsea las fechas utilizando moment
const inicio = moment(fechaInicio, 'YYYY-MM-DD HH:mm:ss');
const fin = moment(fechaFin, 'YYYY-MM-DD HH:mm:ss');

// Calcula la diferencia en horas y minutos
const diferencia = fin.diff(inicio);

// Convierte la diferencia en horas y minutos
const duracion = moment.duration(diferencia);

// Obtiene las horas y minutos
const horas = duracion.hours();
const minutos = duracion.minutes();
return horas+' hrs con '+minutos+' min'

    }   
  
}

export default new Operations();

