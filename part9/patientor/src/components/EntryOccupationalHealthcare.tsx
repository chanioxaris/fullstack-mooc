import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { Card, Icon } from "semantic-ui-react";

interface EntryOccupationalHealthcareProps {
    entry: OccupationalHealthcareEntry;
}

const EntryOccupationalHealthcare: React.FC<EntryOccupationalHealthcareProps> = ({ entry }) => {
    return (
        <div>
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        <p>{entry.date} <Icon name={"stethoscope"} /></p>
                    </Card.Header>
                    <Card.Meta>
                        {entry.description}
                    </Card.Meta>
                    <Card.Description>
                        <p>Employer: {entry.employerName}</p>
                        <p>Sick leave: {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}</p>
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>
    );
};

export default EntryOccupationalHealthcare;