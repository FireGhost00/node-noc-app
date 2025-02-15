import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

  constructor(
    private readonly LogRepository: LogRepository[],
    private readonly successCallback: SuccessCallback | undefined, 
    private readonly errorCallback: ErrorCallback | undefined) {

    

  }

  private callLogs(log: LogEntity) {
    this.LogRepository.forEach(async (logRepository) => {
        await logRepository.saveLog(log);
        });
  }




  public async execute(url: string): Promise<boolean> {
     const originName = `check-service.ts`;
    
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service: ${url}`);
      }

      //   const log = new LogEntity({LogServerityLevel.low, `Service ${url} is working`, originName, createdAt});
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Service ${url} is working`,
        origin: originName
      });

      this.callLogs(log);

      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      const errorMesssage = `${url} is not ok. ${error}`;
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: errorMesssage,
        origin: originName
      });
      this.callLogs(log);
      this.errorCallback && this.errorCallback(errorMesssage);
      return false;
    }

  }
}
