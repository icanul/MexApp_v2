import moment from 'moment/moment';



class Operations{

     suma(n1,n2){

        return n1+n2
    
    }
    deg2rad = (deg) => {
        return deg * (Math.PI / 180);
      };

      fechaFormateada (fecha){
        try {
            return moment(fecha).format('DD/MM/YYYY  HH:mm');
            
        } catch (error) {
            return ''
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

