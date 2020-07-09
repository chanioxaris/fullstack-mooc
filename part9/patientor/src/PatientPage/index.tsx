import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Gender, Patient } from "../types";
import { updatePatient, useStateValue } from "../state";
import { Button, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import PatientEntryDetails from "../components/PatientEntryDetails";
import AddEntryModal, { NewEntryFormValues } from "../AddEntryModal";

const PatientPage: React.FC = () => {
    const [{ patients, diagnoses }, dispatch] = useStateValue();
    const [patient, setPatient] = React.useState<Patient>();
    const [error, setError] = React.useState<string | undefined>();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [entryType, setEntryType] = React.useState<string>("");

    const { id } = useParams<{ id: string }>();

    const openModal = (entryType: string): void => {
        setEntryType(entryType);
        setModalOpen(true);
    };
    const closeModal = (): void => {
        setEntryType("");
        setModalOpen(false);
        setError(undefined);
    };
    const submitNewEntry = async (values: NewEntryFormValues) => {
        try {
            const { data: updatedPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            dispatch(updatePatient(updatedPatient));
            closeModal();
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    };

    React.useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();

        const fetchPatient = async () => {
            try {
                const { data: patientFromApi } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`,
                    { cancelToken: source.token}
                );
                setPatient(patientFromApi);
                dispatch(updatePatient(patientFromApi));
            } catch (e) {
                if (!axios.isCancel(e)) {
                    console.error(e);
                }
            }
        };

        fetchPatient();
        return () => {
            source.cancel();
        };
    }, [dispatch, patients, id]);

    if (!patient || !diagnoses) {
        return null;
    }

    return (
        <div>
            <h2>
                {patient.name}
                {(() => {
                    switch (patient.gender) {
                        case Gender.Male:   return <Icon name="mars"/>;
                        case Gender.Female: return <Icon name="venus"/>;
                        case Gender.Other:  return <Icon name="neuter"/>;
                    }
                })()}
            </h2>

            <p>SSN: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>

            <b>Entries</b>
            {patient.entries.map(entry =>
                <PatientEntryDetails
                    key={entry.id}
                    entry={entry}
                />
            )}

            <AddEntryModal
                modalOpen={modalOpen}
                entryType={entryType}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <div>
                <Button onClick={() => openModal("Hospital")}>Add new Hospital entry</Button>
                <Button onClick={() => openModal("OccupationalHealthcare")}>Add new Occupation Healthcare entry</Button>
                <Button onClick={() => openModal("HealthCheck")}>Add new Health Check entry</Button>
            </div>
        </div>
    );
};

export default PatientPage;