import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import AddEntryHealthCheckForm, { EntryHealthCheckFormValues } from "./AddEntryHealthCheckForm";
import AddEntryHospitalForm, { EntryHospitalFormValues } from "./AddEntryHospitalForm";
import AddEntryOccupationalHealthcareForm, { EntryOccupationalHealthcareFormValues } from "./AddEntryOccupationalHealthcareForm";

interface Props {
    modalOpen: boolean;
    entryType: string;
    onClose: () => void;
    onSubmit: (values: NewEntryFormValues) => void;
    error?: string;
}

export type NewEntryFormValues = EntryHealthCheckFormValues | EntryHospitalFormValues | EntryOccupationalHealthcareFormValues;

const AddEntryModal: React.FC<Props> = ({ modalOpen, entryType, onClose, onSubmit, error }) => {
    switch (entryType) {
        case "HealthCheck":
            return (
                <Modal open={modalOpen} onClose={onClose} closeIcon>
                    <Modal.Header>Add a new Health Check entry</Modal.Header>
                    <Modal.Content>
                        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
                        <AddEntryHealthCheckForm onSubmit={onSubmit} onCancel={onClose} />
                    </Modal.Content>
                </Modal>
            );
        case "OccupationalHealthcare":
            return (
                <Modal open={modalOpen} onClose={onClose} closeIcon>
                    <Modal.Header>Add a new Occupational Healthcare entry</Modal.Header>
                    <Modal.Content>
                        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
                        <AddEntryOccupationalHealthcareForm onSubmit={onSubmit} onCancel={onClose} />
                    </Modal.Content>
                </Modal>
            );
        case "Hospital":
            return (
                <Modal open={modalOpen} onClose={onClose} closeIcon>
                    <Modal.Header>Add a new Hospital entry</Modal.Header>
                    <Modal.Content>
                        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
                        <AddEntryHospitalForm onSubmit={onSubmit} onCancel={onClose} />
                    </Modal.Content>
                </Modal>
            );
        default:
            return null;
    }
};

export default AddEntryModal;