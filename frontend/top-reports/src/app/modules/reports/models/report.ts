export interface Report {
    id:  number;
    name: string;
    command: string,
    isRepeated: boolean;
    repeatSchedule?: string;
}