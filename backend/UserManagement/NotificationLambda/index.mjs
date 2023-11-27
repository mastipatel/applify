import { SNS } from "@aws-sdk/client-sns";
import { promisify } from 'util';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    ScanCommand
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "job-applications";

const sns = new SNS({});
const topicARN = process.env.sns;
const publishAsync = promisify(sns.publish).bind(sns);

export const handler = async (event) => {

    try {
        let applications = await dynamo.send(
            new ScanCommand({ TableName: tableName })
        );
        applications = applications.Items;
        
        const dayInms = 1000 * 60 * 60 * 24;
        for (const application of applications) {
            if (application.notifications_active) {
                let currentTime = new Date();
                let deadline = new Date(application.application_deadline);

                const msDifference = deadline - currentTime;
                
                if (msDifference <= dayInms && msDifference >= 0) {
                    let messageAttributes = { "email": { DataType: "String", StringValue: application.user_id } };

                    let params = {
                        Message: application.company_name + ": " + application.job_role + " has application deadline in 24 hours!",
                        MessageAttributes: messageAttributes,
                        TopicArn: topicARN
                    };
                    console.log(params);

                    await publishAsync(params);
                }
            }
            

        }
        return {
                statusCode: 200,
                body: JSON.stringify({success: true})
            };  
    }
    catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({success: false})
        };
    }

}