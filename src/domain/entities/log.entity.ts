export enum LogServerityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogServerityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogServerityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { level, message, origin, createdAt = new Date() } = options;
    this.level = level;
    this.message = message;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  /**
   * Creates an instance of LogEntity from a JSON string.
   *
   * @param json - The JSON string to parse.
   * @returns A new instance of LogEntity.
   * @throws Will throw an error if the JSON string cannot be parsed.
   */
  static fromJson = (json: string): LogEntity => {

    json = (json === '') ? '{}' : json;

    const { level, message, createdAt, origin } = JSON.parse(json);
    const log = new LogEntity({
      level,
      message,
      createdAt,
      origin,
    });
    return log;
  };

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { level, message, createdAt, origin } = object;
    const log = new LogEntity({
      level,
      message,
      createdAt,
      origin,
    });
    return log;
  };
}
