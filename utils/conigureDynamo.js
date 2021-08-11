import AWS from 'aws-sdk';

const ENV = process.env.ENV;
export default () => {
    if (ENV === 'dev') {
        return new AWS.DynamoDB.DocumentClient({
            region: 'localhost',
            accessKeyId: 'accessKeyId',
            secretAccessKey: 'secretAccessKey',
            endpoint: 'http://dynamodb:8000'
        });
    } else {
        return new AWS.DynamoDB.DocumentClient();
    }
};