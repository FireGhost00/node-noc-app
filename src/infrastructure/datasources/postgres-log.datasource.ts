import { $Enums, PrismaClient } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

export class PostgresLogDataSource implements LogDataSource {




  async  saveLog(log: LogEntity): Promise<void> {
        const newLog = await prismaClient.logModel.create({
            data: {
                level: log.level.toUpperCase() as any,
                message: log.message,
                origin: log.origin,
            }
        });
    
    }
    async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
        const logs = await prismaClient.logModel.findMany({
            where: {
                level: severityLevel.toUpperCase() as any,
            }
        });

        return logs.map(LogEntity.fromObject);
    }

}
