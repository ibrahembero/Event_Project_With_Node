const db = require('../config/database')
const Event = require('../models/Event')

let newEvents =[
    new Event({
        title : 'beach cleaning at Muscat',
        description : 'this is the second event ',
        location : 'Muscat',
        date : Date.now(),
        created_at : Date.now()
    }),
    new Event({
        title : 'beach cleaning at Lebanon',
        description : 'this is the second event ',
        location : 'Lebanon',
        date : Date.now(),
        created_at : Date.now()
    }),
    new Event({
        title : 'beach cleaning at Aleppo',
        description : 'this is the second event ',
        location : 'Aleppo',
        date : Date.now(),
        created_at : Date.now()
    }),
    new Event({
        title : 'beach cleaning at Banias',
        description : 'this is the second event ',
        location : 'Banias',
        date : Date.now(),
        created_at : Date.now()
    }),
    new Event({
        title : 'beach cleaning at Tartous',
        description : 'this is the second event ',
        location : 'Tartous',
        date : Date.now(),
        created_at : Date.now()
    }),
    new Event({
        title : 'beach cleaning at Latakia',
        description : 'this is the second event ',
        location : 'Latakia',
        date : Date.now(),
        created_at : Date.now()
    }),
    new Event({
        title : 'beach cleaning at Damascus',
        description : 'this is the second event ',
        location : 'Damascus',
        date : Date.now(),
        created_at : Date.now()
    }),
    new Event({
        title : 'beach cleaning at Homs',
        description : 'this is the second event ',
        location : 'Homs',
        date : Date.now(),
        created_at : Date.now()
    }),
]

newEvents.forEach((event)=>{
    event.save((err)=>{
        if(err){
           console.log(err) 
        }
    })
})

/*let newEvent = new Event({
    title : 'this is event 1',
    description : 'this is the best event',
    location : 'oman',
    date : Date.now()
})

newEvent.save((err)=>{
    if(!err){
        console.log('record was added')
    }else{
        console.log(err)
    }
}) */