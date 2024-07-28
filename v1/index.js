// packages/backend/v1/index.js
const express = require('express');
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
require("dotenv").config();
const userRoutes = require('./src/routes/userRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const processRoutes = require('./src/routes/processRoutes');
const tokensRoutes = require('./src/routes/tokenRoutes');
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = require('./src/services/swagger/swaggerOptions');

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, '/public/')));


app.get('/api', (req, res) => {
  res.send({ message: 'Hello from the API!' });
});

app.use('/api/v1/user',userRoutes);
app.use('/api/v1/project',projectRoutes);
app.use('/api/v1/process',processRoutes);
app.use('/api/v1/token',tokensRoutes);

const specs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));


app.listen(port, () => {
  console.log(`Backend API listening at http://localhost:${port}`);
});
