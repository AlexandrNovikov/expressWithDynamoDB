import conigureDynamo from '../utils/conigureDynamo.js';
import { v4 as uuidv4 } from 'uuid';

const paramsGlobal = {
    TableName: 'Movies',
};

const dynamoDb = conigureDynamo();

export const addMovie = (req, res) => {
    const {title, rtScore} = req.body;

    if (!title || !rtScore) {
        res.status(400).send('Bad incoming data'); //TODO Better to use schema validation here
    }
    const params = {...paramsGlobal, Item: {id: uuidv4(), title, rtScore}};

    dynamoDb.put(params).promise().then(() => {
        console.info(`Added new item with data: ${JSON.stringify({title, rtScore})}`);
        res.send({status: 'Success'});
    }).catch(err => {
        console.error(`Error on adding item: ${JSON.stringify(err)}`);
        res.status(err.statusCode).send(err.code);
    });
};

export const loadMovie = (req, res) => {
    const id = req.params.id;
    const params = {...paramsGlobal, Key: { id }};

    dynamoDb.get(params).promise().then(data => {
        res.send({status: "Ok", data});
    }).catch(err => {
        console.error(err);
        res.status(err.statusCode).send(err.code);
    });
};

export const loadAllMovies = (req, res) => {
    dynamoDb.scan(paramsGlobal).promise().then(data => {
        res.send({status: "Ok", data});
    }).catch(err => {
        console.error(err);
        res.status(err.statusCode).send(err.code);
    });
};

export const deleteMovie = (req, res) => {
    const id = req.params.id;
    const params = {...paramsGlobal, Key: { id }};
    dynamoDb.delete(params).promise().then((data) => {
        res.send({status: "Ok", data});
    }).catch(err => {
        console.error(err);
        res.status(err.statusCode).send(err.code);
    });
};

export const updateMovie = (req, res) => {
    const id = req.params.id;
    const updateExpressions = getUpdateExpressions(req.body);
    const params = {...paramsGlobal,
        ...updateExpressions,
        Key: { id },
        ReturnValues: 'ALL_NEW'
    };

    dynamoDb.update(params).promise().then(data => {
        res.send({status: "Ok", data});
    }).catch(err => {
        console.error(err);
        res.status(err.statusCode).send(err.code);
    });
};

function getUpdateExpressions(data) { //TODO will be useful globally so it's better to move it to utils folder
    const result = {
        UpdateExpression: 'SET ',
        ExpressionAttributeValues: {}
    };
    const keys = Object.keys(data);

    keys.forEach((key, index) => {
        result.UpdateExpression += `${key} = :${key}${index + 1 !== keys.length ? ',' : ''}`;
        result.ExpressionAttributeValues[`:${key}`] = data[key];
    });

    return result;
}