require("dotenv").config();
const user = require('./User/userRoute');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())

const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json')

const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', user);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));