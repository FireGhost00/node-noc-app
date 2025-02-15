
import { envs } from "./config/plugins/envs.plugins";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";

//
(async()=>{
 main();
})();

async function main() {
   
   await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
   });

   // Crear un colección - tables, documento = registro
   // const newLog = await LogModel.create({
   //    message: 'Test message desde Mongo',
   //    origin: 'App.ts',
   //    level: 'App.ts',
      
   // });

   // await newLog.save();
   // console.log('Log created', newLog);

   //const logs = await LogModel.find();
   //console.log('Logs', logs);
   
   //Server.start();
  
}