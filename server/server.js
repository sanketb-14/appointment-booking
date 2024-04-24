const userRoute = require('./routes/userRoutes')
const express = require('express')

const tableRoute = require('./routes/tableRoutes')
const db = require('./util/database')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())


db.sync()
    .then(() => console.log('Database and tables synced'))
    .catch(err => console.error('Error syncing database:', err));


app.use('/api/v1/users', userRoute)
app.use('/api/v1/tables', tableRoute)

app.listen(3000, () => console.log('listening on port 3000'))