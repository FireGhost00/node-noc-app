import { LogServerityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const logRepository = new LogRepositoryImpl(
 // new FileSystemDatasource()
 new MongoLogDataSource(),
);
const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("Server started");

    // mandar mail
   // new SendEmailLogs(emailService, fileSystemLogRepository).execute(
    //  "realgomez10@gmail.com"
    //);
    // emailService.sendEmail({
    //     to: "realgomez10@gmail.com",
    //     subject: "Logs de sistema - test",
    //     htmlBody: `
    //     <h3>Logs de sistema - NOC</h3>
    //     <p>Qui eu velit dolore aute.</p>
    //     <p>Ver logs adjuntos</p>
    //     `
    // });

    // emailService.sendEmailWithSystemLogs("realgomez10@gmail.com");

    //const logs = await logRepository.getLogs(LogServerityLevel.high);
    //console.log("Logs", logs);

      //CronService.createJob(
      //    "*/5 * * * * *",
      //    () => {
      //        const url = "http://fdfdfdgoogle.com";
      //        new CheckService(
      //            logRepository,
      //            () => {
      //                console.log(`Service checked: ${url}`);
      //            },
      //            (error) => {
      //                console.error(`Error on check service: ${error}`);
      //            }
      //        ).execute(url)
      //        //new CheckService().execute("http://localhost:3001")
      //    }
      //);
  }
}
