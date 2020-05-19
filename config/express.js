import express from 'express';
import bodyParser from 'body-parser';
import routes from '../server/routes';
import cors from 'cors';
const app = express();
app.use(cors());
app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Headers", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});


//app.get('/', (req, res) => res.send("Server Started!!"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/psm_api', routes);

export default app;
