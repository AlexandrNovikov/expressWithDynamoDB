import AWS from 'aws-sdk';

const IS_OFFLINE = process.env.IS_OFFLINE;
export default () => {
    if (IS_OFFLINE === 'true') {
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