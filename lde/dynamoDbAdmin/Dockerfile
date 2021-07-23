FROM node:14

RUN npm install -g dynamodb-admin
#TODO set to CMD correct values for connecting to Dynamo used in .env file
CMD AWS_REGION=us-east-1 AWS_ACCESS_KEY_ID=testKey AWS_SECRET_ACCESS_KEY=testSecretKey DYNAMO_ENDPOINT=http://dynamodb:8000 dynamodb-admin -p 8001

EXPOSE 8001
