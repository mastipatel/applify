
import { SNS } from "@aws-sdk/client-sns";
import { promisify } from 'util';

const sns = new SNS({})
const userTopicArn = process.env.sns;

export const handler = async (event) => {

    const subscribeAsync = promisify(sns.subscribe).bind(sns);
    const requestJSON = JSON.parse(event.body);

    const subscribeParams = {
        Protocol: 'email',
        TopicArn: userTopicArn,
        Endpoint: requestJSON.user_id,
        Attributes: {
            'FilterPolicy': JSON.stringify({ "email": [requestJSON.user_id, "-1"] })
        }
    };

    try {
        await subscribeAsync(subscribeParams);
        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } catch (error) {
        console.error('Error subscribing user:', error);
        return { statusCode: 500, body: JSON.stringify({ success: false }) };
    }
};
