const userRoute = require('./routes/userRoutes')
const express = require('express')





const cors = require('cors')

const app = express()
app.use(cors())



app.use('/api/v1/users', userRoute)

app.listen(3000, () => console.log('listening on port 3000'))