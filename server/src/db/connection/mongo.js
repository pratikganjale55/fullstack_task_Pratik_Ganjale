const mongoose = require("mongoose") ;



const connection = mongoose.connect(process.env.MONGO_URI)
connection.then(() => console.log("db connected succesfully"))
connection.catch((err) => console.log(err)) ;


module.exports = connection ;