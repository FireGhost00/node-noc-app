

export enum logServerityLevel{
    low = 'low',
    medium = 'medium',
    high = 'high',
}




export class logEntity {

    public level: string;
    public message: string;
    public createdAt: Date;


}