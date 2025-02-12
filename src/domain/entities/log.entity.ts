

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

    /**
     * Creates an instance of LogEntity from a JSON string.
     * 
     * @param json - The JSON string to parse.
     * @returns A new instance of LogEntity.
     * @throws Will throw an error if the JSON string cannot be parsed.
     */
    static fromJson = (json: string): LogEntity =>{
        
        const { level, message, createdAt } = JSON.parse(json);
        const log = new LogEntity(level, message);
        log.createdAt = new Date(createdAt);
        return log;
    }


}