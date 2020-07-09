import React from "react";
import { HealthCheckEntry } from "../types";
import { Field, Form, Formik } from "formik";
import { DiagnosisSelection, NumberField, TextField } from "../AddPatientModal/FormField";
import { Button, Grid } from "semantic-ui-react";
import { useStateValue } from "../state";

export type EntryHealthCheckFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
    onSubmit: (values: EntryHealthCheckFormValues) => void;
    onCancel: () => void;
}

const AddEntryHealthCheckForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                description: "",
                date: "",
                specialist: "",
                type: "HealthCheck",
                diagnosisCodes: [],
                healthCheckRating: 1
            }}
            onSubmit={onSubmit}
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
                if (!values.healthCheckRating) {
                    errors.healthCheckRating = requiredError;
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
                            label="Health check rating"
                            placeholder="Rating"
                            name="healthCheckRating"
                            component={NumberField}
                            min={1}
                            max={4}
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

export default AddEntryHealthCheckForm;