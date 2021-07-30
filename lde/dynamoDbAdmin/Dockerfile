FROM node:14

RUN npm install -g dynamodb-admin
#TODO set to CMD correct values for connecting to Dynamo used in .env file
CMD DYNAMO_ENDPOINT=http://dynamodb:8000 dynamodb-admin -p 8001

EXPOSE 8001
