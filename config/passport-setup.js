const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/User')
// saving user object in the session
// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id); 
});
// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
// register strategy
passport.use('local.signup',new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback:true
},(req,username,password,done)=>{
    //console.log(req.body)
    if(req.body.password != req.body.confirm_password){
        return done(null,false,req.flash('error','Passwords do not match'))
    }else{
        User.findOne({email: username},(err,user)=>{
            if(err){
                return done(err)
            }
            if(user){
                return done(null,false,req.flash('error','Email already used'))
            } 
            if(!user){
               // create user
               let newUser = new User()
               newUser.email = req.body.email
               newUser.password = newUser.hashPassword(req.body.password)
               newUser.avatar= "profile.png"
               newUser.save((err,user)=>{
                   if(!err){
                    return done(null,user,req.flash('success','User Added'))
                   }else{
                       console.log(err)
                   }
               })
            } 
        })
    }
}))
// login startegy
passport.use('local.login',new localStrategy({
    //options
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback:true
},(req,username,password,done)=>{
    //find user
    User.findOne({email:username},(err,user)=>{
        if(err){
            return done(null,false,req.flash('error','Something Wrong Happened'))
        } 
        if(!user){
            return done(null,false,req.flash('error','User Was Not Found'))
        } 
        if(user){
            if(user.comparePasswords(password,user.password)){
                return done(null,user,req.flash('success','Welcome Back'))
            }else{
                return done(null,false,req.flash('error','password is wrong'))
            }
        } 
    })
}))