import AsyncStorage from '@react-native-async-storage/async-storage';

//@info_operador 


class StoreData{

    async insertData(key,value) {
        console.log('holassss')

        try { 
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(key, jsonValue)
          console.log('Se gusrada '+ key)
          return 'ok'
        } catch (e) {
          console.log(e)
          return 'fail'
        }
      }

    async deleteData(key) {
      
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch(exception) {
            console.log(error)
            return false;
        }
    }
    async consultData(key){

        try {
            const jsonValue = await AsyncStorage.getItem(key)
            if(jsonValue != null){
                return jsonValue
            }
                return null
            
        } catch (error) {
            console.log(error)
            return null
            
        }
    }



}
export default new StoreData();