import { LogRepository } from '../domain/repository/log.repository';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
  );
  
  


export class Server {
  
    public static start() {
    console.log("Server started");

        // mandar mail

    // CronService.createJob(
    //     "*/5 * * * * *",
    //     () => {
    //         const url = "http://google.com";
    //         new CheckService(
    //             fileSystemLogRepository,
    //             () => {
    //                 console.log(`Service checked: ${url}`);
    //             },
    //             (error) => {
    //                 console.error(`Error on check service: ${error}`);
    //             }
    //         ).execute(url)
    //         //new CheckService().execute("http://localhost:3001")
    //     }
    // );
 
   
  }
}

