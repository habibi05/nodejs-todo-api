const express = require('express');
const app = express();

const users = require('./src/routes/users')
const tasks = require('./src/routes/tasks')
const categories = require('./src/routes/categories')

app.use(express.json());

app.use('/users', users)
app.use('/tasks', tasks)
app.use('/categories', categories)

const PORT = process.env.PORT || 8091;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
