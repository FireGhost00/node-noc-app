import { $Enums, PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

const serverityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}


export class PostgresLogDataSource implements LogDataSource {




    
  async  saveLog(log: LogEntity): Promise<void> {

        const level = serverityEnum[log.level as keyof typeof serverityEnum];
        const newLog = await prismaClient.logModel.create({
            data: {
                ...log,
                level: level,
            }
        });
    
    
    }
    async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
        const level = serverityEnum[severityLevel as keyof typeof serverityEnum];
        const dbLogs = await prismaClient.logModel.findMany({
            where: {level}
        });

        return dbLogs.map(LogEntity.fromObject);
    }

}
