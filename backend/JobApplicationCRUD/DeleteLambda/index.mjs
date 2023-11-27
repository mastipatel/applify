import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    DeleteCommand,
} from "@aws-sdk/lib-dynamodb";


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
            case "DELETE /job-application/{application_id}":
                await dynamo.send(
                    new DeleteCommand({
                        TableName: tableName,
                        Key: {
                            application_id: event.pathParameters.application_id,
                        },
                    })
                );
                body = {
                    application_id: event.pathParameters.application_id
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