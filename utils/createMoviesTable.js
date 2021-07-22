import {dynamodb} from './conigureDynamo.js';

const params = {
    TableName : "Movies",
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};
export default () => {
    dynamodb.createTable(params, (err, data) => {
        if (err) {
            if (err.code === 'ResourceInUseException') {
                return;
            }

            console.error("Error JSON.", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table.", JSON.stringify(data, null, 2));
        }
    });
}