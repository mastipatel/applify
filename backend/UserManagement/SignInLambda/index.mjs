import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    GetCommand,
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
            case "PUT /users/sign-in":
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
                    body = body.Item;
                    if(body.password === requestJSON.password){
                      body = {
                          success: true,
                          user_id: requestJSON.user_id
                      };
                    }else{
                      body = {
                          success: false,
                          user_id: requestJSON.user_id
                      };
                    }
                  }else{
                    body = {
                        success: false,
                        error: "User does not exist!"
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