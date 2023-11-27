import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    PutCommand,
    GetCommand
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
            case "PUT /users/sign-up":
                let requestJSON = JSON.parse(event.body);
               
                body = await dynamo.send(
                    new GetCommand({
                      TableName: tableName,
                      Key: {
                        user_id: requestJSON.user_id,
                      },
                    })
                  );
                  if(body?.Item){
                    body = {
                        success: false,
                        error: "User already exists!"
                    };
                  }else{
                    await dynamo.send(
                        new PutCommand({
                            TableName: tableName,
                            Item: {
                                user_id: requestJSON.user_id,
                                password: requestJSON.password
                            },
                        })
                    );

                    body = {
                        sucess: true,
                        user_id: requestJSON.user_id
                    };
                  }
                
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