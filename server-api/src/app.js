
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import routes from './routes/index';


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../client')));

const docUrl = 'https://app.swaggerhub.com/apis/pitazodekwo/fast-food_fast/1.0';

app.get('/documentation', (req, res) => {
  res.status(200).redirect(docUrl);
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../../client/index.html'));
});

app.use(routes);

const port = parseInt(process.env.PORT, 10) || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
