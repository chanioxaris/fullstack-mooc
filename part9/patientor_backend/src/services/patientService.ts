import { v4 as uuid } from "uuid";
import patients from "../../data/patients";
import { Entry, NewPatient, Patient, PatientPublic } from "../types";

let data: Array<Patient> = patients

const getAllNonSensitive = (): Array<PatientPublic> => {
    return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const findById = (id: string): PatientPublic | undefined => {
    return data.find(p => p.id === id);
};

const create = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };

    data = data.concat(newPatient);
    return newPatient;
};

const addEntry = (id: string, entry: Entry ): Patient | undefined => {
    const patient = data.find(p => p.id === id)
    if (!patient) {
        return undefined
    }

    const updatedPatient = {
        ...patient,
        entries: patient.entries.concat(entry)
    }

    data = data.map(p => p.id === id ? updatedPatient : p)

    return updatedPatient
}

export default {
    getAllNonSensitive,
    findById,
    create,
    addEntry
};