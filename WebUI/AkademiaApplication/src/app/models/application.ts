import { ApplicationStatus } from "./applicationStatus"

export interface Application
{
    id: number | null
    number: string | null
    title: string | null
    description: string | null
    applicantsName: string | null
    createdDate: Date | null
    applicationStatus: ApplicationStatus | null
    completionDate: Date | null
}