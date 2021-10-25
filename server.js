const express = require('express');
const app = express();
const connectDB = require('./config/db')

//Connect database
connectDB();

app.get('/', (req, res) => res.send('API Running'));

//define routes
app.use('/api/users', require('./routes/api/users'))

const PORT = process.env.PORT || 5000;




app.listen(PORT, () => console.log(`Server started on port ${PORT}`))