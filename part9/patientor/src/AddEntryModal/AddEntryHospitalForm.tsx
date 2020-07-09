import React from "react";
import { HospitalEntry } from "../types";
import { Field, Form, Formik } from "formik";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { Button, Grid } from "semantic-ui-react";
import { useStateValue } from "../state";

export type EntryHospitalFormValues = Omit<HospitalEntry, "id">;

interface Props {
    onSubmit: (values: EntryHospitalFormValues) => void;
    onCancel: () => void;
}

const AddEntryHospitalForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();

    const handleSubmit = (values: any) => {
        onSubmit({
            description: values.description,
            date: values.date,
            specialist: values.specialist,
            type: values.type,
            diagnosisCodes: values.diagnosisCodes,
            discharge: {
                date: values.dischargeDate,
                criteria: values.dischargeCriteria
            }
        });
    };

    return (
        <Formik
            initialValues={{
                description: "",
                date: "",
                specialist: "",
                type: "Hospital",
                diagnosisCodes: [],
                dischargeDate: "",
                dischargeCriteria: ""
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
                if (!values.dischargeDate) {
                    errors.dischargeDate = requiredError;
                }
                if (!values.dischargeCriteria) {
                    errors.dischargeCriteria = requiredError;
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
                            label="Discharge date"
                            placeholder="YYYY-MM-DD"
                            name="dischargeDate"
                            component={TextField}
                        />
                        <Field
                            label="Discharge criteria"
                            placeholder="Discharge criteria"
                            name="dischargeCriteria"
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

export default AddEntryHospitalForm;