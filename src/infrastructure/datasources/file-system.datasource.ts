import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";
import * as fs from "fs";

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-all.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-high.log";

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (!fs.existsSync(path)) return;
        fs.writeFileSync(path, "");
      }
    );
  };

/**
 * Saves a log entry to the appropriate log files based on its severity level.
 *
 * @param newLog - The log entry to be saved.
 * @returns A promise that resolves when the log entry has been saved.
 *
 * The log entry is saved to a general log file. Additionally, if the log entry's
 * severity level is medium or high, it is also saved to a specific log file for
 * that severity level.
 *
 * @remarks
 * - Logs with a severity level of `low` are only saved to the general log file.
 * - Logs with a severity level of `medium` are saved to both the general log file
 *   and the medium severity log file.
 * - Logs with a severity level of `high` are saved to both the general log file
 *   and the high severity log file.
 */
  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsjson = `${JSON.stringify(newLog)}\n`;

    fs.appendFileSync(this.allLogsPath, logAsjson);

    if (newLog.level === LogServerityLevel.low) return;

    if (newLog.level === LogServerityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsjson);
    } else {
      fs.appendFileSync(this.highLogsPath, logAsjson);
    }
  }

    private  getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, "utf-8");
        const logs = content.split("\n").map(LogEntity.fromJson);
        return logs;
    
    }
  
  async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
    
    switch (severityLevel) {
        case LogServerityLevel.low:
            return this.getLogsFromFile(this.allLogsPath);
        case LogServerityLevel.medium:
            return this.getLogsFromFile(this.mediumLogsPath);
        case LogServerityLevel.high:
            return this.getLogsFromFile(this.highLogsPath);
        default:
            throw new Error(`${severityLevel} not implemented`);
    }



  }
}
