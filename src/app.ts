import express, { Express } from 'express';

const app: Express = express();

/** Parse the request */
app.use(express.urlencoded({ extended: false }));

/** Takes care of JSON data */
app.use(express.json());

app.use('/', (req, res) => {
    return res.status(200).send('Gabrielzinho entrou fi');
});

app.listen(3000);
