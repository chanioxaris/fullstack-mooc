import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Array<Diagnosis>;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "SET_DIAGNOSES_LIST":
        return {
          ...state,
            diagnoses: action.payload
          };
      default:
      return state;
  }
};

export const setPatientList = (payload: Array<Patient>): Action => {
    return {
        type: "SET_PATIENT_LIST",
        payload
    };
};

export const addPatient = (payload: Patient): Action => {
    return {
        type: "ADD_PATIENT",
        payload
    };
};

export const updatePatient = (payload: Patient): Action => {
    return {
        type: "UPDATE_PATIENT",
        payload
    };
};

export const setDiagnosesList = (payload: Array<Diagnosis>): Action => {
    return {
        type: "SET_DIAGNOSES_LIST",
        payload
    };
};