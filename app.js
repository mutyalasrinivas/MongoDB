const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');
 

const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
  User.findById('6471a0af194cd67695eb73c9')
  .then(user=>{
    req.user=user;
    next();
  })
  .catch(err=>console.log(err));
 })

app.use('/admin', adminRoutes);
 app.use(shopRoutes);

app.use(errorController.get404);
 
 mongoose.connect('mongodb+srv://sri:sri2023@cluster0.7ijgr7x.mongodb.net/shop?retryWrites=true')
 .then(result=>{
    User.findOne().then(user=>{
        if(!user){
            const user=new User({
                name:'srinivas',
                email:"srinivas@gmail.com",
                cart:[]
             })
             user.save();
        }
    })
   
  app.listen(3000,()=>console.log("running on 3000"))})
 .catch(
  err=>console.log(err)
 )