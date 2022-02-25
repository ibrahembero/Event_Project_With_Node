// call mongoose library
const mongoose = require('mongoose')
/* events is the name of database and if doen't exist 
     it will create it with default port for mongo db */
mongoose.connect('mongodb://localhost:27017/eventsDB',{useNewUrlParser: true},(error)=>{
    // Check error in initial connection. There is no 2nd param to the callback.
    if(error){
        console.log(error)
    }else{
        console.log('connected to db successfully...')
    } 
  })