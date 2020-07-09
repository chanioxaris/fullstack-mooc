import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { Field, Form, Formik } from "formik";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { Button, Grid } from "semantic-ui-react";
import { useStateValue } from "../state";

export type EntryOccupationalHealthcareFormValues = Omit<OccupationalHealthcareEntry, "id">;

interface Props {
    onSubmit: (values: EntryOccupationalHealthcareFormValues) => void;
    onCancel: () => void;
}

const AddEntryOccupationalHealthcareForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();

    const handleSubmit = (values: any) => {
        onSubmit({
            description: values.description,
            date: values.date,
            specialist: values.specialist,
            type: values.type,
            diagnosisCodes: values.diagnosisCodes,
            employerName: values.employerName,
            sickLeave: {
                startDate: values.sickLeaveStartDate,
                endDate: values.sickLeaveEndDate
            }
        });
    };

    return (
        <Formik
            initialValues={{
                description: "",
                date: "",
                specialist: "",
                type: "OccupationalHealthcare",
                diagnosisCodes: [],
                employerName: "",
                sickLeaveStartDate: "",
                sickLeaveEndDate: ""
            }}
            onSubmit={handleSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.diagnosisCodes) {
                    errors.diagnosisCodes = requiredError;
                }
                if (!values.employerName) {
                    errors.employerName = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            diagnoses={diagnoses}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                        />
                        <Field
                            label="Employer name"
                            placeholder="Employer name"
                            name="employerName"
                            component={TextField}
                        />
                        <Field
                            label="Sick leave start date"
                            placeholder="YYYY-MM-DD"
                            name="sickLeaveStartDate"
                            component={TextField}
                        />
                        <Field
                            label="Sick leave end date"
                            placeholder="YYYY-MM-DD"
                            name="sickLeaveEndDate"
                            component={TextField}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryOccupationalHealthcareForm;