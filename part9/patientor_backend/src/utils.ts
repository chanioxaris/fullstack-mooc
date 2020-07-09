import { NewPatient, Gender, Diagnosis, Entry, HealthCheckRating, SickLeave, Discharge } from "./types";
import { v4 as uuid } from "uuid";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const toNewPatient = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: []
    };
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: any): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

export const toNewEntry = (object: any): Entry => {
    switch (object.type) {
        case "HealthCheck":
            return {
                id: uuid(),
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                type: object.type,
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            };
        case "OccupationalHealthcare":
            return {
                id: uuid(),
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                type: object.type,
                employerName: parseEmployerName(object.employerName),
                sickLeave: parseSickLeave(object.sickLeave)
            };
        case "Hospital":
            return {
                id: uuid(),
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                type: object.type,
                discharge: parseDischarge(object.discharge)
            };
        default:
            return assertNever(object);
    }
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing name: ${name}`);
    }
    return name;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing date: ${date}`);
    }
    return date;
};

const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Incorrect or missing ssn: ${ssn}`);
    }
    return ssn;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Incorrect or missing occupation: ${occupation}`);
    }
    return occupation;
};

const parseDescription = (description: any): string => {
    if (!description || !isString(description)) {
        throw new Error(`Incorrect or missing description: ${description}`);
    }
    return description;
};

const parseSpecialist = (specialist: any): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error(`Incorrect or missing specialist: ${specialist}`);
    }
    return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis["code"]> => {
    diagnosisCodes.forEach((code: any) => {
        if (!code || !isString(code)) {
            throw new Error(`Incorrect or missing diagnosis code: ${diagnosisCodes}`);
        }
    })
    return diagnosisCodes;
};

const parseEmployerName = (employerName: any): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error(`Incorrect or missing employer name: ${employerName}`);
    }
    return employerName;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
    if (!rating || !isHealthCheckRating(rating)) {
        throw new Error(`Incorrect or missing health check rating: ${rating}`);
    }
    return rating;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
    if (!sickLeave || !isSickLeave(sickLeave)) {
        throw new Error(`Incorrect or missing sick leave`);
    }
    return sickLeave;
};

const parseDischarge = (discharge: any): Discharge => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error(`Incorrect or missing discharge`);
    }
    return discharge;
};

const isString = (param: any): param is string => {
    return typeof param === "string" || param instanceof String;
};

const isDate = (param: any): boolean => {
    return Boolean(Date.parse(param));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const isSickLeave = (param: any): param is SickLeave => {
    if (!param.startDate) {
        return false
    }

    if (!isDate(param.startDate)) {
        return false
    }

    if (!param.endDate) {
        return false
    }

    if (!isDate(param.endDate)) {
        return false
    }

    return true;
}

const isDischarge = (param: any): param is Discharge => {
    if (!param.date) {
        return false
    }

    if (!isDate(param.date)) {
        return false
    }

    if (!param.criteria) {
        return false
    }

    if (!isString(param.criteria)) {
        return false
    }

    return true;
}
