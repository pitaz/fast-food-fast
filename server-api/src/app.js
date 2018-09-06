/* eslint-disable  */
import express from 'express';
import routes from './routes';


const app = express();


app.get('/', (req, res) => {
  res.send('<h1>Welcome to Fast Food Fast!</h1>');
});

app.use(routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
