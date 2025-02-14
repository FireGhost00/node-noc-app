import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);
const emailService = new EmailService();

export class Server {
  public static start() {
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
