import { LogEntity, LogServerityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {

  constructor(
    private readonly LogRepository: LogRepository,
    private readonly successCallback: SuccessCallback | undefined, 
    private readonly errorCallback: ErrorCallback | undefined) {

    

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
        level: LogServerityLevel.low,
        message: `Service ${url} is working`,
        origin: originName
      });

      await this.LogRepository.saveLog(log);

      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      const errorMesssage = `${url} is not ok. ${error}`;
      const log = new LogEntity({
        level: LogServerityLevel.high,
        message: errorMesssage,
        origin: originName
      });
      this.LogRepository.saveLog(log);
      this.errorCallback && this.errorCallback(errorMesssage);
      return false;
    }

  }
}
