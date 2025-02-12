

export enum LogServerityLevel{
    low    = 'low',
    medium = 'medium',
    high   = 'high',
}




export class LogEntity {

    public level: LogServerityLevel;
    public message: string;
    public createdAt: Date;

    constructor(level: LogServerityLevel, message: string) {
        this.level = level;
        this.message = message;
        this.createdAt = new Date();
    }


}