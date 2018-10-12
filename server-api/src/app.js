/* eslint-disable  */
import express from 'express';
import routes from './routes/index';


const app = express();


const docUrl = 'https://app.swaggerhub.com/apis/pitazodekwo/fast-food_fast/1.0';

app.get('/documentation', (req, res) => {
  res.status(200).redirect(docUrl);
});

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Fast Food Fast!</h1>');
});

app.use(routes);

const port = parseInt(process.env.PORT, 10) || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
