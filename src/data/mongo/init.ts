import mongoose from "mongoose";

interface ConnectOptions {
mongoUrl: string;
dbName: string;

}


export class MongoDatabase{

    static async connect(options: ConnectOptions){
        const {mongoUrl, dbName} = options;
        try{
            await mongoose.connect(mongoUrl, {
                dbName,
                
            });
            console.log('Connected to MongoDB');
         
        }catch(err){
            console.error('Error connecting to MongoDB', err);
        }
    
    
    
    }




}


