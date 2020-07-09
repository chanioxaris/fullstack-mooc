export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis["code"]>;
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface OccupationalHealthcareEntry extends BaseEntry{
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

export type SickLeave = {
    startDate: string;
    endDate: string
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

export type Discharge = {
    date: string;
    criteria: string;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Array<Entry>;
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export type PatientPublic = Omit<Patient, "ssn" | "entries">;
export type NewPatient = Omit<Patient, "id">;