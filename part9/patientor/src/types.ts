export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Array<Entry>;
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis["code"]>;
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export enum HealthCheckRating {
    "Healthy" = 1,
    "LowRisk" = 2,
    "HighRisk" = 3,
    "CriticalRisk" = 4
}

export interface OccupationalHealthcareEntry extends BaseEntry{
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

type SickLeave = {
    startDate: string;
    endDate: string;
};

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

type Discharge = {
    date: string;
    criteria: string;
};

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;
