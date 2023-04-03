import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveItem = async (item, schema: string) => {
    try{
        await AsyncStorage.setItem(schema, item)
    }catch(err){
        console.log(err); 
    }
    
}

export const update = async (item, schema: string) => {
    try{
        AsyncStorage.mergeItem(schema, item)
    }catch(err){
        console.log(err); 
    }
}

export const getItem = async (id: string) => {
    try{
        const result = await AsyncStorage.getItem(id)
        return result
    }catch(err){
        console.log(err); 
    }
}