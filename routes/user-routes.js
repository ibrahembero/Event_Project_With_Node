const express = require("express")
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')
const multer = require("multer")
//configure multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ ".png") 
    }
  })
  
  const upload = multer({ storage: storage })
// middleware to checن if user is logged in
isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()) return next()
    res.redirect('/users/login')
}
function authRole(role){
  return (req,res,next)=>{
    if(req.user.role!==role){
      res.status(401)
      return res.send("not allowed")
    }
    next()
  }
}
function authUser(req,res,next){
 
    if(req.user==null){
      res.status(403)
      return res.send("you need to sign in")
    }
    next()
}

// login form
router.get('/login',(req,res)=>{
    res.render('user/login',{
        error: req.flash('error')
    })
})
// login post request
router.post('/login',
  passport.authenticate('local.login', 
    { successRedirect:'/users/profile',
      failureRedirect: '/users/login',
      failureFlash: true}));
// signup form
router.get('/signup',(req,res)=>{
    res.render('user/signup',{
        error: req.flash('error')
    })
})
// signup post request
router.post('/signup',
  passport.authenticate('local.signup', 
    { successRedirect:'/users/profile',
      failureRedirect: '/users/signup',
      failureFlash: true}));
// profile
router.get('/profile',isAuthenticated,(req,res)=>{
        res.render('user/profile',{
            success: req.flash('success')
        })
    
})
//upload user avatar
router.post('/uploadAvatar',upload.single('avatar'),(req,res)=>{
  let newFields = {
     avatar : req.file.filename
  }
  User.updateOne({_id:req.user._id},newFields,(err)=>{
      if(!err){
          res.redirect('/users/profile')
      }
  })
})
// logout
router.get('/logout',(req,res)=>{
    //res.json('logout user...')
    req.logout() 
    res.redirect('/users/login')
})
//admin route
router.get('/admin',authUser,authRole(true),(req,res)=>{
  User.find({},{},(err,users)=>{
      //res.json(users)
      res.render('user/admin',{
        users: users
    }) 
  
  })
  
})
// delete user by admin
router.delete('/delete/:id',authUser,authRole(true),(req,res)=>{
  console.log(req.params.id)
  //res.json("ok")
  let query = {_id:req.params.id}
  User.deleteOne(query,(err)=>{
      if(!err){
          res.status(200).json('User Deleted Successfully')
      }else{
          res.status(404).json('There Was An Error. User Was Not Deleted ')
      }
  })
})

module.exports = router