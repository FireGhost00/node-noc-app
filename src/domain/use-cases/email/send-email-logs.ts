import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogServerityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase {
  execute(to: string | string[]): Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]) {
    try {
      const sent = await this.emailService.sendEmailWithSystemLogs(to);
      const log = new LogEntity({ 
        message: `Logs sent to ${to}`,
        level: LogServerityLevel.low,
        origin: "send-email-logs.ts",
    });
    await this.logRepository.saveLog(log);
      if (!sent) {
        throw new Error("Error sending email");
      }
      return true;
    } catch (error) {
        const log = new LogEntity({ 
            message: `Error sending email to ${to}- ${error}`,
            level: LogServerityLevel.high,
            origin: "send-email-logs.ts",
        });
        await this.logRepository.saveLog(log);
      return false;
    }
  }
}
