const express = require('express');
const bodyParser = require('body-parser');
const statementRoutes = require('./src/routes/statementRoutes'); // router file

const app = express();

app.use(bodyParser.json()); 

app.use('/api/statement', statementRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
