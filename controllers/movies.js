import {dynamodb, ddbDocumentClient} from '../utils/conigureDynamo.js';
import { v4 as uuidv4 } from 'uuid';

const paramsGlobal = {
    TableName: 'Movies',
};

export const addMovie = (req, res) => {
    const {title, rtScore} = req.body;

    if (!title || !rtScore) {
        res.status(400).send('Bad incoming data'); //TODO Better to use schema validation here
    }
    const params = {...paramsGlobal, Item: {
            id: { S: uuidv4() },
            title: { S: title },
            rtScore: { N: rtScore }
        }}

    dynamodb.putItem(params, function(err) {
        if (err) {
            console.error("Unable to add movie", err);
            res.send({status: 'Error'})
        } else {
            console.info(`Added ${title} with a Rotten Tomatoes Score of ${rtScore}%`);
            res.send({status: 'Success'})
        }
    });
}

export const loadMovie = (req, res) => {
    const id = req.params.id;
    const params = {...paramsGlobal, Key: { id }};

    ddbDocumentClient.get(params).promise().then(data => {
        res.send({status: "Ok", data})
    }).catch(err => {
        console.log(err);
        res.status(err.statusCode).send(err.code);
    })
}

export const loadAllMovies = (req, res) => {
    ddbDocumentClient.scan(paramsGlobal).promise().then(data => {
        res.send({status: "Ok", data})
    }).catch(err => {
        console.log(err);
        res.status(err.statusCode).send(err.code);
    })
}
