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
    private readonly successCallback: SuccessCallback, 
    private readonly errorCallback: ErrorCallback) {

    

  }



  public async execute(url: string): Promise<boolean> {
   
    try {
        const req = await fetch(url);
        if (!req.ok) {
            throw new Error(`Error on check service: ${url}`);
        }

        const log = new LogEntity(LogServerityLevel.low, `Service ${url} is working`);
        await this.LogRepository.saveLog(log);

        this.successCallback();
        return true;
    } catch (error) {
       const errorMesssage = `${url} is not ok. ${error}`;
        const log = new LogEntity(LogServerityLevel.high, errorMesssage);
        this.LogRepository.saveLog(log);
        this.errorCallback(errorMesssage);
        return false;
    }

  }
}
