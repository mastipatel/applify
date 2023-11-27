import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    PutCommand,

} from "@aws-sdk/lib-dynamodb";
import { uuid } from 'uuidv4';

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "job-applications";

export const handler = async (event, context) => {
    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json",
    };

    try {
        switch (event.routeKey) {
            case "PUT /job-application/create":
                let requestJSON = JSON.parse(event.body);
                const id = uuid();
                await dynamo.send(
                    new PutCommand({
                        TableName: tableName,
                        Item: {
                            application_id: id,
                            company_name: requestJSON.company_name,
                            job_role: requestJSON.job_role,
                            application_deadline: requestJSON.application_deadline,
                            application_status: requestJSON.application_status,
                            user_id: requestJSON.user_id,
                            notifications_active: requestJSON.notifications_active
                        },
                    })
                );
                body = {
                    application_id: id
                };
                break;
            default:
                throw new Error(`Unsupported route: "${event.routeKey}"`);
        }
    } catch (err) {
        statusCode = 400;
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};