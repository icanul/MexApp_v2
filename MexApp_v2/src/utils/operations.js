import moment from 'moment/moment';



class Operations{

     suma(n1,n2){

        return n1+n2
    
    }
    deg2rad = (deg) => {
        return deg * (Math.PI / 180);
      };
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
   
  
}


export default new Operations();

