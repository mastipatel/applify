import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    ScanCommand,
    PutCommand,
    GetCommand,
    DeleteCommand,
} from "@aws-sdk/lib-dynamodb";


const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "users";

export const handler = async (event, context) => {
    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json",
    };

    try {
        switch (event.routeKey) {
            case "DELETE /users/{user_id}":
                await dynamo.send(
                    new DeleteCommand({
                        TableName: tableName,
                        Key: {
                            user_id: event.pathParameters.user_id,
                        },
                    })
                );
                body = {
                    user_id: event.pathParameters.user_id
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