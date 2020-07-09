import React from "react";
import {Entry} from "../types";
import HealthCheckEntry from "./EntryHealthCheck";
import HospitalEntry from "./EntryHospital";
import OccupationalHealthcareEntryEntry from "./EntryOccupationalHealthcare";
import { assertNever } from "../utils";

interface PatientEntryDetailsProps {
    entry: Entry;
}

const PatientEntryDetails: React.FC<PatientEntryDetailsProps> = ({ entry }) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry} />;
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryEntry entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default PatientEntryDetails;