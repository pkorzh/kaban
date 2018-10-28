const mongoose = require('mongoose')

const dbHost = process.env.DB_HOST
const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

mongoose.connect(`mongodb://${dbUser}:${dbPass}@${dbHost}/${dbName}`, {
	useNewUrlParser: true
})
