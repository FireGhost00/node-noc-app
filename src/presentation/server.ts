import { envs } from '../config/plugins/envs.plugins';
import { LogRepository } from '../domain/repository/log.repository';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';



const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);
  
  


export class Server {
  
    public static start() {
    console.log("Server started");

      
        // mandar mail
       const emailService = new EmailService();
      // emailService.sendEmail({
      //     to: "realgomez10@gmail.com",
      //     subject: "Logs de sistema - test",
      //     htmlBody: `
      //     <h3>Logs de sistema - NOC</h3>
      //     <p>Qui eu velit dolore aute.</p>
      //     <p>Ver logs adjuntos</p>
      //     `
      // });
     
      //emailService.sendEmailWithSystemLogs("realgomez10@gmail.com");

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

