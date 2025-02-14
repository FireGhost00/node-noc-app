import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugins";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachement[];
}

interface Attachement {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments,
      });

      const log = new LogEntity({
        level: LogServerityLevel.low,
        message: `Email sent to ${to}`,
        origin: "email-service.ts",
      });
      console.log(sentInformation);

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogServerityLevel.high,
        message: `Email not sent to ${to}`,
        origin: "email-service.ts",
      });
      console.log(error);

      return false;
    }
  }

  async sendEmailWithSystemLogs(to: string | string[]) {
    const subject = "Logs de sistema - test";
    const htmlBody = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Logs de sistema - test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px;
            background: #007bff;
            color: white;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #666;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>¡Hola!</h2>
        </div>
        <div class="content">
            <p>Ver logs adjuntos</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 - Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
        `;

    const attachements: Attachement[] = [
      { filename: "logs-all.log", path: "logs/logs-all.log" },
      { filename: "logs-high.log", path: "logs/logs-high.log" },
      { filename: "logs-medium.log", path: "logs/logs-medium.log" },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments: attachements });
  }
}
