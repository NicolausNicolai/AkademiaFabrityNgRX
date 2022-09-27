import { ApplicationStatus } from "./applicationStatus"

export interface Application
{
    id: number
    number: string
    title: string
    description: string
    applicantsName: string
    createdDate: Date
    applicationStatus: ApplicationStatus
    completionDate: Date
}