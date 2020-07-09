import React from "react";
import { HospitalEntry } from "../types";
import { Card, Icon } from "semantic-ui-react";

interface EntryHospitalProps {
    entry: HospitalEntry;
}

const EntryHospital: React.FC<EntryHospitalProps> = ({ entry }) => {
    return (
        <div>
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        <p>{entry.date} <Icon name={"hospital"} /></p>
                    </Card.Header>
                    <Card.Meta>
                        {entry.description}
                    </Card.Meta>
                    <Card.Description>
                        <p>Discharge date: {entry.discharge.date}</p>
                        <p>Discharge criteria: {entry.discharge.criteria}</p>
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>
    );
};

export default EntryHospital;