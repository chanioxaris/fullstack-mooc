import diagnoses from "../../data/diagnoses.json";
import { Diagnosis } from "../../../patientor/src/types";

let data: Array<Diagnosis> = diagnoses;

const getAll = (): Array<Diagnosis> => {
    return data;
};

export default {
    getAll
};