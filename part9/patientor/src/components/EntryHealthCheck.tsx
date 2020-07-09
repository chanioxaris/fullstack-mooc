import React from "react";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import { Card, Icon } from "semantic-ui-react";

interface EntryHealthCheckProps {
    entry: HealthCheckEntry;
}

const EntryHealthCheck: React.FC<EntryHealthCheckProps> = ({ entry }) => {
    return (
        <div>
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        <p>{entry.date} <Icon name={"doctor"} /></p>
                    </Card.Header>
                    <Card.Meta>
                        {entry.description}
                    </Card.Meta>
                    <Card.Description>
                        {(() => {
                            switch (entry.healthCheckRating) {
                                case HealthCheckRating.Healthy:
                                    return <Icon name="heart" color="green" />;
                                case HealthCheckRating.LowRisk:
                                    return <Icon name="heart" color="orange" />;
                                case HealthCheckRating.HighRisk:
                                    return <Icon name="heart" color="red" />;
                                case HealthCheckRating.CriticalRisk:
                                    return <Icon name="heart" color="black" />;
                            }
                        })()}
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>
    );
};

export default EntryHealthCheck;