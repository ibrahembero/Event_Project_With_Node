// call mongoose library
const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        required: true
    },
    role:{
        type: Boolean,
        required: true,
        default: false,
    },
})

userSchema.methods.hashPassword = (password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}
userSchema.methods.comparePasswords = (password,hash)=>{
    return bcrypt.compareSync(password,hash)
}

let User = mongoose.model('User',userSchema,'users')
module.exports = User