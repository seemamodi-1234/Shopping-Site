const mongoose = require('mongoose')

module.exports = {
    connectDb : function() {
        
        const url = "mongodb://localhost:27017/my_database"
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
            autoIndex: false
        }, (err) => {
            if(err) console.log(err) 
            else console.log("mongdb is connected");
            
        })
    }
}