import AWS from 'aws-sdk';

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    endpoint: process.env.DYNAMO_DB_URL
});
export const dynamodb = new AWS.DynamoDB();
export const ddbDocumentClient = new AWS.DynamoDB.DocumentClient();