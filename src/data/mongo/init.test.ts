import mongoose from "mongoose";
import { MongoDatabase } from "./init";
import fs from 'fs';


describe("mongo.init", () => {
    beforeAll(() => {
        fs.mkdirSync('logs', { recursive: true }); // Create before tests
      });


    afterAll(()=>{
        mongoose.connection.close();
    })




    test('should connect to MongoDb', async() => {
        
        console.log(process.env.MONGO_URL, process.env.MONGO_DB_NAME);
       const connected = await MongoDatabase.connect({
            mongoUrl: process.env.MONGO_URL!,
            dbName: process.env.MONGO_DB_NAME!
        })

        expect(connected).toBe(true);
    
    });

    test('should return error if not connected to MongoDb', async() => {
        
        try {
            await MongoDatabase.connect({
                mongoUrl: 'mongodb://nelson:123456fd7@ldfdfocalhost:27017',
                dbName: 'NOC-TEST'
            })
            expect(true).toBe(false);
        } catch (error) {
            
        }
    
    });

});